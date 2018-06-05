import React, {Component} from 'react';
import {Button, Content, Header, Icon, Input, Item, List, Text} from 'native-base';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  Linking,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';

import defaultStyles from './styles';
import Filter from '../../components/Filter/index';
import {ParkspotListItem, PlaceListItem} from '../../components/ListItems';

var filters = [
  {name: 'electricCharger', icon: 'ios-flash'},
  {name: 'cost', icon: 'ios-cash'},
  {name: 'favorite', icon: 'ios-star'},
  {name: 'time', icon: 'ios-timer'},
  {name: 'handicapped', icon: 'ios-person'},
];

const WINDOW = Dimensions.get('window');

export default class SearchScreen extends Component {
  _onPress = rowData => {
    Keyboard.dismiss();
    if (rowData.description) {
      this.props.updateSearchString(rowData.description);
      //method passed via nav from Maps to set selectedLocation
      this.props.navigation.state.params.setSelectedLocation(rowData.description);
      this.props.fetchLocationDetails(rowData);
    } else {
      //method passed via nav from Maps to set selectedparkspot
      this.props.navigation.state.params.setSelectedParkspot(rowData);
      this.props.navigation.goBack()
    }
  };
  _onChange = text => {
    this.props.updateSearchString(text);
    if (text.length == 0) {
      this.props.navigation.state.params.setSelectedLocation('');
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
          style={{marginRight: 10}}
        />
      );
    }

    return null;
  };
  _renderSearchBar = () => {
    return (
      <Header noShadow searchBar rounded>
        <Item>
          <Icon name="ios-search"/>
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
          style={{fontSize: 18, color: 'grey', marginLeft: 12, marginTop: 12}}
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
        <ParkspotListItem key={spot.id} parkspot={spot} onPress={() => this._onPress(spot)}/>
      ));
    } else {
      data = this.props.data.map(place => (
        <PlaceListItem key={place.id} place={place} onPress={() => this._onPress(place)}/>
      ));
    }
    return (<Content>
      <List>
        {data}
      </List>
    </Content>);
  };


  componentDidMount() {
    if (this.props.data.length == 0) {
      this.props.fetchParkspots(
        this.props.userPosition.latitude,
        this.props.userPosition.longitude,
      );
    }
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
  fetchLocationDetails: Function;
  isLoading: Boolean;
  toggleFilter: Function;
  filterData: Function;
}

export interface State {
}
