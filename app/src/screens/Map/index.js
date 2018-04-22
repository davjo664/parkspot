import * as React from 'react';
import {
	Container,
	Header,
	Title,
	Content,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
	List,
	ListItem,
} from 'native-base';

import MapView from 'react-native-maps';
import CustomMapMarker from '../../views/CustomMapMarker'

import styles from './styles';

export interface Props {
	navigation: any;
	updateLocation: Function;
	watchLocation: Function;
	fetchParkspots: Function;
	initialRegion: any;
	position: any;
	parkspots: any;

	isMapReady: boolean;
}

export interface State {
}

class Map extends React.Component<Props, State> {
	render() {
		this.props.fetchParkspots();

		const markers = this.props.parkspots.map(parkspot => ({
			key: parkspot.id,
			coordinate: {
				latitude: parseFloat(parkspot.lat),
				longitude: parseFloat(parkspot.lng),
			},
			title: (parkspot.id).toString(),

			available: parkspot.available,
			electricCharger: parkspot.electricCharger,
			handicapped: parkspot.handicapped,
		}));


		return (
			<Container style={styles.container}>
				<Content>
					<MapView
						ref={component => {this._map = component;}}
						style={styles.map}
						showsUserLocation={true}
						showsMyLocationButton={true}
						initialRegion={this.props.initialRegion}
					/>
						{markers.map((marker) => {
						return (
							<CustomMapMarker
								key={marker.key}
								data={marker}
							/>
						);
					})}

					</MapView>

				</Content>
			</Container>
		);
	}
}

export default Map;
