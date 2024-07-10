import { https } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'

const app = initializeApp()

const test = https.onCall((data, context) => {
	if (!context.auth) {
		throw new https.HttpsError('unauthenticated', 'only authenticated users can add requests')
	}

	console.log('running')

	return 'hello'
})

export { test }
