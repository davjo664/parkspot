import config from '../../config/config';
import {LocationAccessHelper} from '../../helper/LocationAccessHelper';
import {addFavorite, remFavorite} from '../SearchContainer/actions';

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
  const url =
    !latitude || !longitude || !distance
      ? config.api.url
      : `${config.api.url}parkspot/${latitude}/${longitude}/${distance}`;
  return dispatch =>
    fetch(url) // Redux Thunk handles these
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode !== 200) {
        } else {
          dispatch(fetchParkspotsSuccess(data, refresh));
        }
      });
}

export function updateLocation(callback) {
  return dispatch =>
    LocationAccessHelper.getLocation((userPosition) => {
      if (callback) {
        callback(userPosition);
      }
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

export function addFavoriteByDescription(description) {
  return dispatch =>
    LocationAccessHelper.getLocation((userPosition) => {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${
        userPosition.latitude
        },${userPosition.longitude}
      &radius=500&components=country:de|country:nl&input=${description}&key=${config.googleApi.key}&language=en`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.statusCode && data.statusCode !== 200) {
            console.log(data.message);
          } else {
            const favorite = data.predictions[0];
            favorite.description = description;
            dispatch(addFavorite(favorite));
          }
        });
    }, (error) => {
      console.warn(error);
    });
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
