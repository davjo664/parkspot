// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Root} from 'native-base';
import Home from './container/HomeContainer';
import Map from './container/MapContainer';

const App = StackNavigator(
	{
		Home: {screen: Home},
		Map: {screen: Map},
	},
	{
		initialRouteName: 'Map',
		headerMode: 'none',
	},
);

export default () => (
	<Root>
		<App/>
	</Root>
);
