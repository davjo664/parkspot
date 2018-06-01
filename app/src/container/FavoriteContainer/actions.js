export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REM_FAVOURITE = 'REM_FAVOURITE';


export function addFavourite(newFav: Object) {
  return dispatch =>
    dispatch({
      type: 'ADD_FAVOURITE',
      newFav,
    });
}

export function remFavourite(remFav: Object) {
  return dispatch =>
    dispatch({
      type: 'REM_FAVOURITE',
      remFav,
    });
}
