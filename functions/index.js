import { https } from 'firebase-functions'
import admin from 'firebase-admin'

const app = admin.initializeApp()
const firestore = admin.firestore(app)

const test = https.onCall(async (data, context) => {
	// if (!context.auth) {
	// 	throw new https.HttpsError('unauthenticated', 'Please login')
	// }

	try {
		const { name, details, coords } = data

		await firestore.collection('data').doc().set({
			title: name,
			latitude: coords.lat,
			longitude: coords.lng,
			description: details
		})

		return { message: 'Document successfully written!' }
	} catch (err) {
		console.error('Error writing document: ', err)
		throw new https.HttpsError('internal', 'Error writing document')
	}
})

export { test }
