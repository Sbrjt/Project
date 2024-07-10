import { useState } from 'react'
import { auth, provider, test, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithCredential, GoogleOneTapLogin } from './fb'

function App() {
	const [showLogin, setShowLogin] = useState(true)

	async function login() {
		await signInWithRedirect(auth, provider)
	}

	async function logout() {
		await signOut(auth)
	}

	onAuthStateChanged(auth, (usr) => {
		if (usr) {
			console.log(usr.displayName, usr.email)
			setShowLogin(false)
		} else {
			console.log('Logged out')
		}
	})

	return (
		<>
			{showLogin && (
				<GoogleOneTapLogin
					googleAccountConfigs={{
						callback: async (res) => {
							await signInWithCredential(auth, GoogleAuthProvider.credential(res.credential))
						},
						client_id: '649235921586-5sqr0t85hvfthsro8e4t3m5mav1h10tf.apps.googleusercontent.com'
					}}
				/>
			)}
			<button onClick={login}>Log in</button>
			<button onClick={logout}>Log out</button>
			<button onClick={() => test().then((res) => console.log(res))}>test</button>
		</>
	)
}

export default App
