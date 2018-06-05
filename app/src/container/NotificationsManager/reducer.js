const initialState = {
  user: {},
  enabled: false,
  fcmToken: '',
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
  }

  return state;
}
