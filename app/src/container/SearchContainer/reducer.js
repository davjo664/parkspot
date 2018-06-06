const initialState = {
  searchString: '',
  data: [],
  filteredData: [],
  showParkspots: true,
  isLoading: false,
  filters: [],
  favourites: [],
};

export default function (state: any = initialState, action: Function) {
  if (action.type === 'UPDATE_SEARCH_STRING') {
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
    return {
      ...state,
      data: action.locations,
      showParkspots: false,
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
  }

  //checks if newFav is element of favourites - if not yet, includes it
  else if (action.type === 'ADD_FAVOURITE') {
    if (state.favourites.includes(action.newFav)) {
      return {
        ...state,
      };
    }
    else {
      return {
        ...state,
        favourites: [...state.favourites, action.newFav]
      };
    }
  }

  //checks if remFav is element of favourites - if so, removes it
  else if (action.type === 'REM_FAVOURITE') {
    if (state.favourites.includes(action.remFav)) {

      const newFavourites = state.favourites.filter(item => item.id !== action.remFav.id);
      return {
        ...state,
        favourites: [...newFavourites]
      };
    }
    else {
      return {
        ...state,
      };
    }
  }


  return state;
}
