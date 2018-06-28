import React, {Component} from 'react';
import {Content, List, ListItem, Text} from 'native-base';
import {Dimensions, FlatList, Keyboard, Linking, Platform, SafeAreaView, TouchableOpacity, View} from 'react-native';

import defaultStyles from './styles';
import {FavoriteListItem, PlaceListItem} from '../../components/ListItems';
import SearchBar from '../../components/SearchBar';
import textStyles from '../../theme/parkspotStyles';

const WINDOW = Dimensions.get('window');

export default class SearchScreen extends Component {
  _onPress = rowData => {
    Keyboard.dismiss();
    //method passed via nav from Maps to set selectedLocation
    this.props.fetchLocationDetails(rowData);
    this.props.addLastSearched(rowData);
    this.props.updateSearchString('');
    this.props.navigation.goBack();
  };
  _onChange = text => {
    this.props.updateSearchString(text);
    if (text.length > 0) {
      this.props.fetchLocations(text, this.props.userPosition);
    }
  };

  _renderSearchBar = () => {
    return (
      <View style={defaultStyles.searchBar}>
        <SearchBar onChange={this._onChange} isLoading={this.props.isLoading} searchString={this.props.searchString}/>
        <TouchableOpacity style={defaultStyles.cancelButton} onPress={() => this.props.navigation.goBack()}>
          <Text style={textStyles.textStyle2}>Cancel</Text>
        </TouchableOpacity>
      </View>
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

  _renderPlaceItem = (place) => {
    return <PlaceListItem place={place} onPress={() => this._onPress(place)}
                          addFavorite={() => this.props.addFavorite(place)}
                          remFavorite={() => this.props.remFavorite(place)}/>;
  };
  _renderList = () => {
    let data;
    if (!this.props.showLocations) {
      let favorites = this.props.favorites.map(place => (
        <View key={place.id}>
          {this._renderPlaceItem(place)}
        </View>
      ));
      let lastSearches = this.props.lastSearches.map(place => (
        <View key={place.id}>
          {this._renderPlaceItem(place)}
        </View>
      ));

      let textStyle1 = {fontWeight: 'bold', fontSize: 22, color: 'rgb(29,30,24)'};
      let textStyle2 = [textStyles.textStyle3, {paddingLeft: 20}];
      return (
        <Content>
          <List>
            <ListItem itemHeader first style={{paddingBottom: favorites.length > 0 ? 0 : 10}}>
              <Text style={textStyle1}>Favorites</Text>
            </ListItem>
            <Text style={[textStyle2, {display: favorites.length > 0 ? 'none' : 'flex'}]}> No favorites yet </Text>
            {favorites}
            <ListItem itemHeader first style={{paddingTop: 50, paddingBottom: lastSearches.length > 0 ? 0 : 10}}>
              <Text style={textStyle1}>Last searches</Text>
            </ListItem>
            <Text style={[textStyle2, {display: lastSearches.length > 0 ? 'none' : 'flex'}]}> No last searches
              yet </Text>
            {lastSearches}
          </List>
        </Content>
      );
    } else {
      let data = this.props.data.map(place => (
        <View key={place.id}>
          {this._renderPlaceItem(place)}
        </View>
      ));
      return (<Content>
        <List>
          {data}
        </List>
      </Content>);
    }
  };

  render() {
    return (
      <SafeAreaView style={defaultStyles.safeArea}>
        <View style={[defaultStyles.container]} pointerEvents='box-none'>
          {this._renderSearchBar()}
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
  fetchLocations: Function;
  showLocations: Boolean;
  fetchLocationDetails: Function;
  isLoading: Boolean;
  addFavorite: Function;
  remFavorite: Function;
  favorites: any;
  addLastSearched: Function;
  lastSearches: any;
}

export interface State {
}
