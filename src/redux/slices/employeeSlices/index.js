import { combineReducers } from 'redux';
import empHomeSlice from './empHomeSlice';
import leaveReqSlice from './leaveRequestSlice';
import contractSlice from './contractSlice';
import timeSheetSlice from './timeSheetSlice';

const empReducer = combineReducers({
  home: empHomeSlice,
  leaveReq: leaveReqSlice,
  contract: contractSlice,
  timeSheet: timeSheetSlice,
});

export { empReducer };
