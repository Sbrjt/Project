import FoodMap from './FoodMap'
import { getToken, messaging, addToken } from './fb'

// to subscribe user to notifications
async function handleNotif() {
	// get current location of user
	navigator.geolocation.getCurrentPosition(async (position) => {
		// get registered sw
		const sw = await navigator.serviceWorker.ready

		// request notification permission from user and retrieve FCM token
		const token = await getToken(messaging, {
			serviceWorkerRegistration: sw,
			vapidKey: 'BLNbbQ0sAtySrC1XbNd7fXc0vaR12_ueRoffdnMiPtjQZnyNGP9uB63x18JIxIPIqpdcFUU2LgAN1hJnJ1jzE9s'
		})

		// add token and coordinates to firestore
		const res = await addToken({ token: token, latitude: position.coords.latitude, longitude: position.coords.longitude })
		console.log(res.data)
	})
}

function GetFood() {
	return (
		<div className='bg-white'>
			<div className='mx-auto my-5 col-11 '>
				<h1>FoodMap</h1>
				<h4>These places have food around you!</h4>
				<FoodMap />
				{/* For 🔔 */}
				<div className='d-flex justify-content-between  justify-content-sm-start'>
					<div className='my-auto '>Get notified about nearby donors</div>
					<button className='btn btn-outline-warning rounded-circle p-0 m-sm-4 ' style={{ height: '35px', width: '35px' }} onClick={handleNotif}>
						<i className='bi bi-bell-fill fs-6'></i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default GetFood
