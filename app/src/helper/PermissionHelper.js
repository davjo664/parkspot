import {Platform, Alert} from 'react-native';
import Permissions from 'react-native-permissions';

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
      },
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

    static requestPermission = (permissionType: PermissionType, onCompletion: Function) => {
        Permissions.request(permissionType).then(response => {
            onCompletion(response);
        });
    };

    static _openSettings = () => {

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
