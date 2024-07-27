import Navbar from './Navbar'
import Home from './Home'
import Member from './Member'
import GetFood from './GetFood'
import GiveFood from './GiveFood'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

function App() {
	const [install, setInstall] = useState(null)

	window.addEventListener('beforeinstallprompt', (e) => {
		setInstall(e)
	})

	return (
		<Router>
			<div className='min-vh-100 d-flex flex-column justify-content-between'>
				<Navbar installPrompt={install} />
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/member' element={<Member />} />
					<Route path='/get' element={<GetFood />} />
					<Route path='/give' element={<GiveFood />} />
					<Route path='*' element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
