import { combineReducers } from 'redux';
import clientSlice from './clientSlice';
import homeSlice from './homeSlice';

const hrReducer = combineReducers({
  home: homeSlice,
  clients: clientSlice,
});

export { hrReducer };
