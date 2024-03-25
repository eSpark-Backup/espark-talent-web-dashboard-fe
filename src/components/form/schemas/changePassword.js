import * as Yup from 'yup';

export const changePasswordFormSchema = Yup.object({
  current_password: Yup.string().required('Required'),
  new_password: Yup.string().required('Required'),
  confirm_password: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
});
