import {Platform} from 'react-native';
import FusedLocation from 'react-native-fused-location';

// @flow

export class LocationAccessHelper {
  static getLocation = async (onCompletion: ?Function, onError: ?Function) => {
    if (Platform.OS === 'ios') {
      navigator.geolocation.getCurrentPosition(
        userPosition => {
          onCompletion({latitude: userPosition.coords.latitude, longitude: userPosition.coords.longitude});
        },
        error => {
          onError(error);
        }
      );
    } else {
      FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);

      const location = await FusedLocation.getFusedLocation();
      onCompletion({latitude: location.latitude, longitude: location.longitude});
    }
  }
}
