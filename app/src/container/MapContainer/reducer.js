const initialState = {
    userPosition: null,
    parkspots: [],
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
    } else if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
        return {
            ...state,
            parkspots: action.data,
        }
    }

    return state;
}
