import React, {Component} from 'react';
import {Icon, Text,} from 'native-base';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';

const WINDOW = Dimensions.get('window');

var filters = [
  {name: 'electricity', id: 'electricCharger', icon: 'ios-flash'},
  {name: 'cost', id: 'cost', icon: 'ios-cash'},
  {name: 'favorite', id: 'favorite', icon: 'ios-star'},
  {name: 'time', id: 'time', icon: 'ios-timer'},
  {name: 'disabled', id: 'handicapped', icon: 'ios-person'},
];

class Filter extends Component {
  render() {
    const filterArray = filters.map(filter => (
      <TouchableOpacity
        key={filter.id}
        onPress={() => this.props.toggleFilter(filter.id)}
      >
        <View style={{alignItems: 'center'}}>
          <View>
            <Icon
              name={
                this.props[filter.id] ? filter.icon : filter.icon + '-outline'
              }
            />
          </View>
          <Text> {filter.name} </Text>
        </View>
      </TouchableOpacity>
    ));
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{marginTop: 10, marginBottom: 2, color: 'grey'}}>
          Filter options
        </Text>
        <View
          style={{
            width: WINDOW.width - 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {filterArray}
        </View>
      </View>
    );
  }
}

export interface Props {
  electricCharger: boolean;
  cost: boolean;
  favorite: boolean;
  time: boolean;
  handicapped: boolean;
}

const mapStateToProps = state => ({
  electricCharger: state.filterReducer.electricCharger,
  cost: state.filterReducer.cost,
  favorite: state.filterReducer.favorite,
  time: state.filterReducer.time,
  handicapped: state.filterReducer.handicapped,
});

export default connect(mapStateToProps, {})(Filter);
