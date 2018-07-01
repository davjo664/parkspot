
const initialState = {
  electricCharger: false,
  cost: false,
  favorite: false,
  time: false,
  handicapped: false,
  distance: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FILTER':
      return {
        ...state,
        [action.filter]: !state[action.filter],
      };

    case 'UPDATE_DISTANCE_FILTER':
      return {
        ...state,
        distance: action.value
      };
    default:
      return state;
  }
}
