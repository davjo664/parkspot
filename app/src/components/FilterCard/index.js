import React, {Component} from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Left, List, ListItem, Right, Switch} from 'native-base';
import Interactable from 'react-native-interactable';
import Slider from '../Slider';
import {connect} from 'react-redux';

import {toggleFilter, updateDistanceFilter} from './actions';
import styles from '../MapCard/styles';
import additionalStyles from './styles';


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

const filters = [
  {name: 'Electric charger', id: 'electricCharger', icon: require('../../../assets/icons/filter/electricCharger.png')},
  {name: 'Free parking', id: 'cost', icon: require('../../../assets/icons/filter/nomoney.png')},
  {name: 'Handicap parking', id: 'handicapped', icon: require('../../../assets/icons/filter/accessible.png')},
  {name: 'Unlimited parking time', id: 'time', icon: require('../../../assets/icons/filter/clock.png')},
];

class FilterCard extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
    this.state = {distance: this.props.distanceFilterValue}

  }

  renderFilters() {
    const filterItems = filters.map((filter) => {
      return (
        <ListItem key={filter.id} icon style={additionalStyles.listItem}>
          <Left style={additionalStyles.noBorder}>
            <View style={[{height: 24, width: 24}, additionalStyles.noBorder]}>
              <Image source={filter.icon}/>
            </View>
          </Left>
          <Body style={additionalStyles.noBorder}>
          <Text style={additionalStyles.filterName}>{filter.name}</Text>
          </Body>
          <Right style={additionalStyles.noBorder}>
            <Switch thumbTintColor='#ffffff' onTintColor='#7ee0af' tintColor='#c9c9c9' value={this.props[filter.id]}
                    onValueChange={() => {
                      this.props.toggleFilter(filter.id);
                      this.props.filterParkspots(filter.id);
                    }
                    }/>
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
          }]}/>
        <Interactable.View
          style={styles.interactable}
          verticalOnly={true}
          dragEnabled={false}
          snapPoints={[
            {y: Screen.height - 350, id: 'open'}
          ]}
          boundaries={{top: -300}}
          initialPosition={{y: Screen.height - 350}}
          animatedValueY={this._deltaY}>
          <View style={styles.panel}>
            <Text style={additionalStyles.title}>
              Filters
            </Text>
            {this.renderFilters()}

            <View style={additionalStyles.sliderContainer}>
              <Text style={[additionalStyles.filterName]}>Distance from destination</Text>
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
            <View style={additionalStyles.closeIcon}>
              <TouchableOpacity style={{flex: 1}} onPress={() => {
                this.props.onDismiss();
              }}>
                <Image source={require('../../../assets/icons/misc/close.png')} style={{flex: 1}}/>
              </TouchableOpacity>
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
