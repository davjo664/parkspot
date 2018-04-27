export function updateLocationSuccess(userPosition: Object) {
    return {
        type: 'UPDATE_LOCATION_SUCCESS',
        userPosition,
    };
}

export function updateLocation() {
    return dispatch =>
        navigator.geolocation.getCurrentPosition((userPosition) => {
            dispatch(updateLocationSuccess(userPosition));
        }, (error) => {
            console.warn(error.message);
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
}

