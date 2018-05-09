// @flow
import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Root} from 'native-base';
import Map from './container/MapContainer';
import SearchContainer from './container/SearchContainer';

const App = StackNavigator(
	{
		Map: {screen: Map},
		Search: { screen: SearchContainer }
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
