import { combineReducers } from 'redux';
import empHomeSlice from './empHomeSlice';
import leaveReqSlice from './leaveRequestSlice';

const empReducer = combineReducers({
  home: empHomeSlice,
  leaveReq: leaveReqSlice,
});

export { empReducer };
