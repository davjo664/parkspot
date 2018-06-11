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
            const selectedLocation = {
              location: {
                latitude: data.result.geometry.location.lat,
                longitude: data.result.geometry.location.lng,
              },
              description: rowData.description,
            }
            const mapPosition = {
              latitude: Number(selectedLocation.location.latitude),
              longitude: Number(selectedLocation.location.longitude),
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

export function addFavorite(fav) {
  return {
    type: 'ADD_FAVORITE',
    fav,
  };
}

export function remFavorite(fav) {
  return {
    type: 'REM_FAVORITE',
    fav,
  };
}

export function addLastSearched(place) {
  return {
    type: 'ADD_LAST_SEARCHED',
    place,
  };
}
