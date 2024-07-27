import { useEffect, useState } from 'react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'
import { test } from './fb'

function GiveFood() {
	const [coords, setCoords] = useState({ lat: null, lng: null })
	const [mapLoad, setMapLoad] = useState(false)

	// find user's coordinates and center the map
	useEffect(() => {
		// this code runs only once
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
				setMapLoad(true)
			})
		}
	}, [])

	function handleMapClick(e) {
		setCoords(e.lngLat)
	}

	function handleFormSubmit(e) {
		e.preventDefault()
		const { name, details } = e.target.elements

		console.table({
			Name: name.value,
			Location: coords.lat + ' ' + coords.lng,
			Details: details.value
		})

		test({
			name: name.value,
			details: details.value,
			coords: coords
		})
	}

	return (
		<div className='mx-auto my-5'>
			<form onSubmit={handleFormSubmit}>
				<h1>Donate food 🍪</h1>

				{/* name */}
				<div className='input-group my-3'>
					<span className='input-group-text'>
						<i className='bi bi-person'></i>
					</span>
					<div className='form-floating'>
						<input className='form-control' id='name' placeholder='' />
						<label htmlFor='name'>Name of organisation or person</label>
					</div>
				</div>

				{/* map */}
				<div>
					<div>
						<p>Select your location: </p>
					</div>
					<div className='mx-auto my-3 border rounded '>
						{mapLoad && (
							<Map
								mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
								initialViewState={{
									latitude: coords.lat,
									longitude: coords.lng,
									zoom: 15
								}}
								style={{
									width: '70vw',
									height: '80vh',
									borderRadius: '0.3rem'
								}}
								mapStyle='mapbox://styles/mapbox/dark-v11/'
								onClick={handleMapClick}
							>
								<GeolocateControl
									positionOptions={{ enableHighAccuracy: true }}
									trackUserLocation={true}
									showAccuracyCircle={false}
								/>
								<NavigationControl />
								<FullscreenControl />

								<Marker longitude={coords.lng} latitude={coords.lat} />
							</Map>
						)}
					</div>
				</div>

				{/* details */}
				<div className='form-floating my-3'>
					<textarea
						className='form-control'
						placeholder='Leave a comment here'
						id='details'
						style={{ height: '100px' }}
					></textarea>
					<label htmlFor='details'>More details</label>
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
		</div>
	)
}

export default GiveFood
