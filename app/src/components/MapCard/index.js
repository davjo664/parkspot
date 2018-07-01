import React, {Component} from 'react';
import {Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Interactable from 'react-native-interactable';
import StreetView from 'react-native-streetview';

import styles from './styles';

import {HumanizeHelper} from '../../helper/HumanizeHelper';

export interface Props {
  parkspot: any;
  onDismiss: Function;
  walkingDirections: any;
  drivingDirections: any;
  destinationName: String;
}

export interface State {
  snappedTo: string;
}

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

export default class MapCard extends Component {
  state = {
    snappedTo: 'open',
  };


  renderIcon = (state, icon, text) => {
    return state ? (
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

    if (event.nativeEvent.id === 'closed') {
      this.props.parkspot = null;
      this.props.drivingDirections = null;
      this.props.walkingDirections = null;
      this.props.destinationName = null;
      this.props.onDismiss();
    }
  };
  x;

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.height - 100);
  }

  render() {
    const distance = HumanizeHelper.humanizeDistance(this.props.parkspot.dist);

    const walkingdistance = this.props.walkingDirections ? HumanizeHelper.humanizeDistance(this.props.walkingDirections.distance) : null;
    const duration = this.props.drivingDirections ? HumanizeHelper.humanizeDuration(this.props.drivingDirections.duration * 60) : null;

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
          snapPoints={[
            {y: Screen.height + 102, id: 'closed'},
            {y: Screen.height - 102, id: 'open'},
            {y: Screen.height - 322, id: 'expanded'}
            ]}
          onSnap={this.onSnap}
          initialPosition={{y: Screen.height - 100}}
          animatedValueY={this._deltaY}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle}/>
            </View>

            <Text style={styles.panelTitle}>

              Parkspot{this.props.destinationName ? <Text> near {this.props.destinationName}</Text> :
              <Text> near {this.props.parkspot.street}</Text>}
              <Text style={styles.panelDistance}> {distance} away</Text>
            </Text>

            {duration &&
            <Text style={styles.panelSubtitle}>
              {duration}{walkingdistance && <Text> · {walkingdistance} from your destination</Text>}
            </Text>
            }

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
              {this.props.destinationName &&
              <TouchableOpacity block style={[styles.favoriteButton, styles.buttonShadow]}
                                onPress={() => console.warn('Not implemented.')}>
                <ImageBackground style={styles.buttonImage} source={require('../../../assets/buttons/favorite.png')}>
                  <Image
                    source={this.props.parkspot.favorite ? require('../../../assets/icons/favorite/white-full.png') : require('../../../assets/icons/favorite/white-empty.png')}/>
                </ImageBackground>
              </TouchableOpacity>
              }

              <TouchableOpacity block
                                style={[styles.navigationButton, styles.buttonShadow, this.props.destinationName ? {} : styles.navigationButtonFullWidth]}
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

