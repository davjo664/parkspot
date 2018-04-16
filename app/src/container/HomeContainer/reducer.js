const initialState = {
  parkspots: [],
};

export default function(state: any = initialState, action: Function) {
  if (action.type === 'FETCH_PARKSPOTS_SUCCESS') {
    return {
      ...state,
      parkspots: action.data,
    };
  }
  return state;
}
