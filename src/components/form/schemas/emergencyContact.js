import * as Yup from 'yup';

// export const emergencyContactsSchema = Yup.object({
//   name1: Yup.string().required('Required'),
//   name2: Yup.string().required('Required'),
//   relation1: Yup.string().required('Required'),
//   relation2: Yup.string().required('Required'),
//   phoneNumber1: Yup.string().required('Required'),
//   phoneNumber2: Yup.string().required('Required'),
//   phoneNumber3: Yup.string().required('Required'),
//   phoneNumber4: Yup.string().required('Required'),
// });
// export const emergencyContactsSchema = Yup.object({
//   name1: Yup.string().required('Required'),
//   name2: Yup.string().required('Required'),
//   relation1: Yup.string().required('Required'),
//   relation2: Yup.string().required('Required'),
//   // phoneNumber1: Yup.string().required('Required'),
//   // phoneNumber2: Yup.string().required('Required'),
//   phoneNumber1: Yup.object().shape({
//     phoneNumber3: Yup.string().required('Required'),
//   }),
//   phoneNumber2: Yup.object().shape({
//     phoneNumber4: Yup.string().required('Required'),
//   }),
// });
export const emergencyContactsSchema = () => {
  const baseSchema = {
    name1: Yup.string().required('Required'),
    name2: Yup.string().required('Required'),
    relation1: Yup.string().required('Required'),
    relation2: Yup.string().required('Required'),
    phoneNumber1: Yup.string().required('Required'),
    phoneNumber2: Yup.string().required('Required'),
  };

  // const dynamicSchema = fields.reduce((acc, field) => {
  //   acc[field.name] = Yup.lazy((value) => {
  //     if (value) {
  //       return Yup.string().required('Required');
  //     }

  //     if (field.name === 'phoneNumber3' || field.name === 'phoneNumber4') {
  //       return Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number');
  //     }

  //     return Yup.string();
  //   });

  //   return acc;
  // }, {});

  return Yup.object({ ...baseSchema });
};
