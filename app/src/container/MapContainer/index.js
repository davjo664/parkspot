// @flow
import * as React from 'react';
import {Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {fetchParkspots, updateLocation} from './actions';
import {PermissionHelper} from '../../helper/PermissionHelper';

export interface Props {
  navigation: any;
  updateLocation: Function;
  fetchParkspots: Function;
  parkspots: any;
  userPosition: any;
  chosenParkspot: Object;
  searchString: String;
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
        chosenParkspot={this.props.chosenParkspot}
        searchString={this.props.searchString}
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
  };
}

const mapStateToProps = state => ({
  parkspots: state.mapReducer.parkspots,
  userPosition: state.mapReducer.userPosition,
  chosenParkspot: state.searchReducer.chosenParkspot,
  searchString: state.searchReducer.searchString,
});
export default connect(mapStateToProps, bindAction)(MapContainer);
