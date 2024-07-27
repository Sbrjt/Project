import { https } from 'firebase-functions'
import admin from 'firebase-admin'

const app = admin.initializeApp()
const firestore = admin.firestore(app)

const test = https.onCall(async (data, context) => {
	// if (!context.auth) {
	// 	throw new https.HttpsError('unauthenticated', 'Please login')
	// }

	const { name, details, coords } = data

	const record = {
		title: name,
		latitude: coords.lat,
		longitude: coords.lng,
		description: details
	}

	await firestore.collection('data').doc().set(record)

	console.log('New record added: ', JSON.stringify(record))

	return { message: 'Document successfully written!' }
})

export { test }
