import { useRef } from 'react'
import { signal } from '@preact/signals-react'
import { firestore, collection, onSnapshot } from './fb'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Marker, Popup } from 'react-map-gl'

const data = signal([]) // array to store all locations from firestore
const selectedMarker = signal() // currently selected marker (used to show a map popup)

// get data from firestore and store it in data array (updated real-time)
onSnapshot(collection(firestore, 'foodmap'), (snap) => {
	data.value = snap.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}))

	// Eg:
	// the route /get?id=123 will automatically set selectedMarker to the point with id='123'
	// (if it exists)
	const id = new URLSearchParams(window.location.search).get('id')
	selectedMarker.value = data.value.find((x) => x.id === id)
})

function FoodMap() {
	// a reference for the GeolocateControl component (used later)
	const geoControlRef = useRef()

	return (
		<>
			<Map
				mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
				initialViewState={{
					latitude: 23,
					longitude: 85,
					zoom: 2
				}}
				style={{ width: 'auto', aspectRatio: window.innerWidth < 576 ? '1/1' : '2.5/1' }}
				mapStyle={`mapbox://styles/mapbox/${window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}-v11`}
				onLoad={() => {
					geoControlRef.current?.trigger() // trigger the geolocation to zoom into the user's location after the map finishes loading
				}}
			>
				<GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} ref={geoControlRef} showAccuracyCircle={false} />
				<NavigationControl />
				<FullscreenControl />

				{/* add markers on the map from data */}
				{data.value.map((point) => {
					return (
						<Marker key={point.id} latitude={point.latitude} longitude={point.longitude}>
							<div
								style={{ cursor: 'pointer' }}
								onClick={() => {
									selectedMarker.value = point
								}}
							>
								<img src='/img/mapbox-icon.png' width='50' height='50' className='d-inline-block align-text-top mx-2' />
							</div>
						</Marker>
					)
				})}

				{/* show a popup when a marker is selected */}
				{selectedMarker.value && (
					<Popup
						latitude={selectedMarker.value.latitude}
						longitude={selectedMarker.value.longitude}
						onClose={() => (selectedMarker.value = null)}
						closeOnClick={false}
					>
						<h1>{selectedMarker.value.title}</h1>
						<div>{selectedMarker.value.description}</div>
					</Popup>
				)}
			</Map>
		</>
	)
}

export default FoodMap
