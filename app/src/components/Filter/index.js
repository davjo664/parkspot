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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFilter } from './actions'

const WINDOW = Dimensions.get('window');

var filters = [{name:'electricity', icon:'ios-flash'},{name:'cost',icon:'ios-cash'},{name:'favorite',icon:'ios-star'},
                {name:'time',icon:'ios-timer'},{name:'disabled',icon:'ios-person'}]

class Filter extends Component {
    render() {  
        const filterArray = filters.map((filter) => (
            <TouchableOpacity key={filter.name} onPress={() => this.props.toggleFilter(filter.name)}>
             <View style={{ alignItems: 'center' }}>
                 <View>
                 <Icon name={this.props[filter.name] ? filter.icon : filter.icon+'-outline' } />
                 </View>
                <Text> {filter.name} </Text>
             </View>
             </TouchableOpacity>
        ));
        return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ marginTop: 10, marginBottom: 2, color: 'grey' }}>
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
    toggleFilter: Function;
	electricity: boolean;
    cost: boolean;
    favorite: boolean;
    time: boolean;
    disabled: boolean;
}

const mapStateToProps = (state) => ({
    electricity: state.filterReducer.electricity,
    cost: state.filterReducer.cost,
    favorite: state.filterReducer.favorite,
    time: state.filterReducer.time,
    disabled: state.filterReducer.disabled,
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFilter: (filterName) => dispatch(toggleFilter(filterName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
