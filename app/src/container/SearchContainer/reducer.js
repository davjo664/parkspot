const initialState = {
  searchString: '',
  data: [],
  filteredData: [],
  showLocations: false,
  isLoading: false,
  filters: [],
  favourites: [],
  lastSearches: [],
  selectedLocation: null
};

export default function (state: any = initialState, action: Function) {
  if (action.type === 'UPDATE_SEARCH_STRING') {
    if (action.searchString === "") {
      return {
        ...state,
        showLocations: false,
        searchString: action.searchString,
      };
    }
    return {
      ...state,
      searchString: action.searchString,
      isLoading: true,
    };
  } else if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
    // Apply current filter on fetched parkspots
    let filteredData = [];
    filteredData = action.data.filter(obj => {
      let showData = true;
      state.filters.forEach(filter => {
        if (!obj[filter]) {
          showData = false;
          return;
        }
      });
      return showData;
    });
    return {
      ...state,
      data: action.data,
      filteredData: filteredData,
      showParkspots: true,
      isLoading: false,
    };
  } else if (action.type === 'FETCH_LOCATIONS_SUCCESS') {
    action.locations.forEach(location => {
      state.favourites.find((fav) => {
        if (fav.id === location.id) {
          location.favourite = true;
        }
      });
    })
    return {
      ...state,
      data: action.locations,
      showLocations: true,
      isLoading: false,
    };
  } else if (action.type === 'FILTER_DATA') {
    let filters = state.filters;
    let filteredData = [];
    if (filters.includes(action.filter)) {
      // Filter turned off -> needs to filter the original data
      filters = filters.filter(filter => filter !== action.filter);
      filteredData = state.data.filter(obj => {
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
      // Filter turned on -> adds filter on top of filterData
      filters.push(action.filter);
      filteredData = state.filteredData.filter(obj => {
        if (!obj[action.filter]) {
          return false;
        }
        return true;
      });
    }
    return {
      ...state,
      filters: filters,
      filteredData: filteredData,
    };
  } else if (action.type === 'UPDATE_SELECTED_LOCATION') {
    return {
      ...state,
      selectedLocation: action.selectedLocation,
    };
  }

  //checks if fav is element of favourites - if not yet, includes it
  else if (action.type === 'ADD_FAVOURITE') {
    var found = state.favourites.find((fav) => {
      return fav.id === action.fav.id;
    });
    state.lastSearches.find((fav) => {
      if ( fav.id === action.fav.id ) {
        fav.favourite = true;
        return true;
      }
    });
    if (found) {
      return {
        ...state,
      };
    } else {
      action.fav.favourite = true;
      return {
        ...state,
        favourites: [...state.favourites, action.fav]
      };
    }
  }

  //checks if fav is element of favourites - if so, removes it
  else if (action.type === 'REM_FAVOURITE') {
    const newFavourites = state.favourites;
    state.favourites.find((fav) => {
      if (fav.id === action.fav.id) {
        action.fav.favourite = false;
        fav.favourite = false;
        newFavourites = state.favourites.filter(item => item.id !== action.fav.id);
      }
      return fav.id === action.fav.id
    });
    state.lastSearches.find((fav) => {
      if ( fav.id === action.fav.id ) {
        fav.favourite = false;
        return true;
      }
    });
    return {
      ...state,
      favourites: [...newFavourites]
    };
  }

  else if (action.type === 'ADD_LAST_SEARCHED') {
    var found = state.lastSearches.find((place) => {
      return place.id === action.place.id;
    });
    if (found) {
      return {
        ...state,
      };
    } else {
      return {
        ...state,
        lastSearches: [...state.lastSearches, action.place]
      };
    }
  }


  return state;
}
