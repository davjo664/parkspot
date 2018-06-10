const initialState = {
  userPosition: null,
  parkspots: [],
  mapPosition: {
    latitude: 48.775,
    longitude: 9.175,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
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
    // adding all new parkspots to the data
    var combined = _.unionBy(state.parkspots, action.data, 'id')
    // updating the values for all existing parkspots without recreating
    // the object to prevent the map from rerendering too much.
    for (var old in state.parkspots) {
      var updated = action.data.find(p => p.id === old.id);
      if (updated) {
        for (var key in old) {
          old[key] = updated[key];
        }
      }
    }
    return {
      ...state,
      parkspots: combined,
    };
  } else if (action.type === 'UPDATE_MAP_POSITION') {
    return {
      ...state,
      mapPosition: action.mapPosition,
    };
  }

  return state;
}
