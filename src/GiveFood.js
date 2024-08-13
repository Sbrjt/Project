import DonateMap, { coords } from './DonateMap'
import { addLocation } from './fb'

function GiveFood() {
	async function handleFormSubmit(e) {
		e.preventDefault()
		const { name, details } = e.target.elements

		const res = await addLocation({
			title: name.value,
			latitude: coords.value.lat,
			longitude: coords.value.lng,
			description: details.value
		})

		console.log(res.data)
		console.table({ title: name.value, latitude: coords.value.lat, longitude: coords.value.lng, description: details.value })
	}

	return (
		<div className='bg-white'>
			<div className='mx-auto my-5 col-lg-8 col-md-9 col-sm-10 col-11'>
				<form onSubmit={handleFormSubmit}>
					<h1>Donate food 🍪</h1>
					{/* name */}
					<div className='input-group my-3'>
						<span className='input-group-text'>
							<i className='bi bi-person'></i>
						</span>
						<div className='form-floating'>
							<input className='form-control' id='name' placeholder='' required />
							<label htmlFor='name'>Name of organisation or person</label>
						</div>
					</div>
					{/* map */}
					<div>
						<div>
							<p>Pick your location: </p>
						</div>
						<div className='mx-auto my-3 border rounded'>
							<DonateMap />
						</div>
					</div>
					{/* details */}
					<div className='form-floating my-3'>
						<textarea className='form-control' placeholder='Leave a comment here' id='details' style={{ height: '100px' }}></textarea>
						<label htmlFor='details'>More details here...</label>
					</div>
					<button className='btn btn-lg btn-primary my-3'>Submit</button>
					{/*
				<div className='input-group mb-3'>
					<span className='input-group-text'>
						<i className='bi bi-geo-alt'></i>
					</span>
					<div className='form-floating'>
						<textarea className='form-control' placeholder='' id='address'></textarea>
						<label htmlFor='address'>Landmarks</label>
					</div>
				</div>
				<div className='form-floating'></div>
				<div className='row g-2'>
					<div className='col-md'>
						<label htmlFor='marker'>Choose map marker:</label>
					</div>
					<div className='col-md'>
						<label htmlFor='marker'>
							<input type='radio' className='btn-check' name='marker' id='marker1' />
							<label className='btn rounded-5' htmlFor='marker1'>
								🍰
							</label>
							<input type='radio' className='btn-check' name='marker' id='marker2' />
							<label className='btn' htmlFor='marker2'>
								🍪
							</label>
							<input type='radio' className='btn-check' name='marker' id='marker3' />
							<label className='btn' htmlFor='marker3'>
								🫓
							</label>
							<input type='radio' className='btn-check' name='marker' id='marker4' />
							<label className='btn' htmlFor='marker4'>
								🍔
							</label>
							<input type='radio' className='btn-check' name='marker' id='marker5' />
							<label className='btn' htmlFor='marker5'>
								🍊
							</label>
							<input type='radio' className='btn-check' name='marker' id='marker6' />
							<label className='btn' htmlFor='marker6'>
								🍦
							</label>
							<input type='radio' className='btn-check' name='marker' id='marker7' />
							<label className='btn' htmlFor='marker7'>
								🍜
							</label>
						</label>
					</div>
				</div>
				<h1>Thanks :&#41;</h1>

				 <div className='row g-2'>
					<div className='col-md'>
						<div className='input-group mb-3'>
							<span className='input-group-text'>@</span>
							<div className='form-floating'>
								<input type='email' className='form-control' id='email' placeholder='' />
								<label htmlFor='email'>Email</label>
							</div>
						</div>
					</div>
					<div className='col-md'>
						<div className='input-group mb-3'>
							<span className='input-group-text'>
								<i className='bi bi-telephone'></i>
							</span>
							<div className='form-floating'>
								<input type='tel' className='form-control' id='phone' placeholder='' />
								<label htmlFor='phone'>Phone</label>
							</div>
						</div>
					</div>
				</div> 
				*/}
				</form>
			</div>{' '}
		</div>
	)
}

export default GiveFood
