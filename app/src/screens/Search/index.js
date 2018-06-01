import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text, Content, List } from 'native-base';
import {
  View,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';

import defaultStyles from './styles';
import Filter from '../../components/Filter/index';
var filters = [
  { name: 'electricCharger', icon: 'ios-flash' },
  { name: 'cost', icon: 'ios-cash' },
  { name: 'favorite', icon: 'ios-star' },
  { name: 'time', icon: 'ios-timer' },
  { name: 'handicapped', icon: 'ios-person' },
];

import { ParkspotListItem, PlaceListItem } from '../../components/ListItems';


const WINDOW = Dimensions.get('window');

export default class SearchScreen extends Component {
  componentDidMount() {
    if (this.props.data.length == 0) {
      this.props.fetchParkspots(
        this.props.userPosition.latitude,
        this.props.userPosition.longitude,
      );
    }
  }

  _onPress = rowData => {
    Keyboard.dismiss();
    this.props.updateSearchString(rowData.description);
    if (!rowData.place_id) {
      Alert.alert('Parkspot clicked', JSON.stringify(rowData));
    } else {
      this.props.onPress(rowData);
    }
  };

  _onChange = text => {
    this.props.updateSearchString(text);
    if (text.length == 0) {
      this.props.fetchParkspots(
        this.props.userPosition.latitude,
        this.props.userPosition.longitude,
        (distance = 6000),
      );
    } else {
      this.props.fetchLocations(text, this.props.userPosition);
    }
  };


  _renderLoader = () => {
    if (this.props.isLoading === true) {
      return (
        <ActivityIndicator
          animating={true}
          size="small"
          style={{ marginRight: 10 }}
        />
      );
    }

    return null;
  };



  _renderSearchBar = () => {
    return (
      <Header noShadow searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            returnKeyType={'search'}
            autoFocus={true}
            value={this.props.searchString}
            clearButtonMode="while-editing"
            onChangeText={text => this._onChange(text)}
            style={[defaultStyles.input]}
          />
          {this._renderLoader()}
        </Item>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Text>Cancel</Text>
        </Button>
      </Header>
    );
  };

  _renderNearbyText = () => {
    if (this.props.showParkspots) {
      return (
        <Text
          style={{ fontSize: 18, color: 'grey', marginLeft: 12, marginTop: 12 }}
        >
          Parking spots nearby
        </Text>
      );
    }
  };

  _renderFilter = () => {
    if (this.props.showParkspots) {
      return (
        <Filter
          toggleFilter={filterId => {
            this.props.toggleFilter(filterId);
            this.props.filterData(filterId);
          }}
        />
      );
    }
  };

  _renderList = () => {
    let data = null;
    if (this.props.showParkspots) {
      data = this.props.filteredData.map(spot => (
        <ParkspotListItem key={spot.id} parkspot={spot} onPress={() => this._onPress(spot)} />
      ));
    } else {
      data = this.props.data.map(place => (
        <PlaceListItem key={place.id} place={place} onPress={() => this._onPress(place)} />
      ));
    }
    return (<Content  >
      <List>
        {data}
      </List>
    </Content>)
  }

  render() {
    return (
      <SafeAreaView style={defaultStyles.safeArea}>
        <View style={[defaultStyles.container]} pointerEvents="box-none">
          {this._renderSearchBar()}
          {this._renderFilter()}
          {this._renderNearbyText()}
          {this._renderList()}
        </View>
      </SafeAreaView>
    );
  }
}

export interface Props {
  navigation: any;
  userPosition: any;
  updateSearchString: Function;
  searchString: String;
  data: Array;
  filteredData: Array;
  fetchParkspots: Function;
  fetchLocations: Function;
  showParkspots: Boolean;
  onPress: Function;
  isLoading: Boolean;
  toggleFilter: Function;
  filterData: Function;
}

export interface State { }
