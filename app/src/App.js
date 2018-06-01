// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Root} from 'native-base';
import Map from './container/MapContainer';
import SearchContainer from './container/SearchContainer';
import FavoriteContainer from './container/FavoriteContainer';
import NotificationsManager from './container/NotificationsManager';

const App = StackNavigator(
  {
    Map: {screen: Map},
    Search: {screen: SearchContainer},
    Favorites: {screen: FavoriteContainer},
  },
  {
    initialRouteName: 'Map',
    headerMode: 'none',
  },
);

export default () => (
  <Root>
    <NotificationsManager/>
    <App/>
  </Root>
);
