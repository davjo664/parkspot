const haversine = require('haversine-js');

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
  closestParkspots: [],
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
    const combined = action.refresh ? action.data : _.unionBy(action.data, state.parkspots, 'id');

    // Apply current filters on fetched parkspots
    const filteredParkspots = combined.filter(obj => {
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
  } else if (action.type === 'UPDATE_PARKSPOT_WITH_ID') {
    const updatedSpots = state.parkspots.map((spot) => {
      if (spot.id === action.id) {
        let tmpSpot = spot;
        tmpSpot.available = action.available;
        return tmpSpot;
      } else {
        return spot;
      }
    });
    return {
      ...state,
      parkspots: updatedSpots,
    };
  } else if (action.type === 'SET_CLOSEST_PARKSPOTS') {
    //get taken spot from PN
    const takenSpot = state.parkspots.find((spot) => {
      return spot.id === action.id;
    });

    // get only available spots
    const sortedSpots = state.parkspots.filter((spot) => {
      return spot.available
    });

    //sort spots by distance to taken spot
    sortedSpots.sort((a, b) => {
      haversine(a, [takenSpot.lat, takenSpot.lng]) < haversine(b, [takenSpot.lat, takenSpot.lng]);
    });

    return {
      ...state,
      closestParkspots: sortedSpots.slice(0, 3)
    };
  } else if (action.type === 'DELETE_ALL_CLOSEST_PARKSPOTS') {
    return {
      ...state,
      closestParkspots: []
    };
  } else if (action.type === 'DELETE_CLOSEST_PARKSPOT_BY_ID') {
    return {
      ...state,
      closestParkspots: state.closestParkspots.filter((el) => {return el.id !== action.id;})
    };
  }
  return state;
}
