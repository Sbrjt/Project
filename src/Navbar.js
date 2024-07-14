import Login from './Login'

function Navbar() {
	return (
		<div>
			<nav className='navbar bg-light  navbar-expand-sm px-sm-5 px-3 py-3 '>
				<a className='navbar-brand ' href='#'>
					<img src='/img/logo512.png' width='24' height='24' className='d-inline-block align-text-top mx-2' />
					React
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
							<a className='nav-link active' href='/home'>
								Home
							</a>
							<a className='nav-link' href='/member'>
								Members
							</a>
							<Login className='nav-link' />
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
