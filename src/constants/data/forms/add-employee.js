import {
  basicInformationSchema,
  companyDetailsSchema,
  emergencyContactSchema,
  securitySchema,
  timeAndLeaveAllotmentSchema,
} from '@/src/components/form/schemas/addEmployee';
import { jobTitles } from '../dropdown.js/startHiring';

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
  {
    title: 'Upload resume',
    placeholder: 'Upload resume',
    name: 'uploadResume',
    prefixIcon: 'upload',
    type: 'file',
  },
];
export const formElementsStep2 = [
  {
    label: 'Primary',
    fields: [
      {
        title: 'Name',
        placeholder: 'Enter name',
        name: 'name1',
      },
      {
        title: 'Relation',
        placeholder: 'Enter relation',
        name: 'relation1',
      },
      {
        title: 'Phone number',
        placeholder: 'Enter phone number',
        name: 'phoneNumber1',
      },
    ],
  },
  {
    label: 'Seconday',
    fields: [
      {
        title: 'Name',
        placeholder: 'Enter name',
        name: 'name2',
      },
      {
        title: 'Relation',
        placeholder: 'Enter relation',
        name: 'relation2',
      },
      {
        title: 'Phone number',
        placeholder: 'Enter phone number',
        name: 'phoneNumber2',
      },
    ],
  },
];
const formElementsStep3 = [
  {
    title: 'Join date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joinDate',
  },
  {
    title: 'Designation',
    placeholder: 'Select',
    type: 'select',
    options: [
      {
        label: 'Senior',
      },
      {
        label: 'Intermediate',
      },
      {
        label: 'Junior',
      },
      {
        label: 'Intern',
      },
    ],
    name: 'designation',
  },
  {
    title: 'Deparment',
    placeholder: 'Select',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'department',
  },
  {
    title: 'Company',
    placeholder: 'Enter company',
    name: 'company',
  },
  {
    title: 'Employement terms',
    placeholder: 'Select employement terms',
    type: 'select',
    options: [
      {
        label: 'Salary based',
      },
      {
        label: 'Hourly based',
      },
      {
        label: 'Project based',
      },
    ],
    name: 'employementTerms',
  },
];
const formElementsStep4 = [
  {
    title: 'Checkin time',
    placeholder: '--:-- --',
    name: 'checkinTime',
    type: 'time',
    col: 6,
    suffixIcon: 'ClockIcon',
  },
  {
    title: 'Checkout time',
    placeholder: '--:-- --',
    name: 'checkoutTime',
    type: 'time',
    col: 6,
    suffixIcon: 'ClockIcon',
  },

  {
    title: 'Casual Leaves',
    placeholder: 'Enter password',
    name: 'casualLeaves',
    // col: 3,
    type: 'add-sub-counter',
  },
  {
    title: 'Sick Leaves',
    placeholder: '0',
    name: 'sickLeaves',
    // col: 3,
    type: 'add-sub-counter',
    defaultValue: 0,
  },
  {
    title: 'Annual Leaves',
    placeholder: '0',
    name: 'annualLeaves',
    // col: 3,
    type: 'add-sub-counter',
    defaultValue: 0,
  },
  {
    title: 'Hajj Leaves',
    placeholder: '0',
    name: 'hajjLeaves',
    // col: 3,
    type: 'add-sub-counter',
    defaultValue: 0,
  },
  {
    title: 'Paid Leaves',
    placeholder: '0',
    name: 'paidLeaves',
    // col: 3,
    type: 'add-sub-counter',
    defaultValue: 0,
  },
  {
    title: 'Unpaid Leaves',
    placeholder: '0',
    name: 'unpaidLeaves',
    // col: 3,
    type: 'add-sub-counter',
    defaultValue: 0,
  },
];
const formElementsStep5 = [
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
    schema: basicInformationSchema,
    form: formElements,
  },
  {
    title: 'Emergency contact',
    countNo: 2,
    schema: emergencyContactSchema,
    form: formElementsStep2,
    isMultiColumn: true,
  },
  {
    title: 'Company details',
    countNo: 3,
    schema: companyDetailsSchema,
    form: formElementsStep3,
  },
  {
    title: 'Time & Leaves Allotment',
    countNo: 4,
    schema: timeAndLeaveAllotmentSchema,
    form: formElementsStep4,
  },
  {
    title: 'Security',
    countNo: 5,
    schema: securitySchema,
    form: formElementsStep5,
  },
];
