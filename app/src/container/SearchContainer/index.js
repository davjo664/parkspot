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
        minLength={2} // minimum length of text to search
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        onPress={(data, details) => {
          // 'details' is provided when fetchDetails = true
          console.log(details.geometry.location);
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBtDPqZtRAMenSwz32oIUWWf1i_Gnub1dc',
          language: 'en', // language of the results
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
