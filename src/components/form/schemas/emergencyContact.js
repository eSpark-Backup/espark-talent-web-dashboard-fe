import * as Yup from 'yup';

export const emergency_contact_schema = Yup.object().shape({
  emergency_contact: Yup.object().shape({
    primary: Yup.object().shape({
      name: Yup.string().required('Primary contact name is required'),
      relation: Yup.string().required(
        'Primary contact relationship is required'
      ),
      phone_number: Yup.number().required(
        'Primary contact phone number is required'
      ),
      phone_number2: Yup.number(),
    }),
    secondary: Yup.object().shape({
      name: Yup.string().required('Secondary contact name is required'),
      relation: Yup.string().required(
        'Secondary contact relationship is required'
      ),
      phone_number: Yup.number().required(
        'Secondary contact phone number is required'
      ),
      phone_number2: Yup.number(),
    }),
  }),
});
