import { combineReducers } from 'redux';
import hiringProgressSlice from './hiringProgressSlice';
import homeSlice from './homeSlice';
import teamMembersSlice from './teamMembersSlice';
import timeOffSlice from './timeOffSlice';

const clientReducer = combineReducers({
    hiringProgress: hiringProgressSlice,
    home: homeSlice,
    teamMembers: teamMembersSlice,
    timeOff: timeOffSlice
});

export { clientReducer };
