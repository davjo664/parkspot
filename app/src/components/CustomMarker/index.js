import React, {Component} from 'react';
import {Marker} from 'react-native-maps';
import {Text} from 'native-base';
import {Image, ImageBackground, Platform} from "react-native";
import styles from './styles';

export interface Props {
  coordinate: Object;
  onPress: ?Function;
  identifier: String;
  isSelected: Boolean;
  isCluster: Boolean;
  label: String;
}

export default class CustomMarker extends Component {
  constructor(props) {
    super(props);
  }

  // Note: It should be possible to simply use the image property of the Marker and add a text, but centering it is weird.
  // See: https://github.com/react-community/react-native-maps/issues/832
  render() {
    const image = this.props.isCluster ? require('../../../assets/icons/map/clusterPin.png') : (this.props.isSelected ? require('../../../assets/icons/map/selectedPin.png') : require('../../../assets/icons/map/markerPin.png'));

    // Android does not seem to like ImageBackground inside a marker...
    if (Platform.OS === 'iOS') {
      <Marker key={this.props.identifier}
              coordinate={this.props.coordinate}
              onPress={this.props.onPress}>
        <ImageBackground style={[styles.pin, styles.pinShadow]}
                         source={image}>
          <Text style={styles.pinText}>{this.props.label}</Text>
        </ImageBackground>
      </Marker>
    } else {
      return (
        <Marker key={this.props.identifier}
                coordinate={this.props.coordinate}
                onPress={this.props.onPress}
                image={image}
                style={[styles.pin, styles.pinShadow, {
                  width: this.props.isSelected ? 65 : 32,
                  height: this.props.isSelected ? 58 : 32,
                }]}
                anchor={this.props.isSelected ? {x: 0.4, y: 0.7} : null}>
          <Text style={[styles.pinText, {
            fontSize: this.props.isSelected ? 18 : 20,
            marginLeft: this.props.isSelected ? -14 : 3,
            marginTop: this.props.isSelected ? -16 : 3,
          }]}>{this.props.label}</Text>
        </Marker>
      );
    }
  }
}

