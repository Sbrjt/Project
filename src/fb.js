import { initializeApp } from 'firebase/app'
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	signInWithCredential
} from 'firebase/auth'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore'
import GoogleOneTapLogin from 'react-google-one-tap-login'

const app = initializeApp({
	apiKey: 'AIzaSyBXWlTpsD1IwNVk4eR7xLLwawRKbXQv8ZI',
	authDomain: 'proj3-8bf4f.firebaseapp.com',
	projectId: 'proj3-8bf4f',
	storageBucket: 'proj3-8bf4f.appspot.com',
	messagingSenderId: '649235921586',
	appId: '1:649235921586:web:36597201f19d0ffe02e7ab'
})

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const firestore = getFirestore(app)
const functions = getFunctions(app)
const test = httpsCallable(functions, 'test')

if (window.location.hostname === '127.0.0.1') {
	connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
	connectFunctionsEmulator(functions, '127.0.0.1', 5001)
}

export {
	auth,
	provider,
	firestore,
	collection,
	getDocs,
	GoogleAuthProvider,
	test,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	signInWithCredential,
	GoogleOneTapLogin
}
