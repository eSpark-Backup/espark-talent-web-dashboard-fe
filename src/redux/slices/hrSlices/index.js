import { combineReducers } from 'redux';
import homeSlice from './homeSlice';

const hrReducer = combineReducers({
  home: homeSlice,
});

export { hrReducer };
