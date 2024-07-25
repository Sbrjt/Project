import { useRef, useState } from 'react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'

function GiveFood() {
	const [coords, setCoords] = useState({
		lat: 23,
		lng: 85
	})

	const handleMapClick = (e) => {
		setCoords(e.lngLat)
		console.log(coords.lat, coords.lng)
	}

	return (
		<div className='mx-auto'>
			<h1>Donate food: </h1>
			<Map
				mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
				initialViewState={{
					latitude: 23,
					longitude: 85,
					zoom: 2
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

				{/* add markers on the map from data */}
				{/* {data.map((point) => (
					<Marker latitude={point.latitude} longitude={point.longitude}>
						<div style={{ cursor: 'pointer' }} onClick={() => setSelectedMarker(point)}>
							<img
								src='/img/mapbox-icon.png'
								width='50'
								height='50'
								className='d-inline-block align-text-top mx-2'
							/>
						</div>
					</Marker>
				))} */}

				{/* display popup if marker is selected */}
				{/* {selectedMarker && (
					<Popup
						latitude={selectedMarker.latitude}
						longitude={selectedMarker.longitude}
						onClose={() => setSelectedMarker(null)}
						closeOnClick={false}
					>
						<h1>{selectedMarker.title}</h1>
						<div>{selectedMarker.description}</div>
					</Popup>
				)} */}
			</Map>
			<h1>Thanks :&#41;</h1>
		</div>
	)
}

export default GiveFood
