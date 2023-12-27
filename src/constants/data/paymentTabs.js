import { a11yProps } from '@/src/utils/tabs';

export const paymentStatusTabs = [
  {
    label: 'Pending',
    prop: a11yProps(0),
    // data: employeeTableDataHiringRequest,
    // column: employeeTableHiringRequestColumn,
  },
  {
    label: 'Processing',
    prop: a11yProps(1),
    // data: employeeTableDataInterviewSchedule,
    // column: employeeTableInterviewScheduleColumn,
  },
  {
    label: 'Paid',
    prop: a11yProps(2),
    // data: employeeTableDataOnBoarding,
    // column: employeeTableOnboardingColumn,
  },
];
