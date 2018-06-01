import {fetchParkspots} from '../MapContainer/actions';

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
    &radius=500&components=country:de|country:nl&input=${searchString}&key=AIzaSyBtDPqZtRAMenSwz32oIUWWf1i_Gnub1dc&language=en`;
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
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBtDPqZtRAMenSwz32oIUWWf1i_Gnub1dc&language=en&placeid=${
    rowData.place_id
    }`;
  return dispatch =>
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.statusCode && data.statusCode != 200) {
          console.log(data.message);
        } else {
          dispatch(
            fetchParkspots(
              data.result.geometry.location.lat,
              data.result.geometry.location.lng,
              6000,
            ),
          );
        }
      });
}

export function filterData(filterId) {
  return {
    type: 'FILTER_DATA',
    filter: filterId,
  };
}
