export const employeePunchRequestForm = [
  {
    title: 'Employee',
    placeholder: 'Enter employee name',
    name: 'employee',
  },
  {
    title: 'Date',
    placeholder: 'DD/MM/YYYY',
    name: 'date',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Punch time',
    placeholder: 'HH:MM:SS',
    name: 'punch_time',
  },
  {
    title: 'Punch type',
    placeholder: 'Select punch type',
    name: 'punch_type',
    options: ['In', 'Out'],
    type: 'select',
  },
];

export const employeeWhfRequestForm = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee ID',
    name: 'employee_id',
  },
  {
    title: 'Employee name',
    placeholder: 'Enter employee name',
    name: 'employee_name',
  },
  {
    title: 'Department',
    placeholder: 'Enter department',
    name: 'department',
  },
  {
    title: 'Date',
    placeholder: 'DD/MM/YYYY',
    name: 'date',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Count',
    placeholder: 'Enter count',
    name: 'count',
  },
];

export const employeeLeaveRequestForm = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee ID',
    name: 'employee_id',
  },
  {
    title: 'Employee name',
    placeholder: 'Enter employee name',
    name: 'employee_name',
  },
  {
    title: 'Department',
    placeholder: 'Enter department',
    name: 'department',
  },
  {
    title: 'Leave type',
    placeholder: 'Select leave type',
    name: 'leave_type',
    options: ['Sick Leave', 'Annual Leave', 'Maternity Leave'],
    type: 'select',
  },
  {
    title: 'Count',
    placeholder: 'Enter count',
    name: 'count',
  },
  {
    title: 'Requested at',
    placeholder: 'DD/MM/YYYY',
    name: 'requested_at',
    suffixIcon: 'calender',
    type: 'date',
  },
];
