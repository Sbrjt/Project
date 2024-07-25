import { useState } from 'react'
import {
	auth,
	provider,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithCredential,
	GoogleOneTapLogin
} from './fb'

function Login() {
	const [isLoggedIn, setIsLoggedIn] = useState(true)

	async function login() {
		await signInWithRedirect(auth, provider)
	}

	async function logout() {
		await signOut(auth)
	}

	onAuthStateChanged(auth, (usr) => {
		if (usr) {
			setIsLoggedIn(false)
		} else {
			setIsLoggedIn(true)
		}
	})

	return (
		<>
			{/* {isLoggedIn && (
				<GoogleOneTapLogin
					googleAccountConfigs={{
						callback: async (res) => {
							await signInWithCredential(auth, GoogleAuthProvider.credential(res.credential))
						},
						client_id: '649235921586-5sqr0t85hvfthsro8e4t3m5mav1h10tf.apps.googleusercontent.com'
					}}
				/>
			)}
			<button onClick={login} className={`btn btn-outline-primary ${isLoggedIn ? '' : 'd-none'}`}>
				Log in
			</button>
			<button onClick={logout} className={`btn btn-outline-secondary ${isLoggedIn ? 'd-none' : ''}`}>
				Log out
			</button> */}
		</>
	)
}

export default Login
