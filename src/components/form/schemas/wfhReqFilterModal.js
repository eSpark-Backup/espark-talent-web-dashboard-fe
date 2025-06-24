import * as Yup from 'yup';

export const wfhReqfilterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  status: Yup.string().required('Status is required'),
});
