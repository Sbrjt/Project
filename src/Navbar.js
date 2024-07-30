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
				<button className='navbar-toggler' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasNavbar'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='offcanvas offcanvas-end' tabIndex='-1' id='offcanvasNavbar'>
					<div className='offcanvas-header'>
						<h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
							Offcanvas
						</h5>
						<button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
					</div>
					<div className='offcanvas-body'>
						<div className='navbar-nav justify-content-end flex-grow-1 pe-3'>
							<NavLink className='nav-link' to='/home'>
								Home
							</NavLink>
							<NavLink className='nav-link' to='/get'>
								FoodMap
							</NavLink>
							<NavLink className='nav-link' to='/give'>
								Donate Food
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
