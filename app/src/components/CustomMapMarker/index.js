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

		const description = "[available=" + this.props.data.available + ", electricCharger=" + this.props.data.electricCharger
			+ ", handicapped=" + this.props.data.handicapped + "]";

		return (
			<MapView.Marker
				coordinate={this.props.data.coordinate}
				title={"id=" + this.props.data.title}
				description={description}
                onPress={this.props.onPress}
			/>
		);
	}
}

export default CustomMapMarker;
