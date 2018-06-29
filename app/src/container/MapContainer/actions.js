import config from '../../config/config';
import {LocationAccessHelper} from "../../helper/LocationAccessHelper";

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
        } else {
          dispatch(fetchParkspotsSuccess(data));
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

export function setClosestParkspots(id: Integer) {
  return {
    id,
    type: 'SET_CLOSEST_PARKSPOTS',
  };
}

export function deleteClosestSpotWithID(id: Integer) {
  return {
    type: 'DELETE_CLOSEST_PARKSPOT_BY_ID',
    id,
  };
}

export function deleteClosestParkspots() {
  return {
    type: 'DELETE_ALL_CLOSEST_PARKSPOTS',
  };
}
