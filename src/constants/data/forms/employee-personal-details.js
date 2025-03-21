import { jobTitles } from '../dropdown.js/startHiring';

export const personalDetailsForm = [
  {
    title: 'First name',
    placeholder: 'John',
    name: 'first_name',
  },
  {
    title: 'Last name',
    placeholder: 'Doe',
    name: 'last_name',
  },
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
      {
        label: 'Not specific',
      },
    ],
  },
  {
    title: 'Personal Email',
    placeholder: 'Enter personal email',
    name: 'personal_email',
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
    title: 'Phone number',
    placeholder: 'Enter phone number',
    name: 'phone_number',
    type: 'number',
  },
];

export const officialDetailsForm = [
  {
    title: 'Employee id',
    placeholder: 'John Doe',
    name: 'employee_id',
  },
  {
    title: 'Official Email',
    placeholder: 'Enter company email',
    name: 'email',
  },
  {
    title: 'Job title',
    placeholder: 'Select job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'job_title',
    selectWithType: true,
  },
  {
    title: 'Role',
    placeholder: 'Select',
    name: 'role',
    type: 'select',
    defaultValue: 'Junior',

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
  },
  {
    title: 'Joining Date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joining_date',
  },
  {
    title: 'Job Status',
    placeholder: 'Select employement Status',
    type: 'select',
    name: 'job_status',
    options: [
      {
        label: 'Internship',
      },
      {
        label: 'Probation',
      },
      {
        label: 'Part-Time',
      },
      {
        label: 'Permanent',
      },
    ],
  },
  {
    title: 'Starting Date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'starting_date',
  },
  {
    title: 'Ending Date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'ending_date',
  },
];
