import { combineReducers } from 'redux';

import mapReducer from '../container/MapContainer/reducer'
import searchReducer from '../container/SearchContainer/reducer'
import filterReducer from '../components/Filter/reducer'
import favReducer from '../container/FavoriteContainer/reducer'

export default combineReducers({
	mapReducer,
	searchReducer,
	filterReducer,
	favReducer,
})