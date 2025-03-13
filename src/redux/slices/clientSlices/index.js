import { combineReducers } from 'redux';
import hiringProgressSlice from './hiringProgressSlice';
import homeSlice from './homeSlice';
import invoicePaymentsSlice from './invoicePaymentsSlice';
import policiesSlice from './policiesSlice';
import guidesSlice from './guidesSlice';
import teamMembersSlice from './teamMembersSlice';
import timeOffSlice from './timeOffSlice';
import timeTrackingSlice from './timeTrackingSlice';
import contratSignedSlice from './contratSignedSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: [
    'home',
    'hiringProgress',
    'teamMembers',
    'timeOff',
    'timeTracking',
    'invoicePayments',
    'policies',
    'guides',
    'contract',
  ],
  storage,
  whitelist: ['home'],
};

const clientReducer = persistReducer(
  persistConfig,
  combineReducers({
    hiringProgress: hiringProgressSlice,
    home: homeSlice,
    teamMembers: teamMembersSlice,
    timeOff: timeOffSlice,
    timeTracking: timeTrackingSlice,
    invoicePayments: invoicePaymentsSlice,
    policies: policiesSlice,
    guides: guidesSlice,
    contract: contratSignedSlice,
  })
);

export { clientReducer };
