import * as React from 'react';
import {ActionSheet, Icon, Text} from 'native-base';

import {Dimensions, Image, ImageBackground, Linking, Platform, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Callout, Marker} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import LinearGradient from 'react-native-linear-gradient';

import MapViewDirections from 'react-native-maps-directions';
import config from '../../config/config';

import MapCard from '../../components/MapCard';
import FilterCard from '../../components/FilterCard';

import styles from './styles';
import codePush from 'react-native-code-push';

import colors from './../../theme/parkspotColors';
import {PermissionHelper} from '../../helper/PermissionHelper';

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
  filterParkspots: Function;
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
    this.setShowFilters(false)
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

  setShowFilters = (show) => {
    this.setState({
      showFilters: show
    });
  };


  mapWasPressed = () => {
    this.deselectParkspot();
    this.setShowFilters(false);
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

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount;


    const fontSize = pointCount <= 9 ? 18 : (pointCount <= 99 ? 15 : 15);
    const text = pointCount <= 99 ? pointCount : '99+';

    return this.renderPin(cluster.coordinate, require('../../../assets/map/clusterPin.png'), '', text, fontSize, onPress);
  };

  renderMarker = (data) => {
    const isSelected = this.state.selectedParkspot != null && this.state.selectedParkspot.id == data.id

    const image = isSelected ? require('../../../assets/map/selectedPin.png') : require('../../../assets/map/markerPin.png');
    const fontSize = isSelected ? 15 : 18;
    const additionalTextStyles = isSelected ? {paddingBottom: 8} : null;

    return this.renderPin(data.location, image, data.id, 'P', fontSize, null, additionalTextStyles);
  };

  renderPin = (coordinate: Object, image: String, key: String, text: String, fontSize: Number, onPress: ?Function, additionalTextStyles: ?Object) => {

    // Android does not seem to like background images...
    if (Platform.OS === 'ios') {
      return (
        <Marker key={key} coordinate={coordinate} onPress={onPress}>
          <ImageBackground style={styles.pin} source={image}>
            <Text style={[styles.pinText, {fontSize: fontSize}, additionalTextStyles]}>{text}</Text>
          </ImageBackground>
        </Marker>
      );
    } else {
      return (
        <Marker style={styles.pin} key={key} coordinate={coordinate} onPress={onPress} image={image}>
          <Text style={[styles.pinText, {fontSize: fontSize, paddingLeft: 4, paddingTop: 4}, additionalTextStyles]}>{text}</Text>
        </Marker>
      );
    }

  };

  renderDestination = (data) => {
    if (data == null) {
      return null;
    }

    return (
      <Marker key={'destination'} coordinate={data.location} style={styles.destinationPin}
        image={require('../../../assets/map/destinationPin.png')}>
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
            latitude: this.props.selectedLocation.location.latitude,
            longitude: this.props.selectedLocation.location.longitude
          } : null}
          apikey={config.googleApi.key}
          strokeWidth={2}
          strokeColor={colors.greyishTeal}
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
          strokeColor={colors.gunmetal}
        />

      );
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedParkspot: null,
      showsUserLocation: false,
      showFilters: false
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
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,1)']}
          locations={[0, 0.1, 0.4]}
          style={[
            styles.bottomContainer
          ]}>

          <View style={styles.searchRow}>
            <ElevatedView style={styles.searchButtonView} elevation={Platform.OS === 'ios' ? 5 : 3}>

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
              onPress={() => this.setShowFilters(true)}
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

        <View style={styles.safeArea}>
          <Text style={styles.versionLabel}>
            {this.state.version}.{this.state.label}
          </Text>
        </View>

        <FilterCard
          showFilters={this.state.showFilters}
          onDismiss={() => {
            this.setShowFilters(false)
          }}
          filterParkspots={this.props.filterParkspots}
        />

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
          {this.renderDestination(this.props.selectedLocation)}
          {this.renderDrivingDirectionsOnMap()}
          {this.renderWalkingDirectionsOnMap()}
        </ClusteredMapView>
      </SafeAreaView>
    );
  }
}

export default Map;
