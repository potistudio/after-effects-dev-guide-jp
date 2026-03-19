// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import { STARLIGHT_SIDEBAR } from './docs-structure.mjs';
import { rehypeAutolinkTerms } from './plugins/rehype-autolink-terms.mjs';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://aedevdocjp.poti.studio',
	compressHTML: true,
	image: {
		service: passthroughImageService(),
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'load',
	},
	experimental: {
		clientPrerender: true,
	},
	integrations: [
		starlight({
			title: "After Effects C++ SDKガイド 非公式日本語訳",
			favicon: "favicon.ico",
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
					href: 'https://github.com/potistudio/after-effects-dev-guide-jp',
				},
			],
			components: {
				Head: './src/components/StarlightHead.astro',
			},
			sidebar: STARLIGHT_SIDEBAR,
		}),
		mdx({
			extendMarkdownConfig: true,
			rehypePlugins: [rehypeAutolinkTerms],
		})
	],
});
