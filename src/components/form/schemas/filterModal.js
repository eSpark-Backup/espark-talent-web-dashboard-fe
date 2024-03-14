import * as Yup from 'yup';

export const filterModalSchema = Yup.object({
  status: Yup.string().required('Required'),
  from: Yup.string().required('Required'),
  to: Yup.string().required('Required'),
  checkinTime1: Yup.mixed().required('Required'),
  checkinTime2: Yup.mixed().required('Required'),
  checkoutTime1: Yup.mixed().required('Required'),
  checkoutTime2: Yup.mixed().required('Required'),
});
