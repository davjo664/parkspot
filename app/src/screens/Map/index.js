import * as React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';

import { View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView from 'react-native-map-markerclustering';

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
  mapPosition: any;
  shouldCenterToUserPosition: boolean;
}

class Map extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedParkspot: null,
      mapPosition: {
        latitude: 48.775,
        longitude: 9.175,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      shouldCenterToUserPosition: false,
    };

    this.props.fetchParkspots(
      this.state.mapPosition.latitude,
      this.state.mapPosition.longitude,
      this.approximateCurrentRegionRadius(this.state.mapPosition),
    );
  }

  onRegionChangeComplete = region => {
    this.state.mapPosition = {
      latitude: region.latitude,
      longitude: region.longitude,
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta,
    };

    this.props.fetchParkspots(
      this.state.mapPosition.latitude,
      this.state.mapPosition.longitude,
      this.approximateCurrentRegionRadius(this.state.mapPosition),
    );
  };

  componentDidMount() {
    //remove after DEV
    codePush.getUpdateMetadata().then(metadata => {
      this.setState({
        label: metadata.label,
        version: metadata.appVersion,
        description: metadata.description,
      });
    });

    this.props.updateLocation();
  }

  componentWillReceiveProps() {
    if (this.state.shouldCenterToUserPosition) {
      this.setState(previousState => {
        return {
          shouldCenterToUserPosition: false,
          mapPosition: {
            ...previousState.mapPosition,
            longitude: this.props.userPosition.longitude,
            latitude: this.props.userPosition.latitude,
          },
        };
      });
    }
  }

  markerWasPressed = (event: any) => {
    /*
         * Note: do not rely on Marker.onPress() to get the marker, since this does not work on iOS, instead use MapView.onMarkerPress()!
         * See this issue for details: https://github.com/react-community/react-native-maps/issues/1689
         */
    this.setState({
      selectedParkspot: this.props.parkspots.find(parkspot => {
        return (
          parkspot.lat == event.nativeEvent.coordinate.latitude &&
          parkspot.lng == event.nativeEvent.coordinate.longitude
        );
      }),
    });
  };

  findMeButtonWasPressed = () => {
    this.props.updateLocation();

    this.setState({
      shouldCenterToUserPosition: true,
    });
  };
  searchButtonWasPressed = () => {
    this.props.navigation.navigate('Search');
  };
  favoriteButtonWasPressed = () => {
    this.props.navigation.navigate('Favorites');
  };

  mapWasPressed = () => {
    this.deselectParkspot();
  };

  clusterWasPressed = (coordinate) => {
    this.animateToCoordinate(coordinate);
  };

  animateToCoordinate = (coordinate) => {
    let newRegion = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: this.state.mapPosition.latitudeDelta * 0.1,
      longitudeDelta: this.state.mapPosition.longitudeDelta * 0.1,
    };
    this.refs.mapView._root.animateToRegion(newRegion, 1000);


  }

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

  deselectParkspot = () => {
    this.setState({
      selectedParkspot: null,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.buttonsContainer,
            { bottom: this.state.selectedParkspot ? 240 : 20 },
          ]}
        >
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
            <Icon type="MaterialIcons" name="star" style={{ color: 'black' }} />
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
        </View>

        <MapCard
          parkspot={this.state.selectedParkspot}
          onDismiss={this.deselectParkspot}
        />

        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.mapPosition}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsMyLocationButton={false}
          showsPointsOfInterest={true}
          showsScale={true}
          zoomControlEnabled={false}
          rotateEnabled={false}
          loadingEnabled={true}
          onPress={this.mapWasPressed}
          onMarkerPress={this.markerWasPressed}
          onClusterPress={this.clusterWasPressed}
          ref={"mapView"}
        >
          {this.props.parkspots.map(parkspot => {
            return (
              <MapView.Marker
                key={parkspot.id}
                coordinate={{ latitude: parseFloat(parkspot.lat), longitude: parseFloat(parkspot.lng) }}
              />
            );
          })}
        </MapView>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.versionLabel}>
            {this.state.version}.{this.state.label}
          </Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default Map;
