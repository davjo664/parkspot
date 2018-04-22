const deltas = {
	latitudeDelta: 0.01,
	longitudeDelta: 0.01,
};

const initialState = {
	initialRegion: { // HdM location
		...deltas,
		latitude: 48.7420025,
		longitude: 9.100759299999936,
	},
	position: null,
	parkspots: [],
};

export default function (state: any = initialState, action: Function) {


	if (action.type === 'UPDATE_LOCATION_SUCCESS') {
		return {
			...state,
			position: {
				...deltas,
				...state.position,
				latitude: action.position.coords.latitude,
				longitude: action.position.coords.longitude,
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
