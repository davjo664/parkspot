import * as React from 'react';
import { ActionSheet, Icon, Text } from 'native-base';

import { Dimensions, Linking, Platform, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';

import MapViewDirections from 'react-native-maps-directions';
import config from '../../config/config';

import MapCard from '../../components/MapCard';

import styles from './styles';
import codePush from 'react-native-code-push';

import colors from './../../theme/parkspotColors';
import LinearGradient from 'react-native-linear-gradient';
import textStyles from '../../theme/parkspotStyles';
import ElevatedView from 'react-native-elevated-view'
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

        let options = availableApps.map((app) => ({ text: titles[app] }));
        options.push({ text: 'Cancel', style: 'cancel' });

        ActionSheet.show(
          {
            options: options,
            title: 'Which map do you want to use for navigation?'
          },
          buttonIndex => {
            if (buttonIndex === options.length - 1) {
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
  };

  searchButtonWasPressed = () => {
    this.props.navigation.navigate('Search');
  };

  filterButtonWasPressed = () => {
    console.log('Filter pressed');
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

  renderMarkerInner = (text, fontSize) => {
    return (
      <View style={styles.cluster}>
        <Text style={[styles.clusterText, { fontSize: fontSize }]}>{text}</Text>
      </View>
    );
  }

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
          origin={{ latitude: this.props.userPosition.latitude, longitude: this.props.userPosition.longitude }}
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

    this.props.updateLocation();
  }


  render() {
    const data = this.transformParkspotsToData(this.props.parkspots);

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,1)']}
          locations={[0, 0.1, 0.4]}
          style={[
            styles.bottomContainer
          ]}>

          <View style={styles.searchRow}>
            <ElevatedView style={styles.searchButtonView} elevation={5} >

              <TouchableOpacity
                style={styles.searchButton}
                activeOpacity={0.7}
                onPress={() => this.searchButtonWasPressed()}>
                <View style={styles.buttonContent}>
                  <Image source={require('../../../assets/group.png')} style={styles.searchIcon} />
                  <Text style={textStyles.textStyle2}>Search for a parkspot</Text>
                </View>
              </TouchableOpacity>
            </ElevatedView>

          </View>
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.filterButtonWasPressed()}
            >
              <Icon type="MaterialIcons" name="filter-list" style={styles.icon} />
            </TouchableOpacity>

            <Text style={textStyles.textStyleMapHeading}>parkspot</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.findMeButtonWasPressed()}>
              <Image source={require('../../../assets/relocate.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

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
          showsUserLocation={true}
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
          {this.renderDrivingDirectionsOnMap()}
          {this.renderWalkingDirectionsOnMap()}
        </ClusteredMapView>
      </View >
    );
  }
}

export default Map;
