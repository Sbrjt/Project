import { signal } from '@preact/signals-react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'

const coords = signal({ lat: null, lng: null, en: false })

// find user's coordinates and center the map
navigator.geolocation.getCurrentPosition((position) => {
	coords.value = { lat: position.coords.latitude, lng: position.coords.longitude, en: true }
})

function DonateMap() {
	function handleMapClick(e) {
		coords.value = { ...e.lngLat, en: true }
	}

	return (
		<>
			{coords.value.en && (
				<Map
					mapboxAccessToken='pk.eyJ1Ijoic2JyanQiLCJhIjoiY2x5eDhtenhqMTQ5YzJrc2JtZjZxM3F1ZiJ9.4cpjXQC8jPhho1eg47h1rQ'
					initialViewState={{
						latitude: coords.value.lat,
						longitude: coords.value.lng,
						zoom: 15
					}}
					style={{ width: 'auto', aspectRatio: window.innerWidth < 576 ? '1/1' : '2/1', borderRadius: '0.3rem' }}
					mapStyle={`mapbox://styles/mapbox/${window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}-v11`}
					onClick={handleMapClick}
					tabIndex={-1}
				>
					<GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} showAccuracyCircle={false} />
					<NavigationControl />
					<FullscreenControl />

					<Marker longitude={coords.value.lng} latitude={coords.value.lat} />
				</Map>
			)}
		</>
	)
}

export { DonateMap as default, coords }
