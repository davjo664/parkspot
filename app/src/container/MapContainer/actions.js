export function updateLocationSuccess(position: Object) {
	return {
		type: 'UPDATE_LOCATION_SUCCESS',
		position,
	};
}

export function updateLocation() {
	return dispatch =>
		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(updateLocationSuccess(position));
		}, (error) => {
			console.warn(error.message);
		}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
}
