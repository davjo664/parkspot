import config from '../../config/config';
import {LocationAccessHelper} from "../../helper/LocationAccessHelper";
import {store} from '../../boot/setup'

export function fetchParkspotsSuccess(data: Object, refresh: Boolean) {
  return {
    type: 'FETCH_PARKSPOTS_SUCCESS',
    data,
    refresh,
  };
}

export function updateLocationSuccess(userPosition: Object) {
  return {
    type: 'UPDATE_LOCATION_SUCCESS',
    userPosition,
  };
}

export function updateMapPosition(mapPosition: Object) {
  return {
    type: 'UPDATE_MAP_POSITION',
    mapPosition,
  };
}

export function fetchParkspots(
  latitude: ?number,
  longitude: ?number,
  distance: ?number,
  refresh: ?Boolean,
) {
  if (!distance && store.getState().filterReducer.distance) {
    distance = store.getState().filterReducer.distance;
  }
  const url =
    !latitude || !longitude || !distance
      ? config.api.url
      : `${config.api.url}parkspot/${latitude}/${longitude}/${distance}`;
  return dispatch =>
    fetch(url) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode != 200) {
        } else {
          console.log(url);
          dispatch(fetchParkspotsSuccess(data, refresh));
        }
      });
}

export function updateLocation() {
  return dispatch =>
    LocationAccessHelper.getLocation((userPosition) => {
      dispatch(updateLocationSuccess(userPosition));
    }, (error) => {
      console.warn(error);
    });
}

export function filterParkspots(filterId) {
  return {
    type: 'FILTER_PARKSPOTS',
    filter: filterId,
  };
}

export function filterDistance(distance) {
  return {
    type: 'FILTER_DISTANCE',
    distance: distance,
  };
}

