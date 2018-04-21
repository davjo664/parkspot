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
	position: any;
	parkspots: any;
}

export interface State {
}

class Map extends React.Component<Props, State> {
	render() {
		const markers = this.props.parkspots.map(parkspot => ({
			key: parkspot.id,
			coordinate: {
				latitude: parseFloat(parkspot.lat),
				longitude: parseFloat(parkspot.lng),
			},
			title: (parkspot.id).toString(),
			description: "...",
		}));

		return (
			<Container style={styles.container}>
				<Header>
					<Title style={styles.title}>Map</Title>
					<Button style={styles.button} onPress={() => this.props.watchLocation()}>
						<Text>Watch location</Text>
					</Button>
				</Header>
				<Content>
					<MapView
						style={styles.map}
						region={this.props.position}
					>{markers.map((marker) => {
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
