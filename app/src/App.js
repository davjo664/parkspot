// @flow
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Root } from 'native-base';
import Home from './container/HomeContainer';

const App = StackNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default () => (
  <Root>
    <App />
  </Root>
);
