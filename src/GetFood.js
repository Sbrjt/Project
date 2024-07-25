import { useRef, useState } from 'react'
import Map, {
	NavigationControl,
	FullscreenControl,
	GeolocateControl,
	Marker,
	Popup
} from 'react-map-gl'

const data = [
	{
		longitude: 88.370995,
		latitude: 22.770993,
		title: 'Mapbox',
		description: 'Washington, D.C.'
	},
	{
		longitude: 88.36997,
		latitude: 22.770785,
		title: 'Mapbox',
		description: 'San Francisco, California'
	}
]

function GetFood() {
	const [selectedMarker, setSelectedMarker] = useState()
	const geoControlRef = useRef()

	return (
		<>
			<h1>These places have food around you!</h1>
			<div className='mx-auto my-5'>
				<Map
					mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
					initialViewState={{
						latitude: 23,
						longitude: 85,
						zoom: 2
					}}
					style={{ width: '90vw', height: '60vh' }}
					mapStyle='mapbox://styles/mapbox/dark-v11'
					onLoad={() => {
						geoControlRef.current?.trigger()
					}}
				>
					<GeolocateControl
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
						ref={geoControlRef}
						showAccuracyCircle={false}
					/>
					<NavigationControl />
					<FullscreenControl />

					{/* add markers on the map from data */}
					{data.map((point) => (
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
					))}

					{/* display popup if marker is selected */}
					{selectedMarker && (
						<Popup
							latitude={selectedMarker.latitude}
							longitude={selectedMarker.longitude}
							onClose={() => setSelectedMarker(null)}
							closeOnClick={false}
						>
							<h1>{selectedMarker.title}</h1>
							<div>{selectedMarker.description}</div>
						</Popup>
					)}
				</Map>
			</div>
		</>
	)
}

export default GetFood
