import * as Yup from 'yup';

export const uploadPolicyFormSchema = Yup.object({
  policy_name: Yup.string().required('Required'),
  policy_doc: Yup.mixed().required('Required'),
});
