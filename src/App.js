import Home from './Home'
import Footer from './Footer'
import Member from './Member'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	let installPrompt = null

	window.addEventListener('beforeinstallprompt', (e) => {
		installPrompt = e
		console.log(installPrompt)
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
		<Router>
			<div className='min-vh-100 d-flex flex-column justify-content-between'>
				<Navbar />
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/member' element={<Member />} />
					<Route path='*' element={<Home />} />
				</Routes>
				<button className='btn btn-outline-secondary btn-lg px-4' onClick={install}>
					Install app
				</button>
				<Footer />
			</div>
		</Router>
	)
}

export default App
