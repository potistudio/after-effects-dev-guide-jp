import { loadDefaultJapaneseParser } from 'budoux';

const ROOT_SELECTOR = '.sl-markdown-content';
const TARGET_SELECTOR = 'p, li, dt, dd, blockquote, figcaption, td, th, h1, h2, h3, h4, h5, h6';
const SKIP_ANCESTOR_SELECTOR = 'code, pre, kbd, samp, script, style, textarea, svg, math';
const HAS_JAPANESE_RE = /[\u3040-\u30FF\u3400-\u9FFF]/;

interface BudouxParser {
	parse(text: string): string[];
}

let parserPromise: Promise<BudouxParser | null> | undefined;
let hasLoadError = false;

function isBudouxParser(value: unknown): value is BudouxParser {
	if (typeof value !== 'object' || value === null) return false;
	const candidate = value as { parse?: unknown };
	return typeof candidate.parse === 'function';
}

function shouldProcessTextNode(node: Node | null): node is Text {
	if (!node || node.nodeType !== Node.TEXT_NODE || !node.nodeValue) return false;
	if (!HAS_JAPANESE_RE.test(node.nodeValue)) return false;

	const parentElement = (node as Text).parentElement;
	if (!parentElement) return false;
	if (parentElement.closest(SKIP_ANCESTOR_SELECTOR)) return false;
	if (parentElement.closest('[data-no-budoux]')) return false;

	return true;
}

function splitTextNodeWithBudoux(node: Text, parser: BudouxParser) {
	const text = node.nodeValue;
	if (!text) return;

	const chunks = parser.parse(text);
	if (chunks.length <= 1) return;

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < chunks.length; i += 1) {
		const segment = document.createElement('span');
		segment.className = 'budoux-segment';
		segment.style.wordBreak = 'keep-all';
		segment.style.overflowWrap = 'break-word';
		segment.textContent = chunks[i];
		fragment.append(segment);
		if (i < chunks.length - 1) fragment.append(document.createElement('wbr'));
	}

	node.parentNode?.replaceChild(fragment, node);
}

function applyBudouxToElement(element: Element, parser: BudouxParser) {
	if (!(element instanceof HTMLElement)) return;
	if (element.dataset.budouxApplied === 'true') return;

	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
	const nodes: Text[] = [];
	let currentNode = walker.nextNode();

	while (currentNode) {
		if (shouldProcessTextNode(currentNode)) nodes.push(currentNode);
		currentNode = walker.nextNode();
	}

	for (const node of nodes) splitTextNodeWithBudoux(node, parser);
	element.dataset.budouxApplied = 'true';
}

async function getJapaneseParser(): Promise<BudouxParser | null> {
	if (!parserPromise) {
		parserPromise = Promise.resolve(loadDefaultJapaneseParser() as unknown)
			.then((parser) => (isBudouxParser(parser) ? parser : null))
			.catch((error: unknown) => {
				if (!hasLoadError) {
					console.warn('Failed to load budoux parser.', error);
					hasLoadError = true;
				}
				return null;
			});
	}
	return parserPromise;
}

export async function applyBudouxLineBreaks() {
	const parser = await getJapaneseParser();
	if (!parser) return;

	const roots = document.querySelectorAll(ROOT_SELECTOR);
	for (const root of roots) {
		const targets = root.querySelectorAll(TARGET_SELECTOR);
		for (const target of targets) applyBudouxToElement(target, parser);
	}
}
