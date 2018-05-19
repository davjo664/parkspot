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
        let parkspots = _.unionBy(action.data, state.parkspots, "id");
        parkspots.forEach(parkspot => {
            parkspot.address = {
                street: "Loremweg 4",
                city: "Hinterstadt",
                zip: "66616",
                country: "Germany"
            };
        });

        // TODO fix when API is ready
        console.warn("Warning: using mock data for address. Replace when API is ready!");



        return {
            ...state,
            parkspots: parkspots,
        }
    }

    return state;
}
