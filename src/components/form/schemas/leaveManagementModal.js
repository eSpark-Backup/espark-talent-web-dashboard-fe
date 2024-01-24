import * as Yup from 'yup';

export const leaveManagementFormSchema = Yup.object({
  casualLeaves: Yup.string().required('Required'),
  sickLeaves: Yup.string().required('Required'),
  annualLeaves: Yup.string().required('Required'),
  hajjLeaves: Yup.string().required('Required'),
  paidLeaves: Yup.string().required('Required'),
  unpaidLeaves: Yup.string().required('Required'),
});
