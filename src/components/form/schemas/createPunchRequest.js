import * as Yup from 'yup';

export const createPunchRequestSchema = Yup.object({
  date: Yup.string().required('Required'),
  expectedCheckIn: Yup.string(),
  expectedCheckOut: Yup.string(),
  punchType: Yup.string().required('Required'),
  punchTime: Yup.string().required('Required'),
  description: Yup.string(),
});
