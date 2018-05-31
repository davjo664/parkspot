import config from '../../config/config';

export function fetchParkspotsSuccess(data: Object) {
  return {
    type: 'FETCH_PARKSPOTS_SUCCESS',
    data,
  };
}

export function updateLocationSuccess(userPosition: Object) {
  return {
    type: 'UPDATE_LOCATION_SUCCESS',
    userPosition,
  };
}

export function fetchParkspots(
  latitude: ?number,
  longitude: ?number,
  distance: ?number,
) {
  const url =
    !latitude || !longitude || !distance
      ? config.api.url
      : `${config.api.url}parkspot/${latitude}/${longitude}/${distance}`;
  return dispatch =>
    fetch(url) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode != 200) {
          console.log(data.message);
        } else {
          dispatch(fetchParkspotsSuccess(data));
        }
      });
}

export function updateLocation() {
  return dispatch =>
    navigator.geolocation.getCurrentPosition(
      userPosition => {
        dispatch(updateLocationSuccess(userPosition));
      },
      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 2500},
    );
}
