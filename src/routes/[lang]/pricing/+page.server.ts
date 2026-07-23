import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

// Pricing page temporarily unplugged in favor of the homepage pricing teaser — see PROJECT.md.
// Code kept intact for re-launch; this route just redirects for now. The `params.lang` guard
// below is always false at runtime (the [lang] layout already validated it) — it only exists so
// TypeScript sees a reachable return path matching PageData, instead of inferring `never`.
export const load: PageServerLoad = async ({ params, parent }) => {
	if (!params.lang) return await parent();
	throw redirect(307, `/${params.lang}`);
};
