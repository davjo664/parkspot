import config from '../../config/config';
import { updateMapPosition } from '../MapContainer/actions';

export function updateSearchString(searchString: String) {
  return {
    type: 'UPDATE_SEARCH_STRING',
    searchString,
  };
}

export function fetchLocationsSuccess(data) {
  return {
    type: 'FETCH_LOCATIONS_SUCCESS',
    locations: data,
  };
}

export function fetchLocations(searchString, userPosition) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${
    userPosition.latitude
  },${userPosition.longitude}
    &radius=500&components=country:de|country:nl&input=${searchString}&key=${config.googleApi.key}&language=en`;
  return dispatch =>
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode != 200) {
          console.log(data.message);
        } else {
          dispatch(fetchLocationsSuccess(data.predictions));
        }
      });
}

export function fetchLocationDetails(rowData) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${config.googleApi.key}&language=en&placeid=${
      rowData.place_id
    }`;
    return dispatch =>
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.statusCode && data.statusCode != 200) {
            console.log(data.message);
          } else {
            const selectedLocation = {location: rowData.description, lat: data.result.geometry.location.lat, lng: data.result.geometry.location.lng}
            const mapPosition = {
              latitude: Number(selectedLocation.lat),
              longitude: Number(selectedLocation.lng),
              latitudeDelta: 0.0005,
              longitudeDelta: 0.005,
            }
            dispatch(updateMapPosition(mapPosition));
            dispatch({
              type: 'UPDATE_SELECTED_LOCATION',
              selectedLocation: selectedLocation,
            });
          }
        });
}

export function filterData(filterId) {
  return {
    type: 'FILTER_DATA',
    filter: filterId,
  };
}

export function addFavourite(fav) {
  return {
    type: 'ADD_FAVOURITE',
    fav,
  };
}

export function remFavourite(fav) {
  return {
    type: 'REM_FAVOURITE',
    fav,
  };
}

export function addLastSearched(place) {
  return {
    type: 'ADD_LAST_SEARCHED',
    place,
  };
}
