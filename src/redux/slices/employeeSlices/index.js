import { combineReducers } from 'redux';
import empHomeSlice from './empHomeSlice';

const empReducer = combineReducers({
  home: empHomeSlice,
});

export { empReducer };
