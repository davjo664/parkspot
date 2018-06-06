// @flow
import * as React from 'react';
import { Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import Map from '../../screens/Map';
import { fetchParkspots, updateLocation, updateMapPosition } from './actions';
import { PermissionHelper } from '../../helper/PermissionHelper';

export interface Props {
  navigation: any;
  updateLocation: Function;
  fetchParkspots: Function;
  parkspots: any;
  userPosition: any;
  mapPosition: Object;
  updateMapPosition: Function;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {

  componentDidMount() {
    PermissionHelper.startPermissionFlow('location');
  }

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
    updateMapPosition: (mapPosition) => dispatch(updateMapPosition(mapPosition))
  };
}

const mapStateToProps = state => ({
  parkspots: state.mapReducer.parkspots,
  userPosition: state.mapReducer.userPosition,
  mapPosition: state.mapReducer.mapPosition,
});
export default connect(mapStateToProps, bindAction)(MapContainer);
