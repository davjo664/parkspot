import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Animated, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'native-base';

import styles from './styles';


export interface Props {
    parkspot: any;
}

export interface State {

}
const humanizeDistance = require('../../helper/humanizeDistance');

export class ParkspotListItem extends Component {

    render() {
        const p = this.props.parkspot;
        const distance = humanizeDistance(this.props.parkspot.dist);
        return (
            <ListItem style={styles.listContainer} onPress={() => { this.props.onPress(); }}>
                <Text style={styles.heading}>Parkspot near {p.street}</Text>
                <Text style={styles.text}>? spots are free near this area</Text>
                <Text style={styles.text}>{distance} from your current position</Text>
                <Text style={styles.text}>{p.street} {p.houseNumber}, {p.city}, {p.country}</Text>
            </ListItem>
        );
    }
}


export class Separator extends Component {
    render() {
        return (
            <View
                style={styles.line}
            />
        );
    }
}
