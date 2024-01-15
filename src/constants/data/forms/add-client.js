import {
  basicInformationSchemaClient,
  securitySchemaClient,
} from '@/src/components/form/schemas/addClient';

const formElements = [
  {
    title: 'First name',
    placeholder: 'Enter first name',
    name: 'firstName',
  },
  {
    title: 'Last name',
    placeholder: 'Enter first name',
    name: 'lastName',
  },
  {
    title: 'Gender',
    placeholder: 'Select',
    name: 'gender',
    type: 'select',
    options: [
      {
        label: 'Male',
      },
      {
        label: 'Female',
      },
    ],
  },
  {
    title: 'Date of birth',
    placeholder: 'DD-MM-YYYY',
    name: 'dateOfBirth',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Phone number',
    placeholder: 'Enter phone number',
    name: 'phoneNumber',
  },
  {
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
  },
  {
    title: 'Marital status',
    placeholder: 'Select',
    name: 'maritalStatus',
    type: 'select',
    options: [
      {
        label: 'Married',
      },
      {
        label: 'Single',
      },
    ],
  },
  {
    title: 'Image',
    placeholder: 'Upload image',
    name: 'image',
    prefixIcon: 'upload',
    type: 'file',
  },
  {
    title: 'Emergency Contact',
    placeholder: 'Enter phone number',
    name: 'emergencyContact',
  },
];
const formElementsStep4 = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee id',
    name: 'employeeId',
  },
  {
    title: 'Password',
    placeholder: 'Enter password',
    name: 'password',
    type: 'password',
  },
  {
    title: 'Confirm password',
    placeholder: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
  },
];
export const formSteps = [
  {
    title: 'Basic Information',
    countNo: 1,
    schema: basicInformationSchemaClient,
    form: formElements,
  },
  {
    title: 'Security',
    countNo: 2,
    schema: securitySchemaClient,
    form: formElementsStep4,
  },
];
