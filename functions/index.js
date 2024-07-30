import { https } from 'firebase-functions'
import admin from 'firebase-admin'
import { getMessaging } from 'firebase-admin/messaging'
import haversine from 'haversine-distance'

const app = admin.initializeApp()
const firestore = admin.firestore(app)

// helper function to send notification when addLocation() is invoked
async function sendNotification(point) {
	const docs = await firestore.collection('tokens').get()

	docs.forEach(async (doc) => {
		const { token, latitude, longitude } = doc.data()

		// finds distance between donor and current token from doc
		const distance = Math.trunc(haversine(doc.data(), point) / 1000)

		const msg = {
			notification: {
				title: 'Food available nearby',
				body: `By ${point.title} (${distance} away)`,
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYv3xmElHnvX4tFyEmQCiMN-A4fdWKJ2X13A&s'
			},
			data: { url: 'https://proj3-8bf4f.firebaseapp.com/' },
			token: token
		}

		await getMessaging().send(msg)
	})

	return

	// const response = await getMessaging().sendMulticast(msg)
	// console.log('Notification: ', 'Sent ', response.successCount, ', Fails ', response.failureCount)
}

const addLocation = https.onCall(async (data, context) => {
	// if (!context.auth) {
	// 	throw new https.HttpsError('unauthenticated', 'Please login')
	// }

	await firestore.collection('data').doc().set(data)
	// console.log('New record added: \n', JSON.stringify(data))
	await sendNotification(data)
	return
})

// adds user token for sending notification
const addToken = https.onCall(async (data, context) => {
	await firestore.collection('tokens').doc().set(data)
	console.log('New token added: \n', JSON.stringify(data))
	return
})

export { addLocation, addToken }
