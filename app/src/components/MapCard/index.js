import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Image, Text, Animated, TouchableOpacity} from 'react-native';
import Interactable from 'react-native-interactable';

import styles from './styles';

export interface Props {
    parkspot: any;
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

    render() {
        if (!this.props.parkspot)
        {
            return null;
        }

        return (
            <View style={styles.panelContainer} pointerEvents={'box-none'}>
                <Animated.View
                    pointerEvents={'box-none'}
                    style={[styles.panelContainer, {
                        backgroundColor: 'black',
                        opacity: this._deltaY.interpolate({
                            inputRange: [0, Screen.height - 100],
                            outputRange: [0.5, 0],
                            extrapolateRight: 'clamp'
                        }),
                    }]}/>
                <Interactable.View
                    style={styles.interactable}
                    verticalOnly={true}
                    snapPoints={[{y: 40},  {y: Screen.height - 150}]}
                    boundaries={{top: -300}}
                    initialPosition={{y: Screen.height - 150}}
                    animatedValueY={this._deltaY}>
                    <View style={styles.panel}>
                        <View style={styles.panelHeader}>
                            <View style={styles.panelHandle}/>
                        </View>
                        <Text style={styles.panelTitle}>
                            Lorem Ipsum Parkspot
                            <Text style={styles.panelDistance}>  10 m away</Text>
                        </Text>


                        <Text style={styles.panelSubtitle}>Fancystreet 123, Amsterdam, Netherlands</Text>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Start navigation</Text>
                            <Text style={styles.panelButtonSubtitle}>66 min, 10 km from your location</Text>
                        </View>

                        <View style={styles.moreContent}>
                            <Text>// More content lives here</Text>
                        </View>
                    </View>
                </Interactable.View>
            </View>
        );
    }
}

