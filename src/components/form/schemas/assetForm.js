import * as Yup from 'yup';

export const assetFormSchema = Yup.object({
  gadget: Yup.string().required('Required'),
  asset_id: Yup.string().required('Required'),
  assigned_date: Yup.string().required('Required'),
  assignee_name: Yup.string().required('Required'),
  assignee_email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});
