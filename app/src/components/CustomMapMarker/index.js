import * as React from 'react';

import MapView from 'react-native-maps';

import styles from './styles';

export interface Props {
    coordinate: {
        latitude: Number;
        longitude: Number;
    };
}

export interface State {
}

class CustomMapMarker extends React.Component<Props, State> {
    render() {
        return (
            <MapView.Marker
                coordinate={this.props.coordinate}
                title={""}
                description={""}
                onPress={this.props.onPress}
            >
                <MapView.Callout tooltip={true}/>
            </MapView.Marker>
        );
    }
}

export default CustomMapMarker;
