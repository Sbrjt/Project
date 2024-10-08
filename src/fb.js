import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, signInWithCredential } from 'firebase/auth'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
import { collection, getDocs, persistentLocalCache, initializeFirestore, connectFirestoreEmulator, onSnapshot, doc } from 'firebase/firestore'
import { getMessaging, getToken } from 'firebase/messaging'
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
const firestore = initializeFirestore(app, { localCache: persistentLocalCache({}) })
const functions = getFunctions(app)
const messaging = getMessaging(app)
const addLocation = httpsCallable(functions, 'addLocation')
const addToken = httpsCallable(functions, 'addToken')

// for testing with emulator
if (window.location.hostname === '127.0.0.1') {
	connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
	connectFunctionsEmulator(functions, '127.0.0.1', 5001)
}

export {
	auth,
	provider,
	GoogleAuthProvider,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	signInWithCredential,
	GoogleOneTapLogin,
	collection,
	firestore,
	getDocs,
	doc,
	onSnapshot,
	getToken,
	messaging,
	addLocation,
	addToken
}
