// plugins/rehype-autolink-terms.mjs
import { visit } from 'unist-util-visit';

const TERM_MAP = {
	"PF_Handle": "https://ae-scripting.docsforadobe.dev/aftereffects/typedefs/PF_Handle.html",
	"PF_Err": "https://ae-scripting.docsforadobe.dev/aftereffects/typedefs/PF_Err.html",
	"PF_EffectWorld": "https://ae-scripting.docsforadobe.dev/aftereffects/typedefs/PF_EffectWorld.html",
};

export function rehypeAutolinkTerms() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			// インラインコード（<code>）のみ対象、<pre>の中はスキップ
			if (node.tagName !== 'code') return;
			// すでにリンク内にいる場合もスキップ
			if (parent?.tagName === 'a') return;

			const textNode = node.children?.[0];
			if (textNode?.type !== 'text') return;

			const term = textNode.value;
			const href = TERM_MAP[term];
			if (!href) return;

			// <code> ノードを <a href="..."><code>...</code></a> で包む
			const linkNode = {
				type: 'element',
				tagName: 'a',
				properties: { href },
				children: [node],
			};

			parent.children.splice(index, 1, linkNode);
		});
	};
}
