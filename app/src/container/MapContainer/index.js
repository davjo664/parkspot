// @flow
import * as React from 'react';
import {Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {fetchParkspots, filterParkspots, updateLocation, updateMapPosition} from './actions';

export interface Props {
  navigation: any;
  updateLocation: Function;
  fetchParkspots: Function;
  parkspots: any;
  userPosition: any;
  mapPosition: Object;
  updateMapPosition: Function;
  selectedLocation: Object;
  filterParkspots: Function;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
  render() {
    return (
      <Map
        navigation={this.props.navigation}
        updateLocation={this.props.updateLocation}
        fetchParkspots={this.props.fetchParkspots}
        parkspots={this.props.parkspots}
        userPosition={this.props.userPosition}
        mapPosition={this.props.mapPosition}
        updateMapPosition={this.props.updateMapPosition}
        selectedLocation={this.props.selectedLocation}
        filterParkspots={this.props.filterParkspots}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchParkspots: (
      latitude: ?number,
      longitude: ?number,
      distance: ?number,
    ) => {
      dispatch(fetchParkspots(latitude, longitude, distance));
    },
    updateLocation: () => dispatch(updateLocation()),
    updateMapPosition: (mapPosition) => dispatch(updateMapPosition(mapPosition)),
    filterParkspots: (filterId) => dispatch(filterParkspots(filterId))
  };
}

const mapStateToProps = state => ({
  parkspots: state.mapReducer.parkspots,
  userPosition: state.mapReducer.userPosition,
  mapPosition: state.mapReducer.mapPosition,
  selectedLocation: state.searchReducer.selectedLocation
});
export default connect(mapStateToProps, bindAction)(MapContainer);
