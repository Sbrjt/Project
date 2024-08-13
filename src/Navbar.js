import Login from './Login'
import { NavLink } from 'react-router-dom'

let install = null

window.addEventListener('beforeinstallprompt', (e) => {
	install = e
})

function Navbar() {
	// show install pop-up if app not already installed
	async function handleInstall() {
		if (install) {
			await install.prompt()
			const { outcome } = await install.userChoice
			if (outcome === 'accepted') {
				install = null
			}
		}
	}

	return (
		<div>
			<nav className='navbar bg-light  navbar-expand-sm px-sm-5 px-3 py-3 '>
				<a className='navbar-brand ' href='/'>
					<img src='/img/logo512.png' width='24' height='24' className='d-inline-block align-text-top mx-2' />
					Prototype
				</a>
				<button className='navbar-toggler border-0 px-2' style={{ zIndex: 1046 }} data-bs-toggle='offcanvas' data-bs-target='#offcanvasNavbar'>
					<span className='icon-bar top-bar'></span>
					<span className='icon-bar middle-bar'></span>
					<span className='icon-bar bottom-bar'></span>
				</button>
				<div className='offcanvas offcanvas-end' id='offcanvasNavbar' tabIndex='-1'>
					<div className='offcanvas-header'>
						<h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
							Offcanvas
						</h5>
					</div>
					<div className='offcanvas-body'>
						<div className='navbar-nav justify-content-end flex-grow-1 pe-3'>
							<NavLink className='nav-link' to='/'>
								<p className='m-0' data-bs-dismiss='offcanvas'>
									Home
								</p>
							</NavLink>
							<NavLink className='nav-link' to='/get'>
								<p className='m-0' data-bs-dismiss='offcanvas'>
									FoodMap
								</p>
							</NavLink>
							<NavLink className='nav-link' to='/give'>
								<p className='m-0' data-bs-dismiss='offcanvas'>
									Donate Food
								</p>
							</NavLink>
							<Login className='nav-link' />
							<button className='btn btn-outline-primary' onClick={handleInstall}>
								Get app
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
