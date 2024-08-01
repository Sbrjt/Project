function Footer() {
	return (
		<>
			<footer className='footer mt-auto px-3 px-sm-5'>
				<div className='d-flex justify-content-between border-top border-2 border-secondary py-3 '>
					<div>
						<img src='/img/mascot.svg' height='20' />
						<span className='mx-3 mx-sm-4 fw-light'>BinaryCoders</span>
					</div>
					<a href='https://github.com/Sbrjt/Project' className='link-dark'>
						<i className='bi bi-github'></i>
					</a>
				</div>
			</footer>
		</>
	)
}

export default Footer
