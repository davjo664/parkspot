const initialState = {
  searchString: '',
  data: [],
  showParkspots: true,
  isLoading: false,
};

export default function(state: any = initialState, action: Function) {
  if (action.type === 'UPDATE_SEARCH_STRING') {
    return {
      ...state,
      searchString: action.searchString,
      isLoading: true,
    };
  } else if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
    return {
      ...state,
      data: action.data,
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
  }

  return state;
}
