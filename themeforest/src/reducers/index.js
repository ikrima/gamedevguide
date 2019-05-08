import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  settings: settingsReducer,
  routing: routerReducer
});

export default rootReducer;
