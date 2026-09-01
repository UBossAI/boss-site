import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from '$lib/config/contactForm.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ parent }) => await parent();

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Structurally valid 10-digit NANP (US) number — area code and exchange code can't
// start with 0 or 1, which also rejects obvious garbage like "0000000000".
const US_PHONE_PATTERN = /^[2-9]\d{2}[2-9]\d{6}$/;

// Strips control/binary characters (keeping tab, newline, carriage return) so garbage
// never reaches n8n. n8n re-escapes for HTML on its end — this is just an earlier,
// cheaper rejection of obviously non-text input, not a substitute for that.
function stripControlChars(value: string): string {
	// eslint-disable-next-line no-control-regex -- deliberately matching control chars to strip them
	return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

// US-only, strict. Tolerates a leading "1" country code (e.g. "+1 555 123 4567")
// but otherwise requires a structurally valid NANP number. Returns the normalized
// 10-digit number, or null if it doesn't look like a real US number.
function normalizeUSPhone(input: string): string | null {
	let digits = input.replace(/\D/g, '');
	if (digits.length === 11 && digits.startsWith('1')) {
		digits = digits.slice(1);
	}
	return US_PHONE_PATTERN.test(digits) ? digits : null;
}

async function verifyTurnstile(
	token: string,
	remoteIp: string,
	fetchFn: typeof fetch
): Promise<boolean> {
	if (!env.TURNSTILE_SECRET_KEY) {
		console.error('[contact] TURNSTILE_SECRET_KEY is not set');
		return false;
	}

	const body = new URLSearchParams({
		secret: env.TURNSTILE_SECRET_KEY,
		response: token,
		remoteip: remoteIp
	});
	const res = await fetchFn(TURNSTILE_VERIFY_URL, { method: 'POST', body });
	if (!res.ok) {
		console.error('[contact] siteverify HTTP error', res.status, await res.text());
		return false;
	}

	const result = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
	if (!result.success) {
		console.error('[contact] siteverify rejected token', result['error-codes']);
	}
	return result.success === true;
}

export const actions: Actions = {
	default: async ({ request, fetch, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot: real users never see this field. A filled value means a bot that
		// auto-fills every input — report success without doing anything, so the bot
		// has no signal that it was caught.
		if (data.get('_gotcha')) {
			return { success: true };
		}

		const name = stripControlChars(data.get('name')?.toString().trim() ?? '');
		const email = stripControlChars(data.get('email')?.toString().trim() ?? '');
		const phoneInput = stripControlChars(data.get('phone')?.toString().trim() ?? '');
		const message = stripControlChars(data.get('message')?.toString().trim() ?? '');
		const language = data.get('language')?.toString().trim() || 'en';
		const turnstileToken = data.get('cf-turnstile-response')?.toString() ?? '';

		if (!name || !message) {
			console.error('[contact] missing required field(s)', {
				name: !!name,
				message: !!message
			});
			return fail(400, { error: true });
		}

		// Email and phone are each individually optional, but at least one contact
		// method is required — trades clients often don't respond well to email, so
		// this lets phone-only submissions through instead of forcing an email.
		if (!email && !phoneInput) {
			console.error('[contact] neither email nor phone provided');
			return fail(400, { error: true });
		}

		if (email && !EMAIL_PATTERN.test(email)) {
			console.error('[contact] invalid email format');
			return fail(400, { error: true });
		}

		if (message.length < MESSAGE_MIN_LENGTH || message.length > MESSAGE_MAX_LENGTH) {
			console.error('[contact] message length out of bounds', message.length);
			return fail(400, { error: true });
		}

		let phone = '';
		if (phoneInput) {
			const normalized = normalizeUSPhone(phoneInput);
			if (!normalized) {
				console.error('[contact] invalid US phone number');
				return fail(400, { error: true });
			}
			phone = normalized;
		}

		if (!turnstileToken) {
			console.error('[contact] cf-turnstile-response was empty');
			return fail(400, { error: true });
		}

		if (!(await verifyTurnstile(turnstileToken, getClientAddress(), fetch))) {
			return fail(400, { error: true });
		}

		if (!env.N8N_CONTACT_WEBHOOK_URL) {
			return fail(500, { error: true });
		}

		const webhookRes = await fetch(env.N8N_CONTACT_WEBHOOK_URL, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ name, email, phone, message, language })
		});

		if (!webhookRes.ok) {
			return fail(502, { error: true });
		}

		return { success: true };
	}
};
