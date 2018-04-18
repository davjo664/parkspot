// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Map from '../../screens/Map';

export interface Props {
  navigation: any;
}
export interface State {}
class MapContainer extends React.Component<Props, State> {
  render() {
    return (
      <Map
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, bindAction)(MapContainer);
