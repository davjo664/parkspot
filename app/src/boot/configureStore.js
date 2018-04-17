// @flow
// import { AsyncStorage } from "react-native";
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from '../reducers';

export default function configureStore(onCompletion: () => void): any {
  const composeEnhancers = composeWithDevTools({ realtime: true, port: 5678 });

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  persistStore(store, onCompletion);

  return store;
}
