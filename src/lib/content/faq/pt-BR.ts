import type { FaqEntry } from './types.js';

/**
 * Brazilian Portuguese FAQ content — intentionally empty for now.
 *
 * Per the project's translation workflow, Portuguese is adapted from the *finalized*
 * Spanish rather than from English, so it lands after es.ts is reviewed. Until then the
 * loader falls back to English and the page is served noindex, so an untranslated page
 * never enters the index under a pt-BR canonical.
 */
export const faqEntries: readonly FaqEntry[] = [];
