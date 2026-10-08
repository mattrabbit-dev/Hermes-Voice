import type { RequestHandler } from '@sveltejs/kit';
import { base } from '$app/paths';
import { DEFAULT_PERSONA } from '$lib/persona/types';

/**
 * Dynamic web app manifest — the home-screen icon label is the single most load-bearing
 * occurrence of the assistant's name (the deployer's user taps an icon; it should say the configured name every time,
 * not Hermes). Icons/colors/description copied verbatim from static/site.webmanifest, which
 * is left in place untouched as a harmless fallback (nothing links to it anymore).
 *
 * Unauthenticated requests (no cookie) resolve to DEFAULT_PERSONA — the locked-gate visitor
 * sees today's exact "Hermes Voice" manifest content, same as before this change.
 */
export const GET: RequestHandler = async ({ locals }) => {
	const persona = locals.principal?.persona ?? DEFAULT_PERSONA;

	const manifest = {
		name: `${persona.assistantName} · Matoušova platforma`,
		short_name: persona.assistantName,
		description: `Osobní platforma Matouše Králíka — ${persona.assistantName}`,
		display: 'standalone',
		orientation: 'portrait',
		background_color: '#f5f0e8',
		theme_color: '#f5f0e8',
		icons: [
			{ src: `${base}/icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
			{ src: `${base}/icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
			{
				src: `${base}/icons/icon-maskable-192.png`,
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: `${base}/icons/icon-maskable-512.png`,
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	};

	return new Response(JSON.stringify(manifest), {
		headers: {
			'Content-Type': 'application/manifest+json',
			'Cache-Control': 'no-store'
		}
	});
};
