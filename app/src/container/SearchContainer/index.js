// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import SearchScreen from '../../screens/Search';

export interface Props {
  navigation: any;
//   updateLocation: Function;
//   watchLocation: Function;
//   stopWatchLocation: Function;
//   fetchParkspots: Function;
//   parkspots: any;
//   userPosition: any;
//   watchID: Number;
}

export interface State {}

class SearchContainer extends React.Component<Props, State> {
  // componentWillUnmount() {
  //   stopWatchLocation(this.props.watchID);
  // }

  render() {
    return (
      <SearchScreen
        navigation={this.props.navigation}
        onPress={(data, details) => {
          // 'details' is provided when fetchDetails = true
          console.log(details.geometry.location);
        }}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
//     fetchParkspots: (
//       latitude: ?number,
//       longitude: ?number,
//       distance: ?number,
//     ) => {
//       dispatch(fetchParkspots(latitude, longitude, distance));
//     },
//     updateLocation: () => dispatch(updateLocation()),
//     watchLocation: () => dispatch(watchLocation()),
//     stopWatchLocation: (watchID: Number) =>
//       dispatch(stopWatchLocation(watchID)),
  };
}

const mapStateToProps = state => ({
//   parkspots: state.mapReducer.parkspots,
//   userPosition: state.mapReducer.userPosition,
//   watchID: state.mapReducer.watchID,
});
export default connect(mapStateToProps, bindAction)(SearchContainer);
