import Cover from './Cover'
import Footer from './Footer'
import Navbar from './Navbar'

function App() {
	return (
		<div className='min-vh-100 d-flex flex-column justify-content-between'>
			<Navbar />
			<Cover />
			<Footer />
		</div>
	)
}

export default App
