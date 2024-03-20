import { combineReducers } from 'redux';
import clientSlice from './clientSlice';
import contractSlice from './contractSlice';
import employeeSlice from './employeeSlice';
import homeSlice from './homeSlice';

const hrReducer = combineReducers({
  home: homeSlice,
  clients: clientSlice,
  employees: employeeSlice,
  contracts: contractSlice,
});

export { hrReducer };
