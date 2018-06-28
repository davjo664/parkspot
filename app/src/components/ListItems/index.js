import React, {Component} from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from 'native-base';

import styles from './styles';
import textStyles from '../../theme/parkspotStyles';


export interface Props {
  parkspot: any;
  awayFrom: String;
  inArea: String;
}

export interface State {

}


export class PlaceListItem extends Component {

  render() {
    const p = this.props.place;
    // const distance = HumanizeHelper.humanizeDistance(this.props.parkspot.dist);
    return (
      <ListItem style={styles.listContainer} onPress={() => {
        this.props.onPress();
      }}>
        <View style={styles.itemsContainer}>
          <View style={styles.headingContainer}>
            <Text numberOfLines={1}
                  style={[textStyles.textStyle2, styles.truncatedText]}>{p.structured_formatting.main_text}</Text>
          </View>
          <Text numberOfLines={1}
                style={[textStyles.textStyle3, styles.truncatedText]}>{p.structured_formatting.secondary_text}</Text>
        </View>
        <TouchableOpacity
          key={p.id}
          onPress={() => {
            if (p.favorite) {
              this.props.remFavorite();
            } else {
              this.props.addFavorite();
            }
          }}
        >
          <Image
            source={p.favorite ? require('../../../assets/icons/favorite/full.png') : require('../../../assets/icons/favorite/empty.png')}/>
        </TouchableOpacity>
      </ListItem>
    );
  }
}
