import React, {Component} from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, List, ListItem, Switch, Left, Right, Body, Container, Content} from 'native-base';
import Interactable from 'react-native-interactable';
import {connect} from 'react-redux';

import {toggleFilter} from './actions';
import styles from '../MapCard/styles';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

const filters = [
  {name: 'Electric charger', id: 'electricCharger', icon: 'flash'},
  {name: 'Free parking', id: 'cost', icon: 'money'},
  {name: 'Unlimited parking time', id: 'time', icon: 'clock-o'},
  {name: 'Handicap parking', id: 'handicapped', icon: 'wheelchair'},
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
  }

  renderFilters() {
    const filterItems = filters.map((filter) => {
      return (
        <ListItem key={filter.id} icon>
          <Left>
            <Icon style={{width:34, textAlign:'center'}} name={filter.icon} type={'FontAwesome'} />
          </Left>
          <Body>
            <Text>{filter.name}</Text>
          </Body>
          <Right>
            <Switch value={this.props[filter.id]} onValueChange={() => {
                  this.props.toggleFilter(filter.id);
                  this.props.filterParkspots(filter.id);
                }
              } />
          </Right>
        </ListItem>
      )
    })
    return (
      <List>
        {filterItems}
      </List>
    )
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
          snapPoints={[{y: Screen.height - 230, id: 'open'}, {
            y: Screen.height + 70,
            id: 'closed'
          }]}
          onSnap={this.onSnap}
          boundaries={{top: -300}}
          initialPosition={{y: Screen.height - 230}}
          animatedValueY={this._deltaY}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle}/>
            </View>
            <Text style={styles.panelTitle}>
              Filters
            </Text>
            {this.renderFilters()}
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