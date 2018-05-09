import * as React from 'react';

import MapView from 'react-native-maps';

import styles from './styles';

export interface Props {
	data: MarkerData;
	onPress: Function;
}

export interface State {
}

export interface Coordinate {
	latitude: Number;
	longitude: Number;
}

export interface MarkerData {
	id: Number;
	coordinate: Coordinate;
	title: string;
	available: boolean;
	electricCharger: boolean;
	handicapped: boolean;
}

class CustomMapMarker extends React.Component<Props, State> {
	render() {

		return (
			<MapView.Marker
				coordinate={this.props.data.coordinate}
				title={""}
				description={""}
                onPress={this.props.onPress}
			>
                <MapView.Callout tooltip={true} />
			</MapView.Marker>
		);
	}
}

export default CustomMapMarker;
