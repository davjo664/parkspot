const initialState = {
    userPosition: { // Stuttgart location
        latitude: 48.775,
        longitude: 9.175,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    },
    parkspots: [],
    watchID: null,
};

export default function (state: any = initialState, action: Function) {
    if (action.type === 'UPDATE_LOCATION_SUCCESS') {
        return {
            ...state,
            userPosition: {
                ...state.userPosition,
                latitude: action.userPosition.coords.latitude,
                longitude: action.userPosition.coords.longitude,
            }
        };
    } else if (action.type == 'WATCH_LOCATION_SUCCESS') {
        return {
            ...state,
            userPosition: {
                ...state.userPosition,
                latitude: action.userPosition.coords.latitude,
                longitude: action.userPosition.coords.longitude,
            },
            watchID: action.watchID,
        };

    } else if (action.type == 'STOP_WATCH_LOCATION_SUCCESS') {
        return {
            ...state,
            watchID: null,
        };

    } else if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
        return {
            ...state,
            parkspots: action.data,
        }
    }

    return state;
}
