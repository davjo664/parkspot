import {combineReducers} from 'redux';

import mapReducer from '../container/MapContainer/reducer'
import favReducer from '../container/FavoriteContainer/reducer'

export default combineReducers({
	mapReducer,
	favReducer,
});


