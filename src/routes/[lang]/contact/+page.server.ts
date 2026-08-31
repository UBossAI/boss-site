import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ parent }) => await parent();

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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

		const name = data.get('name')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const phone = data.get('phone')?.toString().trim() ?? '';
		const message = data.get('message')?.toString().trim() ?? '';
		const language = data.get('language')?.toString().trim() || 'en';
		const turnstileToken = data.get('cf-turnstile-response')?.toString() ?? '';

		if (!name || !email || !message) {
			console.error('[contact] missing required field(s)', {
				name: !!name,
				email: !!email,
				message: !!message
			});
			return fail(400, { error: true });
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
