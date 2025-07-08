import * as Yup from 'yup';

const empLeaveReqfilterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  status: Yup.string().required('Status is required'),
  leaveType: Yup.string().required('Leave type is required'),
});
export { empLeaveReqfilterModalSchema };
