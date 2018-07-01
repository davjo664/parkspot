const initialState = {
  userPosition: null,
  parkspots: [],
  originalParkspots: [],
  filters: [],
  distance: 0,
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
        latitude: action.userPosition.latitude,
        longitude: action.userPosition.longitude,
      }
    };
  } else if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
    let combined;
    if (!action.refresh) {
      // adding all new parkspots to the data
      combined = _.unionBy(state.parkspots, action.data, 'id')
      // updating the values for all existing parkspots without recreating
      // the object to prevent the map from rerendering too much.
      for (let old in state.parkspots) {
        const updated = action.data.find(p => p.id === old.id);
        if (updated) {
          for (let key in old) {
            old[key] = updated[key];
          }
        }
      }
    } else {
      combined = action.data;
    }

    // mocking some data TODO use API when ready
    state.parkspots.map(parkspot => {
      parkspot.unlimited = Math.random() < 0.5;
      parkspot.noCost = Math.random() < 0.5;
    });

    // Apply current filters on fetched parkspots
    let filteredParkspots = [];
    filteredParkspots = combined.filter(obj => {
      let showParkspot = true;
      state.filters.forEach(filter => {
        if (!obj[filter]) {
          showParkspot = false;

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
          }
        });
        return showData;
      });
    } else {
      // Filter turned on -> adds filter on top of filteredParkspots
      filters.push(action.filter);
      filteredParkspots = state.parkspots.filter(obj => {
        return obj[action.filter];
      });
    }
    return {
      ...state,
      filters: filters,
      parkspots: filteredParkspots,
    };
  } else if (action.type === 'FILTER_DISTANCE') {
    return {
      ...state,
      distance: action.distance
    };
  }

  return state;
}
