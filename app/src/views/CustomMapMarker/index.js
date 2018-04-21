import * as React from 'react';
import {
	View,
	Text,
} from 'native-base';

import MapView from 'react-native-maps';

import styles from './styles';

export interface Props {
	data: MarkerData;
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
	description: string;
}

class CustomMapMarker extends React.Component<Props, State> {
	render() {
		return (
			<MapView.Marker
				coordinate={this.props.data.coordinate}
				title={this.props.data.title}
				description={this.props.data.description}
			/>
		);
	}
}

export default CustomMapMarker;
