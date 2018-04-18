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
}

export interface State {
}

class Map extends React.Component<Props, State> {
	render() {

		return (
			<Container style={styles.container}>
				<Header>
					<Title style={styles.title}>Map</Title>
				</Header>
				<Content>
					<MapView
						style={styles.map}
						region={{
							latitude: 48.7420025,
							longitude: 9.100759299999936,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
					/>
				</Content>
			</Container>
		);
	}
}

export default Map;
