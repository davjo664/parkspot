import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import {
  View,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import defaultStyles from './styles';
import Filter from '../../components/Filter/index';

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

  _renderRowData = rowData => {
    return (
      <Text style={[{}, defaultStyles.description]} numberOfLines={1}>
        {this._renderDescription(rowData)}
      </Text>
    );
  };

  _renderDescription = rowData => {
    return rowData.description || rowData.address || rowData.dist;
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

  _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={true}
        keyboardShouldPersistTaps="always"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{ width: WINDOW.width, marginTop: 6, marginBottom: 6 }}
          onPress={() => this.props.onPress(rowData)}
        >
          <View style={[defaultStyles.row]}>
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
            onChangeText={text =>
              this.props.updateSearchString(text, this.props.userPosition)
            }
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
      return <Filter />;
    }
  };

  _renderFlatList = () => {
    const keyGenerator = () =>
      Math.random()
        .toString(36)
        .substr(2, 10);
    return (
      <FlatList
        style={[defaultStyles.listView]}
        data={this.props.data}
        keyExtractor={keyGenerator}
        extraData={this.props.data}
        renderItem={({ item }) => this._renderRow(item)}
        keyboardShouldPersistTaps="always"
      />
    );
  };
  render() {
    return (
      <SafeAreaView style={defaultStyles.safeArea}>
        <View style={[defaultStyles.container]} pointerEvents="box-none">
          {this._renderSearchBar()}
          {this._renderFilter()}
          {this._renderNearbyText()}
          {this._renderFlatList()}
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
  fetchParkspots: Function;
  showParkspots: Boolean;
  onPress: Function;
  isLoading: Boolean;
}

export interface State {}
