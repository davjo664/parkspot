import {Platform, Alert} from 'react-native';
import Permissions from 'react-native-permissions';
import OpenSettings from 'react-native-open-settings';

// @flow
export type PermissionType = "location";

export class PermissionHelper {
    static strings = {
      location: {
          permissionAlert: {
              title: "Can we access your location?",
              description: "We need access so you can see yourself on the map and get nearby parkspots.",
              yes: "Sure!",
              no: "Nope.",
          },
          permissionDeniedAlert: {
              title: "You have denied location access!",
              description: "You need to enable the access in the device settings...",
              yes: "Take me there!",
          },
          permissionNotAvailableAlert: {
              title: "Location is not available!",
              description: "Ask a parent, guardian - or talk to you company IT - for access.",
              yes: "Okay",
          },
      },
    };

    static startPermissionFlow = (permissionType: PermissionType) : boolean => {
        Permissions.check(permissionType).then(response => {
            if (response === 'authorized') {
                // we have nothing left to do
                return true;
            }

            if (response === 'undetermined') {
                // user has not yet decided on access
                PermissionHelper.showPermissionAlert(permissionType);
            } else {
                if (Platform.OS === 'ios') {
                    if (response === 'denied') {
                        // on iOS we cannot ask for access again
                        PermissionHelper.showPermissionDeniedAlert(permissionType);
                    } else if (response === 'restricted') {
                        // on iOS this means the user cannot allow this due to e.g. parental control settings on the device
                        PermissionHelper.showPermissionNotAvailable(permissionType);
                    }
                } else {
                    if (response === 'denied') {
                        // on Android we simply ask again
                        PermissionHelper.showPermissionAlert(permissionType);
                    } else if (response === 'restricted') {
                        // on Android this means the user has checked 'Never ask me again' and denied the request.
                        PermissionHelper.showPermissionDeniedAlert(permissionType);
                    }
                }
            }
        });
    };


    static showPermissionAlert = (permissionType: PermissionType) => {
        const strings = PermissionHelper._getStringsFor(permissionType);

        Alert.alert(strings.permissionAlert.title, strings.permissionAlert.description, [
            {
                text: strings.permissionAlert.no,
                onPress: PermissionHelper.showPermissionDeniedAlert(permissionType),
                style: "cancel",
            },
            {
                text: strings.permissionAlert.yes,
                onPress: PermissionHelper.requestPermission(permissionType),
            },
        ]);
    };

    static showPermissionDeniedAlert = (permissionType: PermissionType) => {
        const strings = PermissionHelper._getStringsFor(permissionType);

        Alert.alert(strings.permissionDeniedAlert.title, strings.permissionDeniedAlert.description, [
            {
                text: strings.permissionDeniedAlert.yes,
                onPress: PermissionHelper._openSettings(),
            },
        ]);
    };

    static showPermissionNotAvailable = (permissionType: PermissionType) => {
        const strings = PermissionHelper._getStringsFor(permissionType);

        Alert.alert(strings.permissionNotAvailableAlert.title, strings.permissionNotAvailableAlert.description, [
            {
                text: strings.permissionNotAvailableAlert.yes,
                onPress: null,
            },
        ]);
    };

    static requestPermission = (permissionType: PermissionType, onCompletion: Function) => {
        Permissions.request(permissionType).then(response => {
            onCompletion(response);
        });
    };

    static _openSettings = () => {
        OpenSettings.openSettings();
    };

    static _getStringsFor = (permissionType: PermissionType) => {
        switch (permissionType) {
            case "location":
                return PermissionHelper.strings.location;
            default:
                console.warn("Unsupported permission type: ", permissionType);
                return null;
        }
    };
}
