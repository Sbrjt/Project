importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

const {
	routing: { registerRoute, setCatchHandler },
	strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
	cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
	expiration: { ExpirationPlugin, CacheExpiration },
	precaching: { matchPrecache, precacheAndRoute }
} = workbox

// Cache page navigations (html) with a Network First strategy
registerRoute(
	({ request, url }) => request.mode === 'navigate',
	new NetworkFirst({
		cacheName: 'pages',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200]
			})
		]
	})
)

// Cache CSS, JS, Manifest, and Web Worker
registerRoute(
	({ request }) =>
		request.destination === 'script' ||
		request.destination === 'style' ||
		request.destination === 'manifest' ||
		request.destination === 'worker',
	new NetworkFirst({
		cacheName: 'static-assets',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			}),
			new ExpirationPlugin({
				maxEntries: 32,
				maxAgeSeconds: 24 * 60 * 60 // 24 hours
			})
		]
	})
)
