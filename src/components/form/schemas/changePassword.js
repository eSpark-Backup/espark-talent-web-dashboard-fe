import * as Yup from 'yup';

export const changePasswordFormSchema = Yup.object({
  currentPassowrd: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
  confirmNewPassowrd: Yup.string().required('Required'),
});
