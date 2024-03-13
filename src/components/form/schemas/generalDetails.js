import * as Yup from 'yup';

export const generalSettingFormSchema = Yup.object({
  email: Yup.string().required('Required'),
  image: Yup.string().required('Required'),
  companyName: Yup.string().required('Required'),
});
