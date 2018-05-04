import config from "../../config/config";

export function fetchParkspotsSuccess(data: Object) {
    return {
        type: 'FETCH_PARKSPOTS_SUCCESS',
        data,
    };
}

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


export function fetchParkspots(latitude: ?number, longitude: ?number, distance: ?number) {
    const url = (!latitude || !longitude || !distance) ? config.api.url : `${config.api.url}${latitude}/${longitude}/${distance}`;

    console.log(url);

    return dispatch =>
        fetch(url) // Redux Thunk handles these
            .then((res) => res.json())
            .then(data => {
                if (data.statusCode && data.statusCode != 200) {
                    console.log(data.message);
                } else {
                    dispatch(fetchParkspotsSuccess(data));
                }
            });
}


export function updateLocation() {
    return dispatch =>
        navigator.geolocation.getCurrentPosition((userPosition) => {
            dispatch(updateLocationSuccess(userPosition));
        }, (error) => {
            console.log(error.message);
        }, {enableHighAccuracy: true, timeout: 2500, maximumAge: 5000});
};


export function watchLocation() {
    return dispatch => {
        const watchID = navigator.geolocation.watchPosition((userPosition) => {
            dispatch(watchLocationSuccess(userPosition, watchID));
        }, (error) => {
            console.log(error.message);
        }, {enableHighAccuracy: true, timeout: 1000, maximumAge: 5000});
    };
}

export function stopWatchLocation(watchID: Number) {
    return dispatch => {
        navigator.geolocation.clearWatch(watchID);
        dispatch(stopWatchLocationSuccess());
    }
};
