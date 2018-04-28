export function updateLocationSuccess(userPosition: Object) {
    return {
        type: 'UPDATE_LOCATION_SUCCESS',
        userPosition,
    };
};

export function watchLocationSuccess(userPosition: Object, watchID: Number) {
    return {
        type: 'WATCH_LOCATION_SUCCESS',
        userPosition,
        watchID,
    };
};

export function stopWatchLocationSuccess() {
    return {
        type: 'STOP_WATCH_LOCATION_SUCCESS',
    };
};


export function updateLocation() {
    return dispatch =>
        navigator.geolocation.getCurrentPosition((userPosition) => {
            dispatch(updateLocationSuccess(userPosition));
        }, (error) => {
            console.warn(error.message);
        }, {enableHighAccuracy: true, timeout: 2500, maximumAge: 5000});
};


export function watchLocation() {
    return dispatch => {
        const watchID = navigator.geolocation.watchPosition((userPosition) => {
            dispatch(watchLocationSuccess(userPosition, watchID));
        }, (error) => {
            console.warn(error.message);
        }, {enableHighAccuracy: true, timeout: 1000, maximumAge: 5000});
    };
}

export function stopWatchLocation(watchID: Number) {
    return dispatch => {
        navigator.geolocation.clearWatch(watchID);
        dispatch(stopWatchLocationSuccess());
    }
};
