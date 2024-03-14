import { combineReducers } from 'redux';
import empHomeSlice from './empHomeSlice';
import leaveReqSlice from './leaveRequestSlice';
import contractSlice from './contractSlice';
import timeSheetSlice from './timeSheetSlice';
import punchReqSlice from './punchRequestSlice';
import empPoliciesSlice from './empPoliciesSlice';

const empReducer = combineReducers({
  home: empHomeSlice,
  leaveReq: leaveReqSlice,
  contract: contractSlice,
  timeSheet: timeSheetSlice,
  punchReq: punchReqSlice,
  policies: empPoliciesSlice,
});

export { empReducer };
