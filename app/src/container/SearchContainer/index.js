import * as React from 'react';
import {connect} from 'react-redux';
import SearchScreen from '../../screens/Search';
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
        fetchLocations={this.props.fetchLocations}
        showLocations={this.props.showLocations}
        fetchLocationDetails={this.props.fetchLocationDetails}
        isLoading={this.props.isLoading}
        favorites={this.props.favorites}
        addFavorite={this.props.addFavorite}
        remFavorite={this.props.remFavorite}
        addLastSearched={this.props.addLastSearched}
        lastSearches={this.props.lastSearches}
        distanceFilterValue={this.props.distanceFilterValue}
        
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
  distanceFilterValue: state.filterReducer.distance,
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearchString: (searchString) => {
      dispatch(updateSearchString(searchString));
    },
    fetchLocations: (searchString, userPosition) => {
      dispatch(fetchLocations(searchString, userPosition));
    },
    fetchLocationDetails: (rowData, distanceFilterValue) => {
      dispatch(fetchLocationDetails(rowData, distanceFilterValue));
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
