import { jobTitles } from '../dropdown.js/startHiring';

export const addOnboardForm = [
  {
    title: 'Employee name',
    placeholder: 'Enter name',
    name: 'name',
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
    title: 'Job title',
    placeholder: 'Select',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'jobTitle',
  },
  {
    title: 'Role type',
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
    name: 'roleType',
  },
  {
    title: 'Employment term',
    placeholder: 'Select employment term',
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
    name: 'employmentTerm',
  },
  {
    title: 'Joining date',
    placeholder: 'DD/MM/YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joiningDate',
  },
  {
    title: 'Country',
    placeholder: 'Pakistan',
    name: 'country',
  },
  {
    title: 'Notice period',
    placeholder: 'Pakistan',
    name: 'noticePeriod',
  },
  {
    title: 'Salary',
    name: 'salary',
    prefixIcon: '$',
  },
  {
    title: 'Benefits',
    placeholder: 'Enter benefits',
    name: 'benefits',
  },
];
