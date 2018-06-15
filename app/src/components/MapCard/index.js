import React, {Component} from 'react';
import {Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Interactable from 'react-native-interactable';
import StreetView from 'react-native-streetview';

import styles from './styles';

const humanizeDistance = require('../../helper/humanizeDistance');

export interface Props {
  parkspot: any;
  onDismiss: Function;
}

export interface State {
  snappedTo: string;
}

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

export default class MapCard extends Component {
  renderIcon = (state, icon, text) => {
    return state || true ? (
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={icon}/>
        <Text style={styles.iconText}>{text}</Text>
      </View>
    ) : null;
  };

  onSnap = (event) => {
    this.setState({
      snappedTo: event.nativeEvent.id,
    });

    if (this.state.snappedTo === 'closed') {
      this.props.parkspot = null;
      this.props.onDismiss();
    }
  };

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  componentDidMount() {
    this.setState({
      snappedTo: 'open',
    });
  }

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
              inputRange: [Screen.height - 302, Screen.height - 102],
              outputRange: [0.5, 0],
              extrapolateRight: 'clamp'
            }),
          }]}/>
        <Interactable.View
          style={styles.interactable}
          verticalOnly={true}
          snapPoints={[{y: Screen.height + 250, id: 'closed'}, {
            y: Screen.height - 102,
            id: 'open'
          }, {y: Screen.height - 302, id: 'expanded'}]}
          onSnap={this.onSnap}
          initialPosition={{y: Screen.height - 100}}
          animatedValueY={this._deltaY}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle}/>
            </View>

            <Text style={styles.panelTitle}>
              Parkspot near XXX
              <Text style={styles.panelDistance}> {distance} away</Text>
            </Text>

            <Text style={styles.panelSubtitle}>
              x h yy min · zzz m from your destination
            </Text>

            <Text style={styles.panelSubtitle}>
              {this.props.parkspot.street} {this.props.parkspot.houseNumber}, {this.props.parkspot.city}, {this.props.parkspot.country}
            </Text>

            {this.state.snappedTo === 'expanded' &&
            <View style={styles.iconsContainer}>
              {this.renderIcon(this.props.parkspot.electricCharger, require('../../../assets/icons/filter/electricCharger.png'), 'Electric charger')}
              {this.renderIcon(this.props.parkspot.accessible, require('../../../assets/icons/filter/accessible.png'), 'Handicapped parking')}
              {this.renderIcon(this.props.parkspot.noCost, require('../../../assets/icons/filter/nomoney.png'), 'Free Parking')}
              {this.renderIcon(this.props.parkspot.unlimited, require('../../../assets/icons/filter/clock.png'), 'Unlimited parking time')}
            </View>
            }

            {this.state.snappedTo === 'expanded' &&
            <View style={styles.streetViewContainer}>
              <StreetView
                style={styles.streetView}
                allGesturesEnabled={true}
                coordinate={{
                  'latitude': parseFloat(this.props.parkspot.lat),
                  'longitude': parseFloat(this.props.parkspot.lng),
                }}
              />
            </View>
            }

            <View style={styles.buttonContainer}>
              <TouchableOpacity block style={[styles.favoriteButton, styles.buttonShadow]}
                                onPress={() => console.warn("Not implemented.")}>
                <ImageBackground style={[styles.buttonImage, {backgroundColor: 'deeppink'}]}>
                  <Image
                    source={this.props.parkspot.favorite ? require('../../../assets/icons/favorite/white-full.png') : require('../../../assets/icons/favorite/white-empty.png')}/>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity block style={[styles.navigationButton, styles.buttonShadow]}
                                onPress={this.props.onStartNavigation}>
                <ImageBackground style={styles.buttonImage} source={require('../../../assets/buttons/navigation.png')}>
                  <Text style={styles.panelButtonTitle}>Go there!</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Interactable.View>
      </View>
    );
  }
}

