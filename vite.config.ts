import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

export default defineConfig({
	// basicSsl only activates for `vite dev`, never for `vite build` — needed because
	// Cloudflare Turnstile refuses to run inside a plain-http parent page, even on
	// localhost. Certificate is self-signed; browsers will show a one-time warning.
	plugins: [basicSsl(), tailwindcss(), sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined
			}
		}
	}
});
