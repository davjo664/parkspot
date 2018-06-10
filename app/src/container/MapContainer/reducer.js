const initialState = {
  userPosition: null,
  parkspots: [],
  originalParkspots: [],
  filters: [],
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
    // Apply current filters on fetched parkspots
    let filteredParkspots = [];
    filteredParkspots = combined.filter(obj => {
      let showParkspot = true;
      state.filters.forEach(filter => {
        if (!obj[filter]) {
          showParkspot = false;
          return;
        }
      });
      return showParkspot;
    });
    return {
      ...state,
      parkspots: filteredParkspots,
      originalParkspots: combined
    };
  } else if (action.type === 'UPDATE_MAP_POSITION') {
    return {
      ...state,
      mapPosition: action.mapPosition,
    };
  } else if (action.type === 'FILTER_PARKSPOTS') {
    let filters = state.filters;
    let filteredParkspots = [];
    if (filters.includes(action.filter)) {
      // Filter turned off -> needs to filter the original data
      filters = filters.filter(filter => filter !== action.filter);
      filteredParkspots = state.originalParkspots.filter(obj => {
        let showData = true;
        filters.forEach(filter => {
          if (!obj[filter]) {
            showData = false;
            return;
          }
        });
        return showData;
      });
    } else {
      // Filter turned on -> adds filter on top of filteredParkspots
      filters.push(action.filter);
      filteredParkspots = state.parkspots.filter(obj => {
        if (!obj[action.filter]) {
          return false;
        }
        return true;
      });
    }
    return {
      ...state,
      filters: filters,
      parkspots: filteredParkspots,
    };
  }

  return state;
}
