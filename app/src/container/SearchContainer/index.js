import * as React from 'react';
import {connect} from 'react-redux';
import SearchScreen from '../../screens/Search';
import {fetchParkspots} from '../MapContainer/actions';
import {fetchLocationDetails, fetchLocations, filterData, updateSearchString,addFavourite, addLastSearched, remFavourite,} from './actions';
import {toggleFilter} from '../../components/Filter/actions';

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
        filteredData={this.props.filteredData}
        fetchParkspots={this.props.fetchParkspots}
        fetchLocations={this.props.fetchLocations}
        showLocations={this.props.showLocations}
        fetchLocationDetails={this.props.fetchLocationDetails}
        isLoading={this.props.isLoading}
        toggleFilter={this.props.toggleFilter}
        filterData={this.props.filterData}
        favourites={this.props.favourites}
        addFavourite={this.props.addFavourite}
        remFavourite={this.props.remFavourite}
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
  filteredData: Array;
  fetchParkspots: Function;
  fetchLocations: Function;
  showLocations: Boolean;
  fetchLocationDetails: Function;
  isLoading: Boolean;
  toggleFilter: Function;
  filterData: Function;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
  addLastSearched: Function;
  lastSearches: any;
}

const mapStateToProps = state => ({
  userPosition: state.mapReducer.userPosition,
  searchString: state.searchReducer.searchString,
  data: state.searchReducer.data,
  filteredData: state.searchReducer.filteredData,
  showLocations: state.searchReducer.showLocations,
  isLoading: state.searchReducer.isLoading,
  favourites: state.searchReducer.favourites,
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
    toggleFilter: filterId => {
      dispatch(toggleFilter(filterId));
    },
    filterData: filterId => {
      dispatch(filterData(filterId));
    },
    addFavourite: fav => {
      dispatch(addFavourite(fav));
    },
    remFavourite: fav => {
      dispatch(remFavourite(fav));
    },
    addLastSearched: place => {
      dispatch(addLastSearched(place))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
