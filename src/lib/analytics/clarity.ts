import { CLARITY_PROJECT_ID } from './config.js';
import { loadScript } from './loadScript.js';

type ClarityShim = {
	(...args: unknown[]): void;
	q?: unknown[];
};

declare global {
	interface Window {
		clarity?: ClarityShim;
	}
}

let started = false;

/**
 * Microsoft Clarity — session recordings and heatmaps. Same buffering trick as gtag:
 * a tiny queueing shim goes up first, the real tag downloads whenever it downloads.
 */
export function initClarity(): void {
	if (started || !CLARITY_PROJECT_ID) return;
	started = true;

	if (!window.clarity) {
		const shim: ClarityShim = function (this: void) {
			(shim.q = shim.q || []).push(arguments);
		} as ClarityShim;
		window.clarity = shim;
	}

	loadScript(`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`);
}

/**
 * Tag the current Clarity session so recordings and heatmaps can be filtered — most
 * usefully by locale, since en/es/pt-BR visitors behave differently.
 */
export function clarityTag(key: string, value: string): void {
	if (!CLARITY_PROJECT_ID) return;
	window.clarity?.('set', key, value);
}
