import { https } from 'firebase-functions'
import admin from 'firebase-admin'

const app = admin.initializeApp()
const firestore = admin.firestore(app)

const test = https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new https.HttpsError('unauthenticated', 'Please login')
	}

	console.log('running')

	const snap = await firestore.collection('data').get()
	return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
})

export { test }
