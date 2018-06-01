import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Animated, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'native-base';

import styles from './styles';
import textStyles from '../../theme/parkspotStyles';


export interface Props {
    parkspot: any;
    awayFrom: String;
    inArea: String;
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
                        <Text numberOfLines={1} style={[textStyles.textStyle2, styles.truncatedText]}>Parkspot near {p.street}</Text>
                        <Text style={textStyles.textStyle3}>{this.props.awayFrom} m away</Text>
                    </View>
                    <Text style={textStyles.textStyle3}>{this.props.inArea} spots are free near this area</Text>
                    <Text style={textStyles.textStyle3}>{distance} from your current position</Text>
                    <Text style={textStyles.textStyle3}>{p.street} {p.houseNumber}, {p.city}, {p.country}</Text>
                </View>
            </ListItem>
        );
    }
}
export class PlaceListItem extends Component {

    render() {
        const p = this.props.place;
        // const distance = humanizeDistance(this.props.parkspot.dist);
        return (
            <ListItem style={styles.listContainer} onPress={() => { this.props.onPress(); }}>
                <View style={styles.itemsContainer}>
                    <View style={styles.headingContainer}>
                        <Text numberOfLines={1} style={[textStyles.textStyle2, styles.truncatedText]}>{p.structured_formatting.main_text}</Text>
                    </View>
                    <Text numberOfLines={1} style={[textStyles.textStyle3, styles.truncatedText]}>{p.structured_formatting.secondary_text}</Text>
                </View>
            </ListItem>
        );
    }
}

