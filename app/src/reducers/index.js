import { combineReducers } from 'redux';

import mapReducer from '../container/MapContainer/reducer';
import notificationsReducer from '../container/NotificationsManager/reducer';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';


const config = {
	key: 'root',
	storage,
	blacklist: ['mapReducer'],
};


export default persistCombineReducers(config, {
	mapReducer,
	notificationsReducer,
});
