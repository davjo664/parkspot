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
import CustomMapMarker from '../../components/CustomMapMarker';

const haversine = require('haversine-js');
import MapCard from '../../components/MapCard';

import styles from './styles';

export interface Props {
    navigation: any;
    updateLocation: Function;
    watchLocation: Function;
    stopWatchLocation: Function;
    fetchParkspots: Function;
    parkspots: any;
    userPosition: any;
}

export interface State {
    shouldFollowUser: Boolean;
    selectedParkspot : any;
}

class Map extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            shouldFollowUser: false,
        };

        this.props.fetchParkspots(this.props.userPosition.latitude, this.props.userPosition.longitude, this.approximateCurrentRegionRadius(this.props.userPosition));
    };


    onRegionChange = (region) => {
        this.props.userPosition = {
            ...this.props.userPosition,
            longitudeDelta: region.longitudeDelta,
            latitudeDelta: region.latitudeDelta,
        };

        // Todo only fetch if chanegd significantly. Should suffice for now though.
        // this.props.fetchParkspots(this.props.userPosition.latitude, this.props.userPosition.longitude, this.approximateCurrentRegionRadius(this.props.userPosition));
    };

    selectMarker = (marker) => {
        this.setState((prevState) => ({
            selectedParkspot: this.props.parkspots.find((parkspot) => { return parkspot.id == marker.key})
        }));
    };

    findMeButtonWasPressed = () => {
        this.props.updateLocation();
    };

    followMeButtonWasPressed = () => {
        this.setState((prevState) => ({
            shouldFollowUser: !prevState.shouldFollowUser
        }));

        // TODO: WTF??
        if (!this.state.shouldFollowUser) {
            this.props.watchLocation();
        } else {
            this.props.stopWatchLocation();
        }
    };

    approximateCurrentRegionRadius = (region) => {
        const a = {
            longitude: region.longitude - region.longitudeDelta / 2,
            latitude: region.latitude - region.latitudeDelta / 2
        };
        const b = {
            longitude: region.longitude + region.longitudeDelta / 2,
            latitude: region.latitude + region.latitudeDelta / 2
        };

        const options = {
            radius: 6371 // radius of earth in km
        };

        return haversine(a, b, options).toFixed(0);
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
                            onPress={() => this.findMeButtonWasPressed()}
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

                    <MapCard parkspot={this.state.selectedParkspot} />


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
                                    onPress={() => this.selectMarker(marker)}
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