import * as Yup from 'yup';

export const generalSettingFormSchema = Yup.object({
  picture: Yup.mixed().required('Required'),
  email: Yup.string().required('Required'),
  companyName: Yup.string().required('Required'),
});

export const pictureSchema = Yup.object({
  picture: Yup.mixed().required('Required'),
});
