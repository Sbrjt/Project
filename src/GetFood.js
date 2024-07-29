import { firestore, getDocs, collection } from './fb'
import { useRef, useState } from 'react'
import Map, {
	NavigationControl,
	FullscreenControl,
	GeolocateControl,
	Marker,
	Popup
} from 'react-map-gl'

const data = await getDocs(collection(firestore, 'data'))
for (let i of data.docs) {
	console.table(i.data())
}

function GetFood() {
	const [selectedMarker, setSelectedMarker] = useState()
	const geoControlRef = useRef()

	return (
		<div className='mx-auto my-5 col-11'>
			<h1>FoodMap</h1>
			<h4>These places have food around you!</h4>
			<div className='my-5'>
				<Map
					mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
					initialViewState={{
						latitude: 23,
						longitude: 85,
						zoom: 2
					}}
					style={{ width: 'auto', height: '80vh' }}
					mapStyle={`mapbox://styles/mapbox/${
						window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
					}-v11`}
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
					{data.docs.map((i) => {
						const point = i.data()
						return (
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
						)
					})}

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
			Get notified about nearby donators
			<button className='btn btn-md  btn-outline-warning rounded-circle ms-4'>
				<i className='bi bi-bell-fill fs-3'></i>
			</button>
		</div>
	)
}

export default GetFood
