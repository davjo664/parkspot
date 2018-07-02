import React, {Component} from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Left, List, ListItem, Right, Switch} from 'native-base';
import Interactable from 'react-native-interactable';
import Slider from '../Slider';
import {connect} from 'react-redux';

import {toggleFilter, updateDistanceFilter} from './actions';
import styles from '../MapCard/styles';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

const filters = [
  {name: 'Electric charger', id: 'electricCharger', icon: require('../../../assets/icons/filter/electricCharger.png')},
  {name: 'Free parking', id: 'cost', icon: require('../../../assets/icons/filter/nomoney.png')},
  {name: 'Unlimited parking time', id: 'time', icon: require('../../../assets/icons/filter/clock.png')},
  {name: 'Handicap parking', id: 'handicapped', icon: require('../../../assets/icons/filter/accessible.png')},
];

class FilterCard extends Component {
  onSnap = (event) => {
    if (event.nativeEvent.id === 'closed') {
      this.props.onDismiss();
    }
  };

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
    this.state = {distance: this.props.distanceFilterValue}

  }

  renderFilters() {
    const filterItems = filters.map((filter) => {
      return (
        <ListItem key={filter.id} icon style={{marginLeft: 0}}>
          <Left style={{borderBottomWidth: 0.666, borderBottomColor: '#c9c9c9'}} >
            <View style={{height: 24, width: 24}}>
              <Image source={filter.icon} />
            </View>
          </Left>
          <Body>
            <Text>{filter.name}</Text>
          </Body>
          <Right style={{borderBottomWidth: 0.666}}>
            <Switch
              onTintColor='#7ee0af'
              tintColor='#c9c9c9'
              value={this.props[filter.id]}
              onValueChange={() => {
                this.props.toggleFilter(filter.id);
                this.props.filterParkspots(filter.id);
              }
              } />
          </Right>
        </ListItem>
      );
    });
    return (
      <List>
        {filterItems}
      </List>
    );
  }

  render() {
    if (!this.props.showFilters) {
      return null;
    }

    return (
      <View style={styles.panelContainer} pointerEvents={'box-none'}>
        <Animated.View
          pointerEvents={'box-none'}
          style={[styles.panelContainer, {
            backgroundColor: 'transparent',
            opacity: this._deltaY.interpolate({
              inputRange: [0, Screen.height - 100],
              outputRange: [0.5, 0],
              extrapolateRight: 'clamp'
            }),
          }]} />
        <Interactable.View
          style={styles.interactable}
          verticalOnly={true}
          snapPoints={[{y: Screen.height - 320, id: 'open'}, {
            y: Screen.height + 70,
            id: 'closed'
          }]}
          onSnap={this.onSnap}
          boundaries={{top: -340}}
          initialPosition={{y: Screen.height - 320}}
          animatedValueY={this._deltaY}>
          <View style={[styles.panel, {padding: 0}]}>
            <View style={{padding: 20, paddingBottom: 8}}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
              <Text style={styles.panelTitle}>
                Filters
              </Text>
              {this.renderFilters()}
              <Text style={{paddingTop: 20}}> Distance from destination </Text>
            </View >
            <View >
              <Slider
                minimumValue={0}
                maximumValue={1000}
                value={this.props.distanceFilterValue * 1000}
                maximumTrackTintColor='rgba(208, 212, 215,1)'
                minimumTrackTintColor='rgba(208, 212, 215,1)'
                thumbImage={require('../../../assets/icons/map/markerPin.png')}
                onValueChange={(v) => {
                  this.setState({
                    distance: Number(v.toFixed())
                  })
                }}
                onSlidingComplete={(v) => {
                  this.props.updateDistanceFilter(Number(v.toFixed() / 1000));
                }}
              />
            </View>
          </View>
        </Interactable.View>
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
  toggleFilter: Function;
  distance: Number;
}

const mapStateToProps = state => ({
  electricCharger: state.filterReducer.electricCharger,
  cost: state.filterReducer.cost,
  favorite: state.filterReducer.favorite,
  time: state.filterReducer.time,
  handicapped: state.filterReducer.handicapped,
  distanceFilterValue: state.filterReducer.distance,
});

const mapDispatchToProps = dispatch => {
  return {
    toggleFilter: filterId => {
      dispatch(toggleFilter(filterId));
    },
    updateDistanceFilter: value => {
      dispatch(updateDistanceFilter(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCard);
