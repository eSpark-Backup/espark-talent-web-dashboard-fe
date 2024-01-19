import * as Yup from 'yup';

export const createPunchRequestSchema = Yup.object({
  date: Yup.string().required('Required'),
  expectedCheckIn: Yup.string(),
  checkIn: Yup.string().required('Required'),
  expectedCheckOut: Yup.string(),
  checkOut: Yup.string().required('Required'),
  punchType: Yup.string().required('Required'),
  punchTime: Yup.string().required('Required'),
  description: Yup.string(),
});
