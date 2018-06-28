const initialState = {
  searchString: '',
  data: [],
  showLocations: false,
  isLoading: false,
  favorites: [],
  lastSearches: [],
  selectedLocation: null
};

export default function (state: any = initialState, action: Function) {
  if (action.type === 'UPDATE_SEARCH_STRING') {
    if (action.searchString === '') {
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
  } else if (action.type === 'FETCH_LOCATIONS_SUCCESS') {
    action.locations.forEach(location => {
      state.favorites.find((fav) => {
        if (fav.id === location.id) {
          location.favorite = true;
        }
      });
    });
    return {
      ...state,
      data: action.locations,
      showLocations: true,
      isLoading: false,
    };
  } else if (action.type === 'UPDATE_SELECTED_LOCATION') {
    return {
      ...state,
      selectedLocation: action.selectedLocation,
    };
  }

  //checks if fav is element of favorites - if not yet, includes it
  else if (action.type === 'ADD_FAVORITE') {
    const found = state.favorites.find((fav) => {
      return fav.id === action.fav.id;
    });
    state.lastSearches.find((fav) => {
      if (fav.id === action.fav.id) {
        fav.favorite = true;
        return true;
      }
    });
    if (found) {
      return {
        ...state,
      };
    } else {
      action.fav.favorite = true;
      return {
        ...state,
        favorites: [...state.favorites, action.fav]
      };
    }
  }

  //checks if fav is element of favorites - if so, removes it
  else if (action.type === 'REM_FAVORITE') {
    const newFavorites = state.favorites;
    state.favorites.find((fav) => {
      if (fav.id === action.fav.id) {
        action.fav.favorite = false;
        fav.favorite = false;
        newFavorites = state.favorites.filter(item => item.id !== action.fav.id);
      }
      return fav.id === action.fav.id;
    });
    state.lastSearches.find((fav) => {
      if (fav.id === action.fav.id) {
        fav.favorite = false;
        return true;
      }
    });
    return {
      ...state,
      favorites: [...newFavorites]
    };
  }

  else if (action.type === 'ADD_LAST_SEARCHED') {
    const lastSearches = state.lastSearches.filter((place) => {
      return place.id !== action.place.id;
    });
    if (lastSearches.length === 5) {
      lastSearches.pop();
    }
    return {
      ...state,
      lastSearches: [action.place, ...lastSearches]
    };
  }

  return state;
}
