import * as Yup from 'yup';

export const timeManagementFormSchema = Yup.object({
  checkinTime: Yup.string().required('Required'),
  checkoutTime: Yup.string().required('Required'),
});
