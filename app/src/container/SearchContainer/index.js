// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import SearchScreen from '../../screens/Search';
import { fetchParkspots } from '../MapContainer/actions';
import { updateSearchString, fetchLocations, fetchLocationDetails } from './actions';
import { Alert, Keyboard } from 'react-native';

export interface State {}

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
        showParkspots={this.props.showParkspots}
        onPress={this.props.onPress}
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
  showParkspots: Boolean;
  onPress: Function;
}

const mapStateToProps = (state) => ({
  userPosition: state.mapReducer.userPosition,
  searchString: state.searchReducer.searchString,
  data: state.searchReducer.data,
  showParkspots: state.searchReducer.showParkspots,
});

const mapDispatchToProps = (dispatch) => {
  return {
      updateSearchString: (searchString, userPosition) => {
        dispatch(updateSearchString(searchString));
        if (searchString.length == 0) {
          dispatch(fetchParkspots(userPosition.latitude, userPosition.longitude, distance=6000));
        } else {
          dispatch(fetchLocations(searchString, userPosition))
        }
      },
      fetchParkspots: (latitude ,longitude, distance=6000) => {
        dispatch(fetchParkspots(latitude, longitude, distance));
      },
      onPress: (rowData) => {
        Keyboard.dismiss();
        if (!rowData.place_id) {
          Alert.alert('Parkspot clicked', JSON.stringify(rowData));
        } else {
          dispatch(updateSearchString(rowData.description));
          dispatch(fetchLocationDetails(rowData));
        }
      }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
