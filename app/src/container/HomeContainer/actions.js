export function fetchParkspotsSuccess(data: Object) {
  return {
    type: 'FETCH_PARKSPOTS_SUCCESS',
    data,
  };
}
export function fetchParkspots() {
  return dispatch =>
    fetch('http://localhost:3000/parkspot') // Redux Thunk handles these
      .then(res => res.json())
      .then(data => dispatch(fetchParkspotsSuccess(data)));
}
