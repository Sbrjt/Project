import Home from './Home'
import Footer from './Footer'
import Member from './Member'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<Router>
			<div className='min-vh-100 d-flex flex-column justify-content-between'>
				<Navbar />
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/member' element={<Member />} />
					<Route path='*' element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
