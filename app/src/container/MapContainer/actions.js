export function updateLocationSuccess(position: Object) {
	return {
		type: 'UPDATE_LOCATION_SUCCESS',
		position,
	};
}

const locationSettings = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};

export function updateLocation() {
	return dispatch =>
		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(updateLocationSuccess(position));
		}, (error) => {
			console.warn(error.message);
		}, locationSettings);
}

export function watchLocation() {
	return dispatch =>
		navigator.geolocation.watchPosition((position) => {
			dispatch(updateLocationSuccess(position));
		}, (error) => {
			console.warn(error.message);
		}, locationSettings);
}

