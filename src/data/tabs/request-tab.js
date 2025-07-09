import { a11yProps } from '@/src/utils/tabs';
import {
  employeeLeaveRequestColumn,
  employeePunchRequestColumn,
  employeeWhfRequestColumn,
} from '../tables/request';
import {
  HR_LEAVE_REQUEST,
  HR_PUNCH_REQUEST,
  HR_WFH_REQUEST,
} from '@/src/services/apiService/apiEndPoints';

export const EmployeeRequestsTabs = [
  {
    label: 'Leave requests',
    prop: a11yProps(0),
    data: [],
    columns: employeeLeaveRequestColumn,
    api: HR_LEAVE_REQUEST || '',
  },
  {
    label: 'WFH requests',
    prop: a11yProps(1),
    data: [],
    columns: employeeWhfRequestColumn,
    api: HR_WFH_REQUEST || '',
  },
  {
    label: 'Punch requests',
    prop: a11yProps(2),
    data: [],
    columns: employeePunchRequestColumn,
    api: HR_PUNCH_REQUEST || '',
  },
];
