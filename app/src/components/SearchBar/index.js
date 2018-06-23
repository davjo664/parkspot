import React, {Component} from 'react';
import {ActivityIndicator, Image, TextInput} from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import textStyles from '../../theme/parkspotStyles';
import styles from './styles';


export interface Props {
  onChange: Function,
  isLoading: Boolean,
  value: String,
  onFocus: Function,
}

export interface State {

}

export default class SearchBar extends Component {


  render() {
    return (
      <ElevatedView elevation={5} style={[styles.container, this.props.style]}>
        <Image
          style={styles.icon}
          source={require('../../../assets/icons/misc/search.png')}
        />
        <TextInput
          placeholder="Search for a parkspot"
          returnKeyType={'search'}
          autoFocus={true}
          value={this.props.searchString}
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          onChangeText={text => this.props.onChange(text)}
          onFocus={() => {
            this.props.onFocus ? this.props.onFocus() : null;
          }}
          style={[styles.input, textStyles.textStyle2]}
        />
        <ActivityIndicator
          animating={true}
          size="small"
          style={{marginRight: 10, display: this.props.isLoading ? 'flex' : 'none'}}
        />
      </ElevatedView>
    );
  }
}

