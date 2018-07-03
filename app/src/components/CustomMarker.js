import React, {Component} from 'react';
import {Marker} from 'react-native-maps';
import {Text} from 'native-base';
import {Image} from "react-native";


export interface Props {
  coordinate: Object;
  onPress: ?Function;
  key: String;
  isSelected: Boolean;
  isCluster: Boolean;
  label: String;
}

export default class CustomMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const image = this.props.isCluster ? require('../../assets/icons/map/clusterPin.png') : (this.props.isSelected ? require('../../assets/icons/map/selectedPin.png') : require('../../assets/icons/map/markerPin.png'));


    return (
      <Marker key={this.props.key} coordinate={this.props.coordinate} onPress={this.props.onPress} image={image}
              style={{
                width: this.props.isSelected ? 65 : 32,
                height: this.props.isSelected ? 58 : 32,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
        <Text style={{
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: 'white',
          marginLeft: this.props.isSelected ? -16 : 3,
          marginTop: this.props.isSelected ? -16 : 3,
        }}>{this.props.label}</Text>
      </Marker>
    );
  }

}

