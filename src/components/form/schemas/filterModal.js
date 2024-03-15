import * as Yup from 'yup';

export const filterModalSchema = Yup.object({
  from: Yup.string().required('Required'),
  to: Yup.string().required('Required'),
});
