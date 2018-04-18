import {combineReducers} from 'redux';

import homeReducer from '../container/HomeContainer/reducer';
import mapReducer from '../container/MapContainer/reducer'

export default combineReducers({
	homeReducer,
	mapReducer,
});
