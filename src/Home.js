import { useState } from 'react'
import { auth, onAuthStateChanged } from './fb'
import { test } from './fb'

function Home() {
	const [user, setUser] = useState('User')

	onAuthStateChanged(auth, (usr) => {
		if (usr) {
			setUser(usr.displayName)
		} else {
			setUser('')
		}
	})

	let installPrompt = null

	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault()
		installPrompt = e
	})

	// show install pop-up if app not already installed
	async function install() {
		console.log(installPrompt)

		if (installPrompt) {
			await installPrompt.prompt()
			const { outcome } = await installPrompt.userChoice
			if (outcome === 'accepted') {
				installPrompt = null
			}
		}
	}

	return (
		<div className=' p-3 p-md-5 m-md-3 text-center bg-light'>
			<div className='col-md-5 p-lg-5 mx-auto my-5'>
				<h1 className='display-4 fw-bold'>{user ? `Hi ${user}!` : `Hi User`}</h1>
				<p className='lead fw-normal'>{user ? `Welcome 🎉` : `Plz login :)`}</p>
				<div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
					<button onClick={() => test().then((res) => console.log(res))} className='btn btn-primary btn-lg px-4 gap-3'>
						Test backend
					</button>
					<button className='btn btn-outline-secondary btn-lg px-4' onClick={install}>
						Install app
					</button>
				</div>
			</div>
		</div>
	)
}

export default Home
