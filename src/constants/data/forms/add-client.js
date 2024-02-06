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
    title: 'Company name',
    placeholder: 'Enter company name',
    name: 'companyName',
  },
  {
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
  },
  {
    title: 'Phone number',
    placeholder: 'Enter phone number',
    name: 'phoneNumber',
  },
  {
    title: 'Join date',
    placeholder: 'DD-MM-YYYY',
    name: 'joinOfDate',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Country',
    placeholder: 'Select',
    name: 'country',
    type: 'select',
    searchable: true,
  },
  {
    title: 'Address',
    placeholder: 'Enter company name',
    name: 'address',
  },
  {
    title: 'Image',
    placeholder: 'Upload image',
    name: 'image',
    prefixIcon: 'upload',
    type: 'file',
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
