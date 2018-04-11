// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Home from '../../screens/Home';
import { fetchParkspots } from './actions';

export interface Props {
  navigation: any;
  fetchParkspots: Function;
  data: Object;
}
export interface State {}
class HomeContainer extends React.Component<Props, State> {
  render() {
    return (
      <Home
        navigation={this.props.navigation}
        getSpots={this.props.fetchParkspots}
        spots={this.props.data}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchParkspots: () => dispatch(fetchParkspots()),
  };
}

const mapStateToProps = state => ({
  data: state.homeReducer.parkspots,
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
