import { useEffect, useRef, useState } from 'react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'

function GiveFood() {
	const [coords, setCoords] = useState({ lat: null, lng: null })
	const [mapLoad, setMapLoad] = useState(false)

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
				setMapLoad(true)
			})
		}
	}, [])

	const handleMapClick = (e) => {
		setCoords(e.lngLat)
	}

	return (
		<>
			<h1>Donating food at</h1>
			<h5>
				({coords.lat},{coords.lng})
			</h5>
			<div className='mx-auto'>
				{mapLoad && (
					<Map
						mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
						initialViewState={{
							latitude: coords.lat,
							longitude: coords.lng,
							zoom: 15
						}}
						style={{ width: '90vw', height: '80vh' }}
						mapStyle='mapbox://styles/mapbox/dark-v11'
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
			<h1>Thanks :&#41;</h1>
		</>
	)
}

export default GiveFood
