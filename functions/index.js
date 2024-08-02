import { https } from 'firebase-functions'
import admin from 'firebase-admin'
import haversine from 'haversine-distance'

const app = admin.initializeApp()
const firestore = admin.firestore(app)
const fcm = admin.messaging(app)

// store FCM tokens in firestore (for users who wish to receive notification)
const addToken = https.onCall(async (data, context) => {
	try {
		await firestore.collection('tokens').doc(data.token).set({ latitude: data.latitude, longitude: data.longitude })
		console.log('📝 New token added: ', JSON.stringify(data))
		return 'Subscribed to notifications 🔔'
	} catch (err) {
		console.log(err)
		return 'Error'
	}
})

// store donor's location in firestore
const addLocation = https.onCall(async (data, context) => {
	// if (!context.auth) {
	// 	throw new https.HttpsError('unauthenticated', 'Please login')
	// }

	try {
		data.timestamp = admin.firestore.FieldValue.serverTimestamp() // add a firestore server timestamp to the data
		const ref = await firestore.collection('foodmap').add(data)
		const doc = await ref.get()
		console.log('📝 New record added: ', JSON.stringify(doc.data()))
		sendNotification(doc)
		return 'Record added 🥳'
	} catch (err) {
		console.log(err)
		return 'Error'
	}
})

// helper function to send push notification when addLocation() is invoked
async function sendNotification(new_location) {
	const tokens = await firestore.collection('tokens').get()

	for (let doc of tokens.docs) {
		// find distance between donor and subscribed users using haversine formula
		const distance = Math.round(haversine(doc.data(), new_location.data()) / 1000)

		// notification payload
		const msg = {
			notification: {
				title: 'Food available nearby',
				body: `By ${new_location.data().title} (${distance}km away)`,
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYv3xmElHnvX4tFyEmQCiMN-A4fdWKJ2X13A&s'
			},
			data: { url: `https://proj3-8bf4f.firebaseapp.com/get?id=${new_location.id}` },
			token: doc.id
		}

		fcm.send(msg)
	}

	console.log(`🔔 Initiated ${tokens.size} notifications`)
	return

	// Note: Multicast cannot be used here as the messages are dynamic :(
}

export { addLocation, addToken }
