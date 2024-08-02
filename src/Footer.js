function Footer() {
	return (
		<>
			<footer className='footer mt-auto px-3 px-sm-5'>
				<div className='d-flex justify-content-between border-top border-2 border-secondary py-3 px-1 my-auto'>
					<div className=' my-auto'>
						<img src='/img/mascot.svg' height='20' />
						<a className='mx-3 mx-sm-4 fw-light link-underline link-underline-opacity-0 link-body-emphasis ' href='/member'>
							BinaryCoders
						</a>
					</div>
					<a href='https://github.com/Sbrjt/Project' className='link-body-emphasis my-auto fs-5'>
						<i className='bi bi-github my-auto'></i>
					</a>
				</div>
			</footer>
		</>
	)
}

export default Footer
