// @flow
import * as React from 'react';
import {Platform, Alert} from 'react-native';
import { connect } from 'react-redux';
import Map from '../../screens/Map';
import { updateLocation, fetchParkspots } from './actions';
import Permissions from 'react-native-permissions'
import OpenSettings from 'react-native-open-settings';


import type PermissionType from '../../helper/PermissionHelper';
import {PermissionHelper} from '../../helper/PermissionHelper';

export interface Props {
  navigation: any;
  updateLocation: Function;
  fetchParkspots: Function;
  parkspots: any;
  userPosition: any;
}

export interface State {}

class MapContainer extends React.Component<Props, State> {
  askForLocationPermission = () => {
     PermissionHelper.showPermissionAlert('location');
  };

  requestLocationPermission = () => {
      PermissionHelper.requestPermission('location', (response) => {
          console.warn(response);
      })
  };

  alertLocationAccessDenied = () => {
      
  };

    alertLocationAccessNotPossible = () => {
        Alert.alert(
            'Location is not available!',
            'Ask a parent, guardian - or talk to you company IT - for access.',
            [
                {
                    text: "Okay.",
                    onPress: ()=>{}
                }
            ]
        )
    };

    gotoSettings = () => {
        OpenSettings.openSettings();
    };

  checkLocationPermission = () => {
      Permissions.check('location').then(response => {
          // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
          // this.setState({ photoPermission: response })
          if (response === 'authorized')
          {
              // we have access, nothing to do
              return;
          } else if (response === 'undetermined') {
              // user has not yet decided on access
              this.askForLocationPermission();
          } else if (response === 'denied') {
            if (Platform.OS === 'ios') {
              // on iOS we cannot ask for permission again.
              this.alertLocationAccessDenied();
            } else {
              // on Android we simply ask again
                this.askForLocationPermission();
            }
          } else if (response === 'restricted') {
              if (Platform.OS === 'ios') {
                  // on iOS this means the user cannot allow this due to e.g. parental control settings on the device
                  this.alertLocationAccessNotPossible();
              } else {
                  // on Android this means the user has checked 'Never ask me again' and denied the request.
                  this.alertLocationAccessDenied();
              }
          }
      })
  };

  componentDidMount() {
      this.requestLocationPermission();
    // this.checkLocationPermission();
  }

  render() {
    return (
      <Map
        navigation={this.props.navigation}
        updateLocation={this.props.updateLocation}
        fetchParkspots={this.props.fetchParkspots}
        parkspots={this.props.parkspots}
        userPosition={this.props.userPosition}
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
});
export default connect(mapStateToProps, bindAction)(MapContainer);
