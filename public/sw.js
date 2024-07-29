importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

const {
	routing: { registerRoute, setCatchHandler },
	strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
	cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
	expiration: { ExpirationPlugin, CacheExpiration },
	precaching: { matchPrecache, precacheAndRoute }
} = workbox

// // TODO: precache

// // NetworkFirst for mapbox
registerRoute(
	({ url }) => url.origin === 'https://api.mapbox.com',
	new NetworkFirst({
		cacheName: 'NetworkFirst'
	})
)

// // CacheFirst for images, bs, fonts
registerRoute(
	({ url, request }) =>
		request.destination === 'image' ||
		url.origin === 'https://stackpath.bootstrapcdn.com' ||
		url.origin === 'https://cdn.jsdelivr.net' ||
		url.origin === 'https://cdnjs.cloudflare.com' ||
		url.origin === 'https://fonts.googleapis.com' ||
		url.origin === 'https://fonts.gstatic.com',
	new CacheFirst({
		cacheName: 'CacheFirst',
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
			})
		]
	})
)

// // StaleWhileRevalidate for html, js, css
registerRoute(
	({ request }) =>
		request.mode === 'navigate' ||
		request.destination === 'script' ||
		request.destination === 'style' ||
		request.destination === 'manifest' ||
		request.destination === 'worker',
	new StaleWhileRevalidate({
		cacheName: 'StaleWhileRevalidate'
	})
)

// NOTE:
// mapbox creates its own cache: mapbox-tile
// persistentLocalCache has been used for firestore

// For FCM:
self.addEventListener('push', (e) => {
	const notif = e.data.json().notification
	const data = e.data.json().data
	console.log(notif)
	console.log(data)

	e.waitUntil(
		self.registration.showNotification(notif.title, {
			body: notif.body,
			icon: notif.image,
			data: {
				url: data.url
			}
		})
	)
})

self.addEventListener('notificationclick', (e) => {
	e.waitUntil(clients.openWindow(e.notification.data.url))
})
