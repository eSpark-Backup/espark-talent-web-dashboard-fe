import * as Yup from 'yup';

const wfhReqfilterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  status: Yup.string().required('Status is required'),
});

export { wfhReqfilterModalSchema };
