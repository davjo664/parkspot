import * as React from 'react';
import {connect} from 'react-redux';
import SearchScreen from '../../screens/Search';
import {fetchParkspots} from '../MapContainer/actions';
import {fetchLocationDetails, fetchLocations, filterData, updateSearchString,} from './actions';
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
        showParkspots={this.props.showParkspots}
        onPress={this.props.onPress}
        isLoading={this.props.isLoading}
        toggleFilter={this.props.toggleFilter}
        filterData={this.props.filterData}
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
  showParkspots: Boolean;
  onPress: Function;
  isLoading: Boolean;
  toggleFilter: Function;
  filterData: Function;
}

const mapStateToProps = state => ({
  userPosition: state.mapReducer.userPosition,
  searchString: state.searchReducer.searchString,
  data: state.searchReducer.data,
  filteredData: state.searchReducer.filteredData,
  showParkspots: state.searchReducer.showParkspots,
  isLoading: state.searchReducer.isLoading,
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
    onPress: rowData => {
      dispatch(fetchLocationDetails(rowData));
    },
    toggleFilter: filterId => {
      dispatch(toggleFilter(filterId));
    },
    filterData: filterId => {
      dispatch(filterData(filterId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
