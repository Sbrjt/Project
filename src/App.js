import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import GetFood from './GetFood'
import GiveFood from './GiveFood'
import Member from './Member'
import Footer from './Footer'

function App() {
	return (
		<Router>
			<div className='min-vh-100 d-flex flex-column justify-content-between home'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/member' element={<Member />} />
					<Route path='/get' element={<GetFood />} />
					<Route path='/give' element={<GiveFood />} />
					<Route path='/members' element={<Member />} />
					<Route path='*' element={<Home />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
