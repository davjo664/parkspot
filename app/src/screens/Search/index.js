import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  PixelRatio,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Qs from 'qs';
import debounce from 'lodash.debounce';

const WINDOW = Dimensions.get('window');

const defaultStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 34,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderLeftColor: 'grey',
    borderRightColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    width: '80%',
    marginLeft: '10%',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  listView: {},
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    justifyContent: 'center',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};

export default class SearchScreen extends Component {
  _isMounted = false;
  _results = [];
  _requests = [];

  constructor(props) {
    super(props);
    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    text: this.props.getDefaultValue(),
    currentLocation: { lat: 48.765496, lng: 9.14882 },
    dataSource: [],
    parkspots: [],
    showParkspots: true,
    filterElectricity: false,
    filterCost: false,
    filterFavorite: false,
    filterTime: false,
    filterDisabled: false,
  });

  setAddressText = address => this.setState({ text: address });

  getAddressText = () => this.state.text;

  componentWillMount() {
    this._request = this.props.debounce
      ? debounce(this._request, this.props.debounce)
      : this._request;
  }

  componentDidMount() {
    // This will load the default value's search results after the view has
    // been rendered
    this._onChangeText(this.state.text);
    this._isMounted = true;
    this.getCurrentLocation();
    this._requestNearbyParkspots(
      this.state.currentLocation.lat,
      this.state.currentLocation.lng,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.text !== 'undefined' &&
      this.state.text !== nextProps.text
    ) {
      this._handleChangeText(nextProps.text);
    }
  }

  componentWillUnmount() {
    this._abortRequests();
    this._isMounted = false;
  }

  _abortRequests = () => {
    this._requests.map(i => i.abort());
    this._requests = [];
  };

  /**
   * This method is exposed to parent components to focus on textInput manually.
   * @public
   */
  triggerFocus = () => {
    if (this.refs.textInput) this.refs.textInput.focus();
  };

  /**
   * This method is exposed to parent components to blur textInput manually.
   * @public
   */
  triggerBlur = () => {
    if (this.refs.textInput) this.refs.textInput.blur();
  };

  getCurrentLocation = () => {
    // let options = {
    //   enableHighAccuracy: false,
    //   timeout: 20000,
    //   maximumAge: 1000
    // };

    // if (this.props.enableHighAccuracyLocation && Platform.OS === 'android') {
    //   options = {
    //     enableHighAccuracy: true,
    //     timeout: 20000
    //   }
    // }
    console.log('mm');
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('mm2');
        // if (this.props.nearbyPlacesAPI === 'None') {
        let currentLocation = {
          // description: this.props.currentLocationLabel,
          // geometry: {
          // location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // }
        // };
        this.state.currentLocation = currentLocation;
        // this._disableRowLoaders();
        // this.props.onPress(currentLocation, currentLocation);
        // } else {
        //   this._requestNearby(position.coords.latitude, position.coords.longitude);
        // }
      },
      error => {
        // this._disableRowLoaders();
        alert(error.message);
      },
      // options
    );
  };

  _onPress = rowData => {
    if (!rowData.place_id) {
      Alert.alert('Parkspot clicked', JSON.stringify(rowData));
      return;
    }
    if ( rowData.isPredefinedPlace !== true) {
      if (rowData.isLoading === true) {
        // already requesting
        return;
      }

      this._abortRequests();

      // display loader
      this._enableRowLoader(rowData);

      // fetch details
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          if (responseJSON.status === 'OK') {
            if (this._isMounted === true) {
              const details = responseJSON.result;
              this._disableRowLoaders();
              this._onBlur();

              this.setState({
                text: this._renderDescription(rowData),
              });

              delete rowData.isLoading;
              this.props.onPress(rowData, details);

              this._requestNearbyParkspots(
                details.geometry.location.lat,
                details.geometry.location.lng,
              );
            }
          } else {
            this._disableRowLoaders();

            this.setState({
              text: this._renderDescription(rowData),
            });
            delete rowData.isLoading;
            console.warn(
              'google places autocomplete: ' + responseJSON.status,
            );
          }
        } else {
          this._disableRowLoaders();
          console.warn(
            'google places autocomplete: request could not be completed or has been aborted',
          );
        }
      };

      request.open(
        'GET',
        'https://maps.googleapis.com/maps/api/place/details/json?' +
          Qs.stringify({
            key: this.props.query.key,
            placeid: rowData.place_id,
            language: this.props.query.language,
          }),
      );

      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin);
      }

      request.send();
    } else if (rowData.isCurrentLocation === true) {
      // display loader
      this._enableRowLoader(rowData);

      this.setState({
        text: this._renderDescription(rowData),
      });

      this.triggerBlur(); // hide keyboard but not the results
      delete rowData.isLoading;
      this.getCurrentLocation();
    } else {
      this.setState({
        text: this._renderDescription(rowData),
      });

      this._onBlur();
      delete rowData.isLoading;
      let predefinedPlace = this._getPredefinedPlace(rowData);

      // sending predefinedPlace as details for predefined places
      this.props.onPress(predefinedPlace, predefinedPlace);
    }
  };

  _enableRowLoader = rowData => {
    let rows = this._results;
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true &&
          rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true;
        this.setState({
          dataSource: rows,
        });
        break;
      }
    }
  };

  _disableRowLoaders = () => {
    if (this._isMounted === true) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false;
        }
      }

      this.setState({
        dataSource: this._results,
      });
    }
  };

  _getPredefinedPlace = rowData => {
    if (rowData.isPredefinedPlace !== true) {
      return rowData;
    }

    for (let i = 0; i < this.props.predefinedPlaces.length; i++) {
      if (this.props.predefinedPlaces[i].description === rowData.description) {
        return this.props.predefinedPlaces[i];
      }
    }

    return rowData;
  };

  _filterResultsByTypes = (unfilteredResults, types) => {
    if (types.length === 0) return unfilteredResults;

    const results = [];
    for (let i = 0; i < unfilteredResults.length; i++) {
      let found = false;

      for (let j = 0; j < types.length; j++) {
        if (unfilteredResults[i].types.indexOf(types[j]) !== -1) {
          found = true;
          break;
        }
      }

      if (found === true) {
        results.push(unfilteredResults[i]);
      }
    }
    return results;
  };

  _requestNearby = (latitude, longitude) => {
    this._abortRequests();

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== null &&
      longitude !== null
    ) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          this._disableRowLoaders();

          if (typeof responseJSON.results !== 'undefined') {
            if (this._isMounted === true) {
              var results = [];
              if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
                results = this._filterResultsByTypes(
                  responseJSON.results,
                  this.props.filterReverseGeocodingByTypes,
                );
              } else {
                results = responseJSON.results;
              }

              this.setState({
                dataSource: results,
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn(
              'google places autocomplete: ' + responseJSON.error_message,
            );
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      let url = '';
      if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
        // your key must be allowed to use Google Maps Geocoding API
        url =
          'https://maps.googleapis.com/maps/api/geocode/json?' +
          Qs.stringify({
            latlng: latitude + ',' + longitude,
            key: this.props.query.key,
            ...this.props.GoogleReverseGeocodingQuery,
          });
      } else {
        url =
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
          Qs.stringify({
            location: latitude + ',' + longitude,
            key: this.props.query.key,
            ...this.props.GooglePlacesSearchQuery,
          });
      }

      request.open('GET', url);
      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin);
      }

      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: [],
      });
    }
  };

  _requestNearbyParkspots = (lat, lng, radius = 6000) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const results = JSON.parse(request.responseText);
        console.log(results);
        this.setState({
          parkspots: results,
          showParkspots: true,
        });
      } else {
        console.warn('error');
      }
    };

    request.open(
      'GET',
      'https://parkspot.mi.hdm-stuttgart.de/api/parkspot/' +
        lat +
        '/' +
        lng +
        '/' +
        radius,
    );
    request.send();
  };

  _request = text => {
    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.predictions !== 'undefined') {
            if (this._isMounted === true) {
              const results =
                this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding'
                  ? this._filterResultsByTypes(
                      responseJSON.predictions,
                      this.props.filterReverseGeocodingByTypes,
                    )
                  : responseJSON.predictions;

              this._results = results;
              console.log(results);
              this.setState({
                showParkspots: false,
                dataSource: results,
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn(
              'google places autocomplete: ' + responseJSON.error_message,
            );
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };
      request.open(
        'GET',
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?' +
          'location=' +
          48.73095 +
          ',' +
          9.14882 +
          '&radius=500&components=country:de|country:nl&' +
          'input=' +
          encodeURIComponent(text) +
          '&' +
          Qs.stringify(this.props.query),
      );
      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin);
      }

      request.send();
    } else {
      if (this._results.length > 0) {
        // If user removes the search string, show parkspots nearby current location again.
        this._requestNearbyParkspots(
          this.state.currentLocation.lat,
          this.state.currentLocation.lng,
        );
      }
      this._results = [];
      this.setState({
        dataSource: [],
      });
    }
  };

  _onChangeText = text => {
    this._request(text);

    this.setState({
      text: text,
    });
  };

  _handleChangeText = text => {
    this._onChangeText(text);

    const onChangeText =
      this.props &&
      this.props.textInputProps &&
      this.props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  };

  _getRowLoader() {
    return <ActivityIndicator animating={true} size="small" />;
  }

  _renderRowData = rowData => {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData);
    }

    return (
      <Text
        style={[
          {},
          this.props.suppressDefaultStyles ? {} : defaultStyles.description,
          this.props.styles.description,
          rowData.isPredefinedPlace
            ? this.props.styles.predefinedPlacesDescription
            : {},
        ]}
        numberOfLines={1}
      >
        {this._renderDescription(rowData)}
      </Text>
    );
  };

  _renderDescription = rowData => {
    return (
      rowData.description ||
      rowData.formatted_address ||
      rowData.name ||
      rowData.dist
    );
  };

  _renderLoader = rowData => {
    if (rowData.isLoading === true) {
      return (
        <View
          style={[
            this.props.suppressDefaultStyles ? {} : defaultStyles.loader,
            this.props.styles.loader,
          ]}
        >
          {this._getRowLoader()}
        </View>
      );
    }

    return null;
  };

  _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={true}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{ width: WINDOW.width, marginTop: 6, marginBottom: 6 }}
          onPress={() => this._onPress(rowData)}
        >
          <View
            style={[
              this.props.suppressDefaultStyles ? {} : defaultStyles.row,
              this.props.styles.row,
              rowData.isPredefinedPlace ? this.props.styles.specialItemRow : {},
            ]}
          >
            {this._renderLoader(rowData)}
            {this._renderRowData(rowData)}
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  _renderFilterIcon = (icon, text, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <Icon name={icon} />
          </View>
          <Text> {text} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderFilterRow = () => {
    if (this.state.showParkspots) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginTop: 10, marginBottom: 2, color: 'grey' }}>
            Filter options
          </Text>
          <View
            style={{
              width: WINDOW.width - 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {this._renderFilterIcon(
              this.state.filterElectricity ? 'ios-flash-outline' : 'ios-flash',
              'electricity',
              () => {
                this.setState({
                  filterElectricity: !this.state.filterElectricity,
                });
              },
            )}
            {this._renderFilterIcon(
              this.state.filterCost ? 'ios-cash-outline' : 'ios-cash',
              'cost',
              () => {
                this.setState({ filterCost: !this.state.filterCost });
              },
            )}
            {this._renderFilterIcon(
              this.state.filterFavorite ? 'ios-star-outline' : 'ios-star',
              'favorite',
              () => {
                this.setState({ filterFavorite: !this.state.filterFavorite });
              },
            )}
            {this._renderFilterIcon(
              this.state.filterTime ? 'ios-timer-outline' : 'ios-timer',
              'time',
              () => {
                this.setState({ filterTime: !this.state.filterTime });
              },
            )}
            {this._renderFilterIcon(
              this.state.filterDisabled ? 'ios-person-outline' : 'ios-person',
              'disabled',
              () => {
                this.setState({ filterDisabled: !this.state.filterDisabled });
              },
            )}
          </View>
        </View>
      );
    }
  };

  _renderSeparator = (sectionID, rowID) => {
    // if (rowID == this.state.dataSource.length - 1) {
    //   return null
    // }

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[
          this.props.suppressDefaultStyles ? {} : defaultStyles.separator,
          this.props.styles.separator,
        ]}
      />
    );
  };

  _onBlur = () => {
    this.triggerBlur();
  };

  _onFocus = () => {};

  _renderLeftButton = () => {
    if (this.props.renderLeftButton) {
      return this.props.renderLeftButton();
    }
  };

  _renderRightButton = () => {
    if (this.props.renderRightButton) {
      return this.props.renderRightButton();
    }
  };

  _renderNearbyText = () => {
    if (this.state.showParkspots) {
      return (
        <Text
          style={{ fontSize: 18, color: 'grey', marginLeft: 12, marginTop: 12 }}
        >
          Parking spots nearby
        </Text>
      );
    }
  };

  _getFlatList = () => {
    const keyGenerator = () =>
      Math.random()
        .toString(36)
        .substr(2, 10);
    return (
      <FlatList
        style={[
          this.props.suppressDefaultStyles ? {} : defaultStyles.listView,
          this.props.styles.listView,
        ]}
        data={
          this.state.showParkspots
            ? this.state.parkspots
            : this.state.dataSource
        }
        keyExtractor={keyGenerator}
        extraData={[this.state.dataSource, this.props]}
        renderItem={({ item }) => this._renderRow(item)}
        {...this.props}
      />
    );
  };
  render() {
    let { onFocus, ...userProps } = this.props.textInputProps;
    return (
      <View
        style={[
          this.props.suppressDefaultStyles ? {} : defaultStyles.container,
          this.props.styles.container,
        ]}
        pointerEvents="box-none"
      >
        <Header noShadow searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input 
              placeholder="Search"
              returnKeyType={'search'}
              autoFocus={this.props.autoFocus}
              value={this.state.text}
              clearButtonMode="while-editing"
              onChangeText={this._handleChangeText}
            />
          </Item>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Text>Search</Text>
          </Button>
        </Header>
        {this._renderFilterRow()}
        {this._renderNearbyText()}
        {this._getFlatList()}
        {this.props.children}
      </View>
    );
  }
}

SearchScreen.propTypes = {
  onPress: PropTypes.func,
  minLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  getDefaultValue: PropTypes.func,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  query: PropTypes.object,
  GoogleReverseGeocodingQuery: PropTypes.object,
  GooglePlacesSearchQuery: PropTypes.object,
  styles: PropTypes.object,
  textInputProps: PropTypes.object,
  predefinedPlaces: PropTypes.array,
  currentLocation: PropTypes.bool,
  currentLocationLabel: PropTypes.string,
  nearbyPlacesAPI: PropTypes.string,
  enableHighAccuracyLocation: PropTypes.bool,
  filterReverseGeocodingByTypes: PropTypes.array,
  predefinedPlacesAlwaysVisible: PropTypes.bool,
  enableEmptySections: PropTypes.bool,
  renderDescription: PropTypes.func,
  renderRow: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  debounce: PropTypes.number,
  text: PropTypes.string,
  textInputHide: PropTypes.bool,
  suppressDefaultStyles: PropTypes.bool,
};
SearchScreen.defaultProps = {
  onPress: () => {},
  minLength: 2,
  autoFocus: true,
  keyboardShouldPersistTaps: 'always',
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('google places autocomplete: request timeout'),
  query: {
    key: 'missing api key',
    language: 'en',
    types: 'geocode',
  },
  GoogleReverseGeocodingQuery: {},
  GooglePlacesSearchQuery: {
    rankby: 'distance',
    types: 'food',
  },
  styles: {},
  textInputProps: {},
  predefinedPlaces: [],
  currentLocation: false,
  currentLocationLabel: 'Current location',
  nearbyPlacesAPI: 'GooglePlacesSearch',
  enableHighAccuracyLocation: true,
  filterReverseGeocodingByTypes: [],
  predefinedPlacesAlwaysVisible: false,
  enableEmptySections: true,
  debounce: 0,
  textInputHide: false,
  suppressDefaultStyles: false,
};
