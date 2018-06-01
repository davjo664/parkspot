import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Animated, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'native-base';

import styles from './styles';
import textStyles from '../../theme/parkspotStyles';


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
                <View style={styles.itemsContainer}>
                    <View style={styles.headingContainer}>
                        <Text numberOfLines={1} style={[textStyles.textStyle2, styles.truncatedText]}>Parkspot near {p.street} sdfdsfdsfsdfdsfsdf</Text>
                        <Text style={textStyles.textStyle3}>???m away</Text>
                    </View>
                    <Text style={textStyles.textStyle3}>???? spots are free near this area</Text>
                    <Text style={textStyles.textStyle3}>{distance} from your current position</Text>
                    <Text style={textStyles.textStyle3}>{p.street} {p.houseNumber}, {p.city}, {p.country}</Text>
                </View>
            </ListItem>
        );
    }
}

