const initialState = {
	position: { // HdM location
		latitude: 48.7420025,
		longitude: 9.100759299999936,
		latitudeDelta: 0.005,
		longitudeDelta: 0.005,
	},
};

export default function (state: any = initialState, action: Function) {
	if (action.type === 'UPDATE_LOCATION_SUCCESS') {
		return {
			...state,
			position: {
				...state.position,
				latitude: action.position.coords.latitude,
				longitude: action.position.coords.longitude,
			}
		};
	}



	return state;
}
