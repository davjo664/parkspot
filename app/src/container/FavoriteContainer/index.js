// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import FavoriteScreen from '../../screens/Favorite';
import { addFavourite } from './actions';
import { remFavourite } from './actions';


export interface Props {
  navigation: any;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
}

export interface State { }

class FavoriteContainer extends React.Component<Props, State> {

  render() {
    return <FavoriteScreen
      parkspots={this.props.parkspots}
      navigation={this.props.navigation}
      favourites={this.props.favourites}
      addFavourite={this.props.addFavourite}
      remFavourite={this.props.remFavourite}
    />;
  }
}


function bindAction(dispatch) {
  return {
    addFavourite: (
      newFav: ?Object,
    ) => {
      dispatch(addFavourite(newFav));
    },
    remFavourite: (
      remFav: ?Object,
    ) => {
      dispatch(remFavourite(remFav));
    },
  };
}

const mapStateToProps = state => {
  return ({
    parkspots: state.mapReducer.parkspots,
    favourites: state.favReducer.favourites,
  });
};
export default connect(mapStateToProps, bindAction)(FavoriteContainer);
