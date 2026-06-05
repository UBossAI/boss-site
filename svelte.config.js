import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' }),
		prerender: {
			handleHttpError: 'warn',
			entries: [
				'/',
				'/en', '/es', '/pt-BR',
				'/en/about', '/es/about', '/pt-BR/about',
				'/en/services', '/es/services', '/pt-BR/services',
				'/en/pricing', '/es/pricing', '/pt-BR/pricing',
				'/en/contact', '/es/contact', '/pt-BR/contact',
				'/en/support', '/es/support', '/pt-BR/support',
				'/en/careers', '/es/careers', '/pt-BR/careers',
				'/en/legal/terms', '/es/legal/terms', '/pt-BR/legal/terms',
				'/en/legal/privacy', '/es/legal/privacy', '/pt-BR/legal/privacy',
				'/en/legal/key-terms', '/es/legal/key-terms', '/pt-BR/legal/key-terms',
				'/en/legal/sms-policy', '/es/legal/sms-policy', '/pt-BR/legal/sms-policy',
				'/sitemap.xml'
			]
		}
	}
};

export default config;
