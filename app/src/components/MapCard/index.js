import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Image, Text, Animated, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Interactable from 'react-native-interactable';

import styles from './styles';

const humanizeDistance = require('../../helper/humanizeDistance');

export interface Props {
    parkspot: any;
    onDismiss: Function;
}

export interface State {

}

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
};

export default class MapCard extends Component {
    constructor(props) {
        super(props);
        this._deltaY = new Animated.Value(Screen.height - 100);
    }

    renderIcon = (state, iconName, iconFamily, text) => {
        return state ? (
            <View style={styles.iconContainer}>
                <Icon type={iconFamily} name={iconName} style={styles.icon}/>
                <Text style={styles.iconText}>{text}</Text>
            </View>
        ) : null;
    };

    onSnap = (event) => {
        if (event.nativeEvent.id === 'closed')
        {
            this.props.parkspot = null;
            this.props.onDismiss();
        }
    };

    render() {
        if (!this.props.parkspot) {
            return null;
        }

        const distance = humanizeDistance(this.props.parkspot.dist);

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
                    snapPoints={[{y: 40, id: 'expanded'}, {y: Screen.height - 150, id: 'open'}, {y: Screen.height + 70, id: 'closed'}]}
                    onSnap={this.onSnap}
                    boundaries={{top: -300}}
                    initialPosition={{y: Screen.height - 150}}
                    animatedValueY={this._deltaY}>
                    <View style={styles.panel}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle}/>
                        </View>
                        <Text style={styles.panelTitle}>
                            Lorem Ipsum Parkspot
                            <Text style={styles.panelDistance}> {distance} away</Text>
                        </Text>


                        <Text style={styles.panelSubtitle}>{this.props.parkspot.address.street}, {this.props.parkspot.address.city}, {this.props.parkspot.address.country}</Text>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Start navigation</Text>
                            <Text style={styles.panelButtonSubtitle}>xx min, {distance} away from your location</Text>
                        </View>

                        <View style={styles.moreContent}>
                            <View style={styles.iconsContainer}>
                                {this.renderIcon(this.props.parkspot.electricCharger, "ios-flash", "Ionicons", "Charging possible")}
                                {this.renderIcon(this.props.parkspot.accessible, "accessibility", "MaterialIcons", "Easily accessible")}
                            </View>
                        </View>
                    </View>
                </Interactable.View>
            </View>
        );
    }
}

