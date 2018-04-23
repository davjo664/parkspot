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

import {View, Dimensions, TouchableOpacity} from 'react-native';
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
		const { height: windowHeight } = Dimensions.get('window');
		const varTop = windowHeight - 125;
		const hitSlop = {
			top: 15,
			bottom: 15,
			left: 15,
			right: 15,
		};

		const bbStyle = function(vheight) {
			return {
				position: 'absolute',
				top: vheight,
				left: 10,
				right: 10,
				backgroundColor: 'transparent',
				alignItems: 'center',
			}
		};

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
					<View style={bbStyle(varTop)}>
						<TouchableOpacity
							hitSlop = {hitSlop}
							activeOpacity={0.7}
							style={styles.mapButton}
							onPress={ () => this.props.updateLocation() }
						>
							<Text style={{fontWeight: 'bold', color: 'black',}}>
								Find me...
							</Text>
						</TouchableOpacity>
					</View>
					<MapView
						style={styles.map}
						showsUserLocation={true}
						initialRegion={this.props.initialRegion}
						region={this.props.position}
					>
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
