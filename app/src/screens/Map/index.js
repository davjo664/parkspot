import * as React from 'react';
import { Text, Icon } from 'native-base';

import { View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';


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
    if (!__DEV__) {
      codePush.getUpdateMetadata().then(metadata => {
        this.setState({
          label: metadata.label,
          version: metadata.appVersion,
          description: metadata.description,
        });
      });
    }

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

  setSelectedParkspot = (parkspot: Object) => {
    this.setState({
      selectedParkspot: parkspot,
      mapPosition: {
        latitude: Number(parkspot.lat),
        longitude: Number(parkspot.lng),
        latitudeDelta: 0.0005,
        longitudeDelta: 0.005,
      },
      shouldCenterToUserPosition: false,
    });
  }

  findMeButtonWasPressed = () => {
    this.props.updateLocation();

    this.setState({
      shouldCenterToUserPosition: true,
    });
  };
  searchButtonWasPressed = () => {
    this.props.navigation.navigate('Search', { setSelectedParkspot: this.setSelectedParkspot });
  };
  favoriteButtonWasPressed = () => {
    this.props.navigation.navigate('Favorites', { setSelectedParkspot: this.setSelectedParkspot });
  };

  mapWasPressed = () => {
    this.deselectParkspot();
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

  deselectParkspot = () => {
    this.setState({
      selectedParkspot: null,
    });
  };

  /** Clustering **/

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate;

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.cluster}>
          <Text style={styles.clusterText}>{pointCount}</Text>
        </View>
      </Marker>
    );
  };

  renderMarker = (data) => {
    return (
      <Marker key={data.id} coordinate={data.location} />
    );
  };

  transformParkspotsToData = (parkspots) => {
    return parkspots.map((parkspot) => {
      return {
        id: parkspot.id,
        location: {
          longitude: parseFloat(parkspot.lng),
          latitude: parseFloat(parkspot.lat),
        }
      };
    });
  };


  /** / Clustering **/

  render() {
    const data = this.transformParkspotsToData(this.props.parkspots);

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

        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.versionLabel}>
            {this.state.version}.{this.state.label}
          </Text>
        </SafeAreaView>

        <MapCard
          parkspot={this.state.selectedParkspot}
          onDismiss={this.deselectParkspot}
        />

        <ClusteredMapView
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
          ref={(r) => { this.map = r }}
          data={data}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
        />
      </View>
    );
  }
}

export default Map;
