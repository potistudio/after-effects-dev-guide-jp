// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { STARLIGHT_SIDEBAR } from './docs-structure.mjs';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://aeddjp.poti.studio',
	compressHTML: true,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'load',
	},
	experimental: {
		clientPrerender: true,
	},
	integrations: [
		starlight({
			title: 'After Effects C++ SDK ガイド（日本語）',
			favicon: '/favicon.ico',
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/png',
						href: '/favicon.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						href: '/favicon.png',
					},
				},
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/docsforadobe/after-effects-plugin-guide',
				},
			],
			components: {
				Head: './src/components/StarlightHead.astro',
			},
			sidebar: STARLIGHT_SIDEBAR,
		}),
	],
});
