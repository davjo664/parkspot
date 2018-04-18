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

import styles from './styles';

export interface Props {
	navigation: any;
	updateLocation: Function;
	position: any;
}

export interface State {
}

class Map extends React.Component<Props, State> {
	render() {
		this.props.updateLocation();

		return (
			<Container style={styles.container}>
				<Header>
					<Title style={styles.title}>Map</Title>
					<Button style={styles.button} onPress={() => this.props.updateLocation()}>
						<Text>Get location</Text>
					</Button>
				</Header>
				<Content>
					<MapView
						style={styles.map}
						region={this.props.position}

					/>
				</Content>
			</Container>
		);
	}
}

export default Map;
