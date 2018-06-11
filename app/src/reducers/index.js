import {combineReducers} from 'redux';

import mapReducer from '../container/MapContainer/reducer';
import notificationsReducer from '../container/NotificationsManager/reducer';
import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';

import searchReducer from '../container/SearchContainer/reducer';
import filterReducer from '../components/FilterCard/reducer';

const config = {
  key: 'root',
  storage,
  blacklist: [],
};


export default persistCombineReducers(config, {
  mapReducer,
  notificationsReducer,
  filterReducer,
  searchReducer,
});
