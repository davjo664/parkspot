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
        latitude: action.userPosition.latitude,
        longitude: action.userPosition.longitude,
      }
    };
  } else if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
    //console.log(action.data)
    // adding all new parkspots to the data
    var combined = _.unionBy(state.parkspots, action.data, 'id');
    var newArray = []
    action.data.forEach(parkspot => {newArray.push(parkspot)})
    state.parkspots.forEach(parkspot => {
      if (!newArray.find(p => {return p.id === parkspot.id})) {
        {newArray.push(parkspot)}
      }
    })

    console.log(newArray)

    state.parkspots = combined;
    // updating the values for all existing parkspots without recreating
    // the object to prevent the map from rerendering too much.
    // for (var old in state.parkspots) {
    //   var updated = action.data.find(p => p.id === old.id);
    //   console.warn(updated)
    //   if (updated) {
    //     for (var key in old) {
    //       old[key] = updated[key];
    //     }
    //   }
    // }

    // // mocking some data TODO use API when ready
    // state.parkspots.map(parkspot => {
    //   parkspot.unlimited = 1;
    //   parkspot.noCost = 1;
    // });




    // Apply current filters on fetched parkspots
    // let filteredParkspots = [];
    // filteredParkspots = state.parkspots.filter(obj => {
    //   let showParkspot = true;
    //   state.filters.forEach(filter => {
    //     if (!obj[filter]) {
    //       showParkspot = false;
    //       return;
    //     }
    //   });
    //   return showParkspot;
    // });
    return {
      ...state,
      parkspots: newArray,
      originalParkspots: state.parkspots
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
  } else if (action.type === 'UPDATE_PARKSPOT_WITH_ID') {
    let spots = [];
    for (var i = 0; i < state.parkspots.length; i++) {
      if (state.parkspots[i].id === action.id) {
        let spot = Object.assign(state.parkspots[i], {id: 1, available: !state.parkspots[i].available});
        spots.push(spot)
      } else {
        spots.push(state.parkspots[i])
      }
    }
    //spots => spots.sort(() => Math.random() - 0.5);
    console.log(spots)
    return {
      ...state,
      parkspots: spots,
    };
  }

  return state;
}
