import * as Yup from 'yup';

export const timeManagementFormSchema = Yup.object({
  check_in: Yup.string().required('Required'),
  check_out: Yup.string().required('Required'),
});
