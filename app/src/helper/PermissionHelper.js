import {Alert, BackHandler, DeviceEventEmitter, Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import OpenSettings from 'react-native-open-settings';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

// @flow
export type PermissionType = 'location' | 'notification';

export class PermissionHelper {
  static strings = {
    location: {
      permissionAlert: {
        title: 'Can we access your location?',
        description: 'We need access so you can see yourself on the map and get nearby parkspots.',
        yes: 'Sure!',
        no: 'Nope.',
      },
      permissionDeniedAlert: {
        title: 'You have denied location access!',
        description: 'You need to enable the access in the device settings...',
        yes: 'Take me there!',
        no: 'Nope.',
      },
      permissionNotAvailableAlert: {
        title: 'Location is not available!',
        description: 'Ask a parent, guardian - or talk to you company IT - for access.',
        yes: 'Okay',
        no: 'Nope.',
      },
      permissionTurnOnAlert: {
        title: 'Turn on your location in the device settings!',
        description: 'We need access so you can see yourself on the map and get nearby parkspots.',
        yes: 'Take me there!',
        no: 'Cancel',
      }
    },
    notifications: {
      permissionAlert: {
        title: 'Can we send you notificaitons?',
        description: 'We want to send you when your parking spot becomes free or was taken.',
        yes: 'Sure!',
        no: 'Nope.',
      },
      permissionDeniedAlert: {
        title: 'You have denied notfications!',
        description: 'You need to enable notifications in the device settings...',
        yes: 'Take me there!',
        no: 'Nope.',
      },
    }
  };

  static hasPermission = (permissionType: PermissionType, onHasPermission: Function, requestIfNeeded: boolean = false) => {
    if (requestIfNeeded) {
      PermissionHelper._startPermissionFlow(permissionType, onHasPermission);
    }
  };

  static _startPermissionFlow = (permissionType: PermissionType, onHasPermission: Function) => {
    // handle GPS being turned off on Android
    if (permissionType == 'location' && Platform.OS === 'android') {
      PermissionHelper._checkHardwareEnabled(permissionType, onHasPermission);
    } else {
      PermissionHelper._checkPermission(permissionType, onHasPermission);
    }
  };

  static _checkPermission = (permissionType: PermissionType, onHasPermission: Function) => {
    Permissions.check(permissionType).then(response => {
      if (response === 'authorized') {
        onHasPermission();
      } else if (response === 'undetermined') {
        // user has not yet decided on access
        PermissionHelper._showPermissionAlert(permissionType, onHasPermission);
      } else {
        if (Platform.OS === 'ios') {
          if (response === 'denied') {
            // on iOS we cannot ask for access again
            PermissionHelper._showPermissionDeniedAlert(permissionType);
          } else if (response === 'restricted') {
            // on iOS this means the user cannot allow this due to e.g. parental control settings on the device
            PermissionHelper._showPermissionNotAvailable(permissionType);
          }
        } else {
          if (response === 'denied') {
            // on Android we simply ask again
            PermissionHelper._showPermissionAlert(permissionType, onHasPermission);
          } else if (response === 'restricted') {
            // on Android this means the user has checked 'Never ask me again' and denied the request.
            PermissionHelper._showPermissionDeniedAlert(permissionType);
          }
        }
      }
    });
  };


  static _showPermissionAlert = (permissionType: PermissionType, onHasPermission: Function) => {
    const strings = PermissionHelper._getStringsFor(permissionType);

    Alert.alert(strings.permissionAlert.title, strings.permissionAlert.description, [
      {
        text: strings.permissionAlert.no,
        onPress: () => {
          PermissionHelper._showPermissionDeniedAlert(permissionType);
        },
        style: 'cancel',
      },
      {
        text: strings.permissionAlert.yes,
        onPress: () => {
          PermissionHelper._requestPermission(permissionType, onHasPermission);
        },
      },
    ]);
  };

  static _showPermissionDeniedAlert = (permissionType: PermissionType) => {
    const strings = PermissionHelper._getStringsFor(permissionType);

    Alert.alert(strings.permissionDeniedAlert.title, strings.permissionDeniedAlert.description, [
      {
        text: strings.permissionDeniedAlert.yes,
        onPress: () => {
          PermissionHelper._openSettings();
        },
        text: strings.permissionDeniedAlert.no,
        onPress: () => {
        },
        style: 'cancel',
      },
    ]);
  };

  static _showPermissionNotAvailable = (permissionType: PermissionType) => {
    const strings = PermissionHelper._getStringsFor(permissionType);

    Alert.alert(strings.permissionNotAvailableAlert.title, strings.permissionNotAvailableAlert.description, [
      {
        text: strings.permissionNotAvailableAlert.yes,
        onPress: () => {
        },
      },
    ]);
  };

  static _checkHardwareEnabled = (permissionType: PermissionType, onHasPermission: Function) => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      showDialog: false,
      openLocationServices: false,
    }).then((success) => {
      onHasPermission();
    }).catch((error) => {
      const strings = PermissionHelper._getStringsFor(permissionType);

      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: `<h2>${strings.permissionTurnOnAlert.title}</h2><p>${strings.permissionTurnOnAlert.description}</p>`,
        ok: strings.permissionTurnOnAlert.yes,
        cancel: strings.permissionTurnOnAlert.no,
        enableHighAccuracy: true,
        showDialog: true,
        openLocationServices: true,
        preventOutSideTouch: false,
        preventBackClick: false,
        providerListener: false
      }).then((success) => {
        PermissionHelper._checkPermission(permissionType, onHasPermission);
      }).catch((error) => {
        PermissionHelper._showPermissionDeniedAlert(permissionType);
      });
    });


  };

  static _requestPermission = (permissionType: PermissionType, onCompletion: Function) => {
    Permissions.request(permissionType).then(response => {
      onCompletion(response);
    });
  };

  static _openSettings = () => {
    OpenSettings.openSettings();
  };

  static _getStringsFor = (permissionType: PermissionType) => {
    switch (permissionType) {
      case 'location':
        return PermissionHelper.strings.location;
      default:
        console.warn('Unsupported permission type: ', permissionType);
        return null;
    }
  };
}
