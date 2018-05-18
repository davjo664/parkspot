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
  Keyboard
} from 'react-native';
import Qs from 'qs';

import defaultStyles from './styles';
import Filter from '../../components/Filter/index'

const WINDOW = Dimensions.get('window');

export default class SearchScreen extends Component {

  componentDidMount() {
    if (this.props.data.length == 0) {
      this.props.fetchParkspots(this.props.userPosition.latitude, this.props.userPosition.longitude);
    }
  }

  _onChangeText = text => {
    this.props.updateSearchString(text, this.props.userPosition);
  };

  _getRowLoader() {
    return <ActivityIndicator animating={true} size="small" />;
  }

  _renderRowData = rowData => {
    return (
      <Text
        style={[
          {},
          defaultStyles.description
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
            defaultStyles.loader
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
          onPress={() => this.props.onPress(rowData)}
        >
          <View
            style={[
              defaultStyles.row
            ]}
          >
            {this._renderLoader(rowData)}
            {this._renderRowData(rowData)}
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
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
            onChangeText={this._onChangeText}
            style={[
              defaultStyles.input
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
        <Filter />
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
          defaultStyles.listView
        ]}
        data={
          this.props.data
        }
        keyExtractor={keyGenerator}
        extraData={this.props.data}
        renderItem={({ item }) => this._renderRow(item)}
        keyboardShouldPersistTaps= 'always'
      />
    );
  };
  render() {
    return (
      <View
        style={[
          defaultStyles.container
        ]}
        pointerEvents="box-none"
      >
        {this._renderSearchBar()}
        {this._renderFilter()}
        {this._renderNearbyText()}
        {this._renderFlatList()}
      </View>
    );
  }
}

export interface Props {
  navigation: any;
  userPosition: any;
  updateSearchString: Function;
  searchString: String;
  data: Array;
  fetchParkspots: Function;
  showParkspots: Boolean;
  onPress: Function;
}

export interface State {

}