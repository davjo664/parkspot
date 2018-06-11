const TOGGLE_FILTER = 'TOGGLE_FILTER';

const initialState = {
  electricCharger: false,
  cost: false,
  favorite: false,
  time: false,
  handicapped: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        ...state,
        [action.filter]: !state[action.filter],
      };
    default:
      return state;
  }
}
