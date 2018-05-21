import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {
    View,
    FlatList,
    ScrollView,
    Dimensions,
    Platform,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Keyboard,
    SafeAreaView
} from 'react-native';
import Qs from 'qs';

import defaultStyles from './styles';

const WINDOW = Dimensions.get('window');

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

  componentWillMount() {
  }

  componentDidMount() {
    // This will load the default value's search results after the view has
    // been rendered
    this._onChangeText(this.state.text);
    this._isMounted = true;
    this._getCurrentLocation();
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
      this._onChangeText(nextProps.text);
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

_getCurrentLocation = () => {
    let options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000
    };

    if (Platform.OS === 'android') {
      options = {
        enableHighAccuracy: true,
        timeout: 20000
      }
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        let currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.state.currentLocation = currentLocation;
      },
      error => {
        alert(error.message);
      },
      options
    );
  };

  _onPress = rowData => {
    if (!rowData.place_id) {
      Alert.alert('Parkspot clicked', JSON.stringify(rowData));
      return;
    }
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
            this._disableRowLoaders();
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
        // console.warn(
        //   'google places autocomplete: request could not be completed or has been aborted',
        // );
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

    request.send();
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
    }
  };

  //TODO radius should be controlled by the user
  _requestNearbyParkspots = (lat, lng, radius = 6000) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const results = JSON.parse(request.responseText);
        this.setState({
          parkspots: results,
          showParkspots: true,
        });
        return;
      } else {
        console.warn("Parkspot API: request could not be completed or has been aborted");
        return;
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
              const results = responseJSON.predictions;
              this._results = results;
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
          console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      //TODO: Get lat lng from users current position
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

  _getRowLoader() {
    return <ActivityIndicator animating={true} size="small" />;
  }

  _renderRowData = rowData => {
    return (
      <Text
        style={[
          {},
          defaultStyles.description,
          this.props.styles.description,
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
            defaultStyles.loader,
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
        keyboardShouldPersistTaps='always'
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
              defaultStyles.row,
              this.props.styles.row
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

  _onBlur = () => {
    Keyboard.dismiss();
  };

  _onFocus = () => {};

  _renderSearchBar = () => {
    return (
      <Header noShadow searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input 
            placeholder="Search"
            returnKeyType={'search'}
            autoFocus={this.props.autoFocus}
            value={this.state.text}
            clearButtonMode="while-editing"
            onChangeText={this._onChangeText}
            style={[
              defaultStyles.input,
              this.props.styles.input,
            ]}
          />
        </Item>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Text>Cancel</Text>
        </Button>
      </Header>
    );
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

  _renderFlatList = () => {
    const keyGenerator = () =>
      Math.random()
        .toString(36)
        .substr(2, 10);
    return (
      <FlatList
        style={[
          defaultStyles.listView,
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
        keyboardShouldPersistTaps= 'always'
      />
    );
  };
  render() {
    return (
        <SafeAreaView style={defaultStyles.safeArea}>
          <View
            style={[
              defaultStyles.container,
              this.props.styles.container,
            ]}
            pointerEvents="box-none"
          >
            {this._renderSearchBar()}
            {this._renderFilterRow()}
            {this._renderNearbyText()}
            {this._renderFlatList()}
          </View>
        </SafeAreaView>
    );
  }
}

export interface Props {
  onPress: Function;
  minLength: Number;
  autoFocus: Boolean;
  getDefaultValue: Function;
  timeout: Number;
  onTimeout: Function;
  query: Object;
  styles: Object;
  text: String;
};

SearchScreen.defaultProps = {
  onPress: () => {},
  minLength: 2,
  autoFocus: true,
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('google places autocomplete: request timeouts'),
  query:{
    // available options: https://developers.google.com/places/web-service/autocomplete
    key: 'AIzaSyBtDPqZtRAMenSwz32oIUWWf1i_Gnub1dc',
    language: 'en', // language of the results
  },
  styles: {},
  text: ''
};