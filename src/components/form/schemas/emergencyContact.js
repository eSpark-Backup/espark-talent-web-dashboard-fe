import * as Yup from 'yup';

export const emergencyContactsSchema = Yup.object({
  name1: Yup.string().required('Required'),
  name2: Yup.string().required('Required'),
  relation1: Yup.string().required('Required'),
  relation2: Yup.string().required('Required'),
  phoneNumber1: Yup.string().required('Required'),
  phoneNumber2: Yup.string().required('Required'),
  phoneNumber3: Yup.string().required('Required'),
  phoneNumber4: Yup.string().required('Required'),
  image: Yup.string().required('Required'),
});
