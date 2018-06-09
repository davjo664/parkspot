import * as React from 'react';
import {ActionSheet, Icon, Text} from 'native-base';

import {Dimensions, Image, Linking, Platform, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Callout, Marker} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import LinearGradient from 'react-native-linear-gradient';

import MapViewDirections from 'react-native-maps-directions';
import config from '../../config/config';

import MapCard from '../../components/MapCard';

import styles from './styles';
import codePush from 'react-native-code-push';

import colors from './../../theme/parkspotColors';
import {PermissionHelper} from '../../helper/PermissionHelper';
import gradient from '../../theme/parkspotGradient';


const haversine = require('haversine-js');

export interface Props {
  navigation: any;
  updateLocation: Function;
  watchLocation: Function;
  stopWatchLocation: Function;
  fetchParkspots: Function;
  updateMapPosition: Function;
  parkspots: any;
  userPosition: any;
  mapPosition: any;
  selectedLocation: Object;
}

export interface State {
  selectedParkspot: any;
  mapPosition: any;
  showsUserLocation: boolean;
  destination: any;
}

class Map extends React.Component<Props, State> {
  onRegionChangeComplete = region => {
    this.props.updateMapPosition({
      latitude: region.latitude,
      longitude: region.longitude,
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta,
    });

    this.props.fetchParkspots(
      this.props.mapPosition.latitude,
      this.props.mapPosition.longitude,
      this.approximateCurrentRegionRadius(this.props.mapPosition),
    );
  };

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
    this.props.updateMapPosition({
      latitude: Number(parkspot.lat),
      longitude: Number(parkspot.lng),
      latitudeDelta: 0.0005,
      longitudeDelta: 0.005,
    });
    this.setState({
      selectedParkspot: parkspot,
    });
  };

  startNavigation = () => {

    const isIOS = Platform.OS === 'ios';
    const prefixes = {
      'apple-maps': isIOS ? 'http://maps.apple.com/' : 'applemaps://',
      'google-maps': isIOS ? 'comgooglemaps://' : 'https://maps.google.com/',
      'waze': 'waze://',
    };
    const titles = {
      'apple-maps': 'Apple Maps',
      'google-maps': 'Google Maps',
      'waze': 'Waze',
    };
    const userPosition = `${this.props.userPosition.latitude},${this.props.userPosition.longitude}`;
    const parkspotPosition = `${this.state.selectedParkspot.lat},${this.state.selectedParkspot.lng}`;

    isAppInstalled = (app) => {
      return new Promise((resolve) => {
        if (!(app in prefixes)) {
          return resolve(false);
        }

        Linking.canOpenURL(prefixes[app])
          .then((result) => {
            resolve(!!result);
          })
          .catch(() => resolve(false));
      });
    };

    askAppChoice = () => {
      return new Promise(async (resolve) => {
        let availableApps = [];
        for (let app in prefixes) {
          let avail = await isAppInstalled(app);
          if (avail) {
            availableApps.push(app);
          }
        }

        let options = availableApps.map((app) => ({text: titles[app]}));
        options.push({text: 'Cancel', style: 'cancel'});
        const CANCEL_INDEX = options.length - 1;

        ActionSheet.show(
          {
            options: options,
            title: 'Which map do you want to use for navigation?',
            cancelButtonIndex: CANCEL_INDEX,
          },
          buttonIndex => {
            if (buttonIndex === CANCEL_INDEX) {
              return resolve(null);
            }
            return resolve(availableApps[buttonIndex]);
          }
        );
      });
    };

    start = async () => {
      const app = await askAppChoice();
      if (!app) {
        return;
      }
      let url = prefixes[app];
      switch (app) {
        case 'apple-maps':
          url += `?saddr=${userPosition}&daddr=${parkspotPosition}`;
          url += `&q=Parkspot`;
          break;
        case 'google-maps':
          url += `?q=Parkspot`;
          url += (isIOS) ? '&api=1' : '';
          url += `&saddr=${userPosition}&daddr=${parkspotPosition}`;
          break;
        case 'waze':
          url += `?ll=${parkspotPosition}&navigate=yes`;
          break;
      }

      Linking.openURL(url);
    };

    start();
  };

  findMeButtonWasPressed = () => {
    PermissionHelper.hasPermission('location', () => {
      this.props.updateLocation();
      //location is usually already set so no need to wait for that... if bugs check here
      this.props.updateMapPosition(
        {
          latitude: this.props.userPosition.latitude,
          longitude: this.props.userPosition.longitude,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }
      );
      this.state.showsUserLocation = true;
    }, true);
  };

  searchButtonWasPressed = () => {
    this.props.navigation.navigate('Search');
  };

  favoriteButtonWasPressed = () => {
    this.props.navigation.navigate('Favorites', {setSelectedParkspot: this.setSelectedParkspot});
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

  setDestination = (latitude: Number, longitude: Number, description: String) => {
    this.state.destination = {
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      description: description,
    };
  };

  unsetDestination = () => {
    this.state.destination = null;
  };

  renderMarkerInner = (text, fontSize) => {
    return (
      <LinearGradient style={styles.cluster} colors={gradient.colors} start={gradient.start} end={gradient.end}
        locations={gradient.locations}>
        <Text style={[styles.clusterText, {fontSize: fontSize}]}>{text}</Text>
      </LinearGradient>
    );
  };

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate;

    const fontSize = pointCount <= 9 ? 18 : (pointCount <= 99 ? 15 : 15);
    const text = pointCount <= 99 ? pointCount : '99+';

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        {this.renderMarkerInner(text, fontSize)}
      </Marker>
    );
  };
  renderMarker = (data) => {
    return (
      <Marker key={data.id} coordinate={data.location}>
        {this.renderMarkerInner('P', 18)}
      </Marker>
    );
  };
  renderDestination = (data) => {
    if (data == null) {
      return null;
    }

    return (
      <Marker key={'destination'} coordinate={data.location}>
        <Image
          style={styles.destinationMarker}
          source={require('../../../assets/destinationPin.png')}
        />
        <Callout style={styles.destinationCallout}>
          <Text style={styles.destinationCalloutText}>{data.description}</Text>
        </Callout>
      </Marker>
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

  renderWalkingDirectionsOnMap = () => {
    if (this.state.selectedParkspot) {
      return (

        <MapViewDirections
          origin={{
            latitude: Number(this.state.selectedParkspot.lat),
            longitude: Number(this.state.selectedParkspot.lng)
          }}
          destination={this.props.selectedLocation ? {
            latitude: this.props.selectedLocation.lat,
            longitude: this.props.selectedLocation.lng
          } : null}
          apikey={config.googleApi.key}
          strokeWidth={2}
          strokeColor={colors.gunmetal}
          mode="walking"
        />

      );
    }
  };
  renderDrivingDirectionsOnMap = () => {
    if (this.state.selectedParkspot) {
      return (
        <MapViewDirections
          origin={{latitude: this.props.userPosition.latitude, longitude: this.props.userPosition.longitude}}
          destination={{
            latitude: Number(this.state.selectedParkspot.lat),
            longitude: Number(this.state.selectedParkspot.lng)
          }}
          apikey={config.googleApi.key}
          strokeWidth={5}
          strokeColor={colors.cement}
        />

      );
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedParkspot: null,
      showsUserLocation: false,
    };

    this.props.fetchParkspots(
      this.props.mapPosition.latitude,
      this.props.mapPosition.longitude,
      this.approximateCurrentRegionRadius(this.props.mapPosition),
    );
  }

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

    PermissionHelper.hasPermission('location', () => {
      this.props.updateLocation();
      this.state.showsUserLocation = true;
    }, true);
  }


  render() {
    const data = this.transformParkspotsToData(this.props.parkspots);

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.buttonsContainer,
            {bottom: this.state.selectedParkspot ? 240 : 20},
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
            <Icon type="MaterialIcons" name="star" style={{color: 'black'}} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => this.searchButtonWasPressed()}
          >
            <Icon
              name="search"
              type="MaterialIcons"
              style={{color: 'black'}}
            />
          </TouchableOpacity>
        </View>

        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.versionLabel}>
            {this.state.version}.{this.state.label}
          </Text>
        </SafeAreaView>

        <MapCard
          onStartNavigation={this.startNavigation}
          parkspot={this.state.selectedParkspot}
          onDismiss={this.deselectParkspot}
        />

        <ClusteredMapView
          style={styles.map}
          showsUserLocation={this.state.showsUserLocation}
          region={this.props.mapPosition}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsMyLocationButton={false}
          showsPointsOfInterest={true}
          showsScale={true}
          zoomControlEnabled={false}
          rotateEnabled={false}
          loadingEnabled={true}
          onPress={this.mapWasPressed}
          onMarkerPress={this.markerWasPressed}
          ref={(r) => {
            this.map = r;
          }}
          data={data}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
        >
          {this.renderDestination(this.state.destination)}
          {this.renderDrivingDirectionsOnMap()}
          {this.renderWalkingDirectionsOnMap()}
        </ClusteredMapView>
      </View>
    );
  }
}

export default Map;
