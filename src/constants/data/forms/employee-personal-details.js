import { jobTitles } from '../dropdown.js/startHiring';

export const personalDetailsForm = [
  {
    title: 'Employee name',
    placeholder: 'John Doe',
    name: 'employee_name',
  },
  {
    title: 'Joining Date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joining_date',
  },
  // {
  //   title: 'Employee ID',
  //   placeholder: 'eS000020',
  //   name: 'employee_id',
  // },
  {
    title: 'Birth Date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'dob',
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
    title: 'Marital status',
    placeholder: 'Select',
    name: 'marital_status',
    type: 'select',
    defaultValue: 'Married',
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
    title: 'Role',
    placeholder: 'Select role',
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
    name: 'roleType',
  },
  {
    title: 'Job title',
    placeholder: 'Select job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'job_title',
  },
];
