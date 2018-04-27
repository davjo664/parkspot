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
    fetchParkspots: Function;
    parkspots: any;
    userPosition: any;
}

export interface State {
    shouldFollowUser: Boolean;
    refreshInterval: Number;
    interval: any;
}

class Map extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            shouldFollowUser: false,
            refreshInterval: 500,
            interval: null,
        };

        this.props.fetchParkspots();
    };


    onRegionChange = (region) => {
        this.props.userPosition = {
            ...this.props.userPosition,
            longitudeDelta: region.longitudeDelta,
            latitudeDelta: region.latitudeDelta,
        };
    };

    followMeButtonWasPressed = () => {
        this.setState((prevState) => ({
            shouldFollowUser: !prevState.shouldFollowUser
        }));

        // TODO: check why negation is needed... I don't think it makes sense?!
        if (!this.state.shouldFollowUser) {
            this.setState({interval: setInterval(this.props.updateLocation, this.state.refreshInterval)});
        } else {
            clearInterval(this.state.interval);
            this.setState({interval: null});
        }
    };

    render() {
        const markers = parkspotsToCustomMapMarker(this.props.parkspots);

        return (
            <Container style={styles.container}>
                <Content>
                    <Container style={styles.buttons}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.findMeButton}
                            onPress={() => this.props.updateLocation()}
                        >
                            <Text>Find me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={this.state.shouldFollowUser ? styles.followMeButtonActive : styles.followMeButton}
                            onPress={() => this.followMeButtonWasPressed()}
                        >
                            <Text
                                style={this.state.shouldFollowUser ? styles.followMeButtonTextActive : styles.followMeButtonText}>Follow
                                me</Text>
                        </TouchableOpacity>
                    </Container>

                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        initialRegion={this.props.userPosition}
                        region={this.props.userPosition}
                        onRegionChange={this.onRegionChange}
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

export function parkspotsToCustomMapMarker(parkspots) {
    return parkspots.map(parkspot => ({
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
};