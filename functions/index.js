import { https } from 'firebase-functions'
import admin from 'firebase-admin'
import haversine from 'haversine-distance'

const app = admin.initializeApp()
const firestore = admin.firestore(app)
const fcm = admin.messaging()

// adds fcm token of users in 'token' collection
const addToken = https.onCall(async (data, context) => {
	try {
		await firestore.collection('tokens').doc().set(data)
		console.log('New token added: ', JSON.stringify(data))
		return { msg: 'Subscribed to notifications 🔔' }
	} catch (err) {
		console.log(err)
		return { msg: 'Error' }
	}
})

// adds donor's location to 'data' collection
const addLocation = https.onCall(async (data, context) => {
	// if (!context.auth) {
	// 	throw new https.HttpsError('unauthenticated', 'Please login')
	// }

	try {
		data.timestamp = admin.firestore.FieldValue.serverTimestamp()
		await firestore.collection('data').doc().set(data)
		console.log('New record added: ', JSON.stringify(data))
		sendNotification(data)
		return { msg: 'Record added 🥳' }
	} catch (err) {
		console.log(err)
		return { msg: 'Error' }
	}
})

// helper function to send notification when addLocation() is invoked
async function sendNotification(point) {
	const docs = await firestore.collection('tokens').get()

	let count = 0
	docs.forEach((doc) => {
		// finds distance between donor and current token using haversine formula
		const distance = Math.round(haversine(doc.data(), point) / 1000)

		// notif payload
		const msg = {
			notification: {
				title: 'Food available nearby',
				body: `By ${point.title} (${distance}km away)`,
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYv3xmElHnvX4tFyEmQCiMN-A4fdWKJ2X13A&s'
			},
			data: { url: 'https://proj3-8bf4f.firebaseapp.com/' },
			token: doc.data().token
		}

		fcm.send(msg)
		count++
	})

	console.log(`Sent ${count} notifications`)
	return

	// can't use multicast as the messages are dynamic :(
}

export { addLocation, addToken }
