const NAVIGATION_CACHE_NAME = 'navigation-cache-v1';
const OFFLINE_FALLBACK_TEXT = 'You are offline.';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(NAVIGATION_CACHE_NAME)
			.then((cache) => cache.add(new Request('/', { cache: 'reload' })))
			.catch(() => undefined)
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== NAVIGATION_CACHE_NAME)
						.map((key) => caches.delete(key))
				)
			)
			.then(() => self.clients.claim())
	);
});

function isNavigationRequest(request) {
	if (request.mode === 'navigate') return true;
	const accept = request.headers.get('accept') || '';
	return accept.includes('text/html');
}

async function updateNavigationCache(request) {
	try {
		const response = await fetch(request);
		if (response && response.ok) {
			const cache = await caches.open(NAVIGATION_CACHE_NAME);
			await cache.put(request, response.clone());
		}
		return response;
	} catch {
		return null;
	}
}

async function handleNavigation(event) {
	const { request } = event;
	const cache = await caches.open(NAVIGATION_CACHE_NAME);
	const cached = await cache.match(request);
	const networkPromise = updateNavigationCache(request);

	if (cached) {
		event.waitUntil(networkPromise);
		return cached;
	}

	const networkResponse = await networkPromise;
	if (networkResponse) return networkResponse;

	const fallback = await cache.match('/');
	if (fallback) return fallback;

	return new Response(OFFLINE_FALLBACK_TEXT, {
		status: 503,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;
	if (!isNavigationRequest(request)) return;

	event.respondWith(handleNavigation(event));
});
