// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Home from '../../screens/Home';
import { fetchParkspots } from './actions';
import placeholderImage from '../../screens/Home/images/placeholder_no_parkspot.jpg';

export interface Props {
  navigation: any;
  fetchParkspots: Function;
  data: Object;
  image: Object;
}
export interface State {}
class HomeContainer extends React.Component<Props, State> {
  render() {
    return (
      <Home
        navigation={this.props.navigation}
        getSpots={this.props.fetchParkspots}
        spots={this.props.data}
        image={this.props.image}
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
    image: (state.homeReducer.parkspots.length > 0 ? {uri: state.homeReducer.parkspots[0].imageURL} : placeholderImage),
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
