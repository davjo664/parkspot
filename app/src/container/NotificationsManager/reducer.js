const initialState = {
  user: {},
  enabled: false,
  fcmToken: '',
  activeSubscription: false,
};

export default function (state: any = initialState, action: Function) {
  if (action.type === 'UPDATE_USER') {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
      }
    };
  } else if (action.type === 'SET_ACTIVE_SUBSCRIPTION') {
    return {
      ...state,
      activeSubscription: action.active,
    };
  }

  return state;
}
