// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { STARLIGHT_SIDEBAR } from './docs-structure.mjs';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'After Effects C++ SDK ガイド（日本語）',
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
