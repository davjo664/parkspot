export function fetchParkspotsSuccess(data: Object) {
  return {
    type: 'FETCH_PARKSPOTS_SUCCESS',
    data,
  };
}

import config from '../../config/config';

export function fetchParkspots() {
  return dispatch =>
    fetch(config.api.url) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => dispatch(fetchParkspotsSuccess(data)));
}
