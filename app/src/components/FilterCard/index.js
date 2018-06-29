import React, {Component} from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Body, Left, List, ListItem, Right, Switch} from 'native-base';
import Interactable from 'react-native-interactable';
import {connect} from 'react-redux';

import {toggleFilter} from './actions';
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
            <Switch value={this.props[filter.id]} onValueChange={() => {
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
            {y: Screen.height - 280, id: 'open'}
          ]}
          boundaries={{top: -300}}
          initialPosition={{y: Screen.height - 280}}
          animatedValueY={this._deltaY}>
          <View style={styles.panel}>
            <Text style={additionalStyles.title}>
              Filters
            </Text>
            {this.renderFilters()}
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
}

const mapStateToProps = state => ({
  electricCharger: state.filterReducer.electricCharger,
  cost: state.filterReducer.cost,
  favorite: state.filterReducer.favorite,
  time: state.filterReducer.time,
  handicapped: state.filterReducer.handicapped,
});

const mapDispatchToProps = dispatch => {
  return {
    toggleFilter: filterId => {
      dispatch(toggleFilter(filterId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCard);
