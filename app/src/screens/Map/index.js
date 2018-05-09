import * as React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';

import { View, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import CustomMapMarker from '../../components/CustomMapMarker';

const haversine = require('haversine-js');
import MapCard from '../../components/MapCard';

import styles from './styles';
import codePush from 'react-native-code-push';

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
  selectedParkspot: any;
}

class Map extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};

    this.props.fetchParkspots(
      this.props.userPosition.latitude,
      this.props.userPosition.longitude,
      this.approximateCurrentRegionRadius(this.props.userPosition),
    );
  }

  componentDidMount() {
    //remove after DEV
    codePush.getUpdateMetadata().then(metadata => {
      this.setState({
        label: metadata.label,
        version: metadata.appVersion,
        description: metadata.description,
      });
    });
  }

  onRegionChange = region => {
    this.props.userPosition = {
      ...this.props.userPosition,
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta,
    };

    // Todo only fetch if chanegd significantly. Should suffice for now though.
    // this.props.fetchParkspots(this.props.userPosition.latitude, this.props.userPosition.longitude, this.approximateCurrentRegionRadius(this.props.userPosition));
  };

  selectMarker = marker => {
    this.setState(prevState => ({
      selectedParkspot: this.props.parkspots.find(parkspot => {
        return parkspot.id == marker.key;
      }),
    }));
  };

  findMeButtonWasPressed = () => {
    this.props.updateLocation();
  };
  searchButtonWasPressed = () => {
    this.props.navigation.navigate('Search');
  };
  favoriteButtonWasPressed = () => {
    this.props.navigation.navigate('Favorites');
  };

  approximateCurrentRegionRadius = region => {
    const a = {
      longitude: region.longitude - region.longitudeDelta / 2,
      latitude: region.latitude - region.latitudeDelta / 2,
    };
    const b = {
      longitude: region.longitude + region.longitudeDelta / 2,
      latitude: region.latitude + region.latitudeDelta / 2,
    };

    const options = {
      radius: 6371, // radius of earth in km
    };

    return haversine(a, b, options).toFixed(0);
  };

  render() {
    const markers = parkspotsToCustomMapMarker(this.props.parkspots);

    return (
      <Container style={styles.container}>
        <Content>
          <Container style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => this.findMeButtonWasPressed()}
            >
              <Icon type="MaterialIcons" name="gps-fixed" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => this.favoriteButtonWasPressed()}
            >
              <Icon
                type="MaterialIcons"
                name="star"
                style={{ color: 'black' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => this.searchButtonWasPressed()}
            >
              <Icon
                name="search"
                type="MaterialIcons"
                style={{ color: 'black' }}
              />
            </TouchableOpacity>
          </Container>

          <MapCard parkspot={this.state.selectedParkspot} />

          <MapView
            style={styles.map}
            showsUserLocation={true}
            initialRegion={this.props.userPosition}
            region={this.props.userPosition}
            onRegionChange={this.onRegionChange}
            showsMyLocationButton={false}
            showsPointsOfInterest={true}
            showsScale={true}
            zoomControlEnabled={false}
            rotateEnabled={false}
            loadingEnabled={true}
          >
            {markers.map(marker => {
              return (
                <CustomMapMarker
                  key={marker.key}
                  data={marker}
                  onPress={() => this.selectMarker(marker)}
                />
              );
            })}
            <Text style={styles.versionLabel}>
              {this.state.version}.{this.state.label}
            </Text>
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
    title: parkspot.id.toString(),

    available: parkspot.available,
    electricCharger: parkspot.electricCharger,
    handicapped: parkspot.handicapped,
  }));
}
