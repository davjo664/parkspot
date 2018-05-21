// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import FavoriteScreen from '../../screens/Favorite';
import {} from './actions';

export interface Props {
  navigation: any;
}

export interface State {}

class FavoriteContainer extends React.Component<Props, State> {
  render() {
    return <FavoriteScreen navigation={this.props.navigation} />;
  }
}

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, bindAction)(FavoriteContainer);
