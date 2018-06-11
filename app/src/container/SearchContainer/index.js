import * as React from 'react';
import {connect} from 'react-redux';
import SearchScreen from '../../screens/Search';
import {fetchParkspots} from '../MapContainer/actions';
import {
  addFavorite,
  addLastSearched,
  fetchLocationDetails,
  fetchLocations,
  remFavorite,
  updateSearchString,
} from './actions';

export interface State {
}

class SearchContainer extends React.Component<Props, State> {
  render() {
    return (
      <SearchScreen
        navigation={this.props.navigation}
        userPosition={this.props.userPosition}
        searchString={this.props.searchString}
        updateSearchString={this.props.updateSearchString}
        data={this.props.data}
        fetchParkspots={this.props.fetchParkspots}
        fetchLocations={this.props.fetchLocations}
        showLocations={this.props.showLocations}
        fetchLocationDetails={this.props.fetchLocationDetails}
        isLoading={this.props.isLoading}
        favorites={this.props.favorites}
        addFavorite={this.props.addFavorite}
        remFavorite={this.props.remFavorite}
        addLastSearched={this.props.addLastSearched}
        lastSearches={this.props.lastSearches}
      />
    );
  }
}

export interface Props {
  navigation: any;
  userPosition: any;
  updateSearchString: Function;
  searchString: String;
  data: Array;
  fetchParkspots: Function;
  fetchLocations: Function;
  showLocations: Boolean;
  fetchLocationDetails: Function;
  isLoading: Boolean;
  addFavorite: Function;
  remFavorite: Function;
  favorites: any;
  addLastSearched: Function;
  lastSearches: any;
}

const mapStateToProps = state => ({
  userPosition: state.mapReducer.userPosition,
  searchString: state.searchReducer.searchString,
  data: state.searchReducer.data,
  showLocations: state.searchReducer.showLocations,
  isLoading: state.searchReducer.isLoading,
  favorites: state.searchReducer.favorites,
  lastSearches: state.searchReducer.lastSearches,
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearchString: (searchString) => {
      dispatch(updateSearchString(searchString));
    },
    fetchLocations: (searchString, userPosition) => {
      dispatch(fetchLocations(searchString, userPosition));
    },
    fetchParkspots: (latitude, longitude, distance = 6000) => {
      dispatch(fetchParkspots(latitude, longitude, distance));
    },
    fetchLocationDetails: rowData => {
      dispatch(fetchLocationDetails(rowData));
    },
    addFavorite: fav => {
      dispatch(addFavorite(fav));
    },
    remFavorite: fav => {
      dispatch(remFavorite(fav));
    },
    addLastSearched: place => {
      dispatch(addLastSearched(place))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
