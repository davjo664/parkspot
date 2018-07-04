// @flow
import * as React from 'react';
import {Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {clearSelectedLocation, remFavorite} from '../SearchContainer/actions';
import {addFavoriteByDescription, fetchParkspots, filterParkspots, updateLocation, updateMapPosition, deleteClosestSpotWithID, deleteClosestParkspots} from './actions';
import {subscribeToParkspot} from '../NotificationsManager/actions';

export interface Props {
  navigation: any;
  updateLocation: Function;
  fetchParkspots: Function;
  parkspots: any;
  userPosition: any;
  mapPosition: Object;
  updateMapPosition: Function;
  selectedLocation: Object;
  filterParkspots: Function;
  distanceFilterValue: Number;
  clearSelectedLocation: Function;
  addFavoriteByDescription: Function;
  remFavorite: Function;
  favorites: Object;
  user: Object;
  createSubscription: Function;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
  render() {
    return (
      <Map
        navigation={this.props.navigation}
        updateLocation={this.props.updateLocation}
        fetchParkspots={this.props.fetchParkspots}
        parkspots={this.props.parkspots}
        userPosition={this.props.userPosition}
        mapPosition={this.props.mapPosition}
        updateMapPosition={this.props.updateMapPosition}
        selectedLocation={this.props.selectedLocation}
        filterParkspots={this.props.filterParkspots}
        distanceFilterValue={this.props.distanceFilterValue}
        clearSelectedLocation={this.props.clearSelectedLocation}
        addFavoriteByDescription={this.props.addFavoriteByDescription}
        remFavorite={this.props.remFavorite}
        favorites={this.props.favorites}
        closestParkspots={this.props.closestParkspots}
        deleteClosestSpotWithID={this.props.deleteClosestSpotWithID}
        deleteClosestParkspots={this.props.deleteClosestParkspots}
        userId={this.props.user ? this.props.user.id : null}
        createSubscription={this.props.createSubscription}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchParkspots: (
      latitude: ?number,
      longitude: ?number,
      distance: ?number,
      refresh: ?Boolean,
    ) => {
      dispatch(fetchParkspots(latitude, longitude, distance, refresh));
    },
    updateLocation: (callback) => dispatch(updateLocation(callback)),
    updateMapPosition: (mapPosition) => dispatch(updateMapPosition(mapPosition)),
    filterParkspots: (filterId) => dispatch(filterParkspots(filterId)),
    clearSelectedLocation: () => dispatch(clearSelectedLocation()),
    addFavoriteByDescription: (description) => dispatch(addFavoriteByDescription(description)),
    remFavorite: (fav) => dispatch(remFavorite(fav)),
    deleteClosestSpotWithID: (id) => dispatch(deleteClosestSpotWithID(id)),
    deleteClosestParkspots: () => dispatch(deleteClosestParkspots()),
    createSubscription: (id, userId) => dispatch(subscribeToParkspot(id, userId)),
  };
}

const mapStateToProps = state => ({
  parkspots: state.mapReducer.parkspots,
  userPosition: state.mapReducer.userPosition,
  mapPosition: state.mapReducer.mapPosition,
  selectedLocation: state.searchReducer.selectedLocation,
  distanceFilterValue: state.filterReducer.distance,
  favorites: state.searchReducer.favorites,
  closestParkspots: state.mapReducer.closestParkspots,
  user: state.notificationsReducer.user,
});
export default connect(mapStateToProps, bindAction)(MapContainer);
