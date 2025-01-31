import * as Yup from 'yup';
export const employeePunchRequestDataSchema = Yup.object({
  employee: Yup.string().required('Employee name is required'),
  date: Yup.string().required('Date is required'),
  punch_time: Yup.string().required('Punch time is required'),
  punch_type: Yup.string().required('Punch type is required'),
  status: Yup.string().required('Status is required'),
});

export const employeeWhfRequestDataSchema = Yup.object({
  employee_id: Yup.string().required('Employee ID is required'),
  employee_name: Yup.string().required('Employee name is required'),
  department: Yup.string().required('Department is required'),
  date: Yup.string().required('Date is required'),
  count: Yup.string().required('Count is required'),
  status: Yup.string().required('Status is required'),
});

export const employeeLeaveRequestDataSchema = Yup.object({
  employee_id: Yup.string().required('Employee ID is required'),
  employee_name: Yup.string().required('Employee name is required'),
  department: Yup.string().required('Department is required'),
  leave_type: Yup.string().required('Leave type is required'),
  count: Yup.string().required('Count is required'),
  requested_at: Yup.string().required('Requested at is required'),
  status: Yup.string().required('Status is required'),
});
