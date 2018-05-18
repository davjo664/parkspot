import * as React from 'react';

import MapView from 'react-native-maps';

import styles from './styles';

export interface Props {
    latitude: Number;
    longitude: Number;
}

export interface State {
}

class CustomMapMarker extends React.Component<Props, State> {
    render() {
        return (
            <MapView.Marker
                coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}}
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
