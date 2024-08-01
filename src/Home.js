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

	return (
		<div className='p-3 p-md-5 text-center '>
			<div className='col-md-5 p-lg-5 mx-auto my-5'>
				<h1 className='display-4 fw-bold'>{user ? `Hi ${user}!` : `Hi User`}</h1>
				<p className='lead fw-normal'>Welcome 🎉</p>
				<div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
					<a className='btn btn-warning btn-lg px-4 gap-3' href='/get'>
						Get Food
					</a>
					<a className='btn btn-primary btn-lg px-4 gap-3' href='give'>
						Give Food
					</a>
				</div>
			</div>
		</div>
	)
}

export default Home
