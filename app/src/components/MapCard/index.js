import React, {Component} from 'react';
import {Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import StreetView from 'react-native-streetview';

import styles from './styles';
import gradient from './../../theme/parkspotGradient';

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
  renderIcon = (state, icon, text) => {
    return state ? (
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={icon}/>
        <Text style={styles.iconText}>{text}</Text>
      </View>
    ) : null;
  };
  onSnap = (event) => {
    if (event.nativeEvent.id === 'closed') {
      this.props.parkspot = null;
      this.props.onDismiss();
    }
  };

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  render() {
    if (!this.props.parkspot) {
      return null;
    }

    const distance = humanizeDistance(this.props.parkspot.dist);

    const anyIconShown = this.props.parkspot.electricCharger || this.props.parkspot.accessible;

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
          snapPoints={[{y: 40, id: 'expanded'}, {y: Screen.height - 150, id: 'open'}, {
            y: Screen.height + 70,
            id: 'closed'
          }]}
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


            <Text
              style={styles.panelSubtitle}>{this.props.parkspot.street} {this.props.parkspot.houseNumber}, {this.props.parkspot.city}, {this.props.parkspot.country}</Text>
            <LinearGradient style={styles.panelGradient} colors={gradient.colors} start={gradient.start}
                            end={gradient.end} locations={gradient.locations}>
              <TouchableOpacity block style={[styles.panelButton, styles.buttonShadow]}
                                onPress={this.props.onStartNavigation}>
                <ImageBackground style={styles.panelImage} source={require('../../../assets/buttons/navigation.png')}>
                  <Text style={styles.panelButtonTitle}>Go there!</Text>
                </ImageBackground>
              </TouchableOpacity>
            </LinearGradient>
            (state, icon, text)

            <View style={styles.iconsContainer}>
              {this.renderIcon(this.props.parkspot.electricCharger, require('../../../assets/icons/filter/electricCharger.png'), 'Charging possible')}
              {this.renderIcon(this.props.parkspot.accessible, require('../../../assets/icons/filter/accessible.png'), 'Easily accessible')}
            </View>

            <View style={styles.streetViewContainer}>
              <StreetView
                style={[styles.streetView, {marginTop: anyIconShown ? 12 : 54}]}
                allGesturesEnabled={true}
                coordinate={{
                  'latitude': parseFloat(this.props.parkspot.lat),
                  'longitude': parseFloat(this.props.parkspot.lng),
                }}
              />
            </View>

          </View>
        </Interactable.View>
      </View>
    );
  }
}

