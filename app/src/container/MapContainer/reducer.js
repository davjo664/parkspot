const initialState = {
    userPosition: { // HdM location
        latitude: 48.7420025,
        longitude: 9.100759299999936,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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
