import { jobTitles } from '../dropdown.js/startHiring';

export const hringRequestForm = [
  {
    title: 'Job title',
    placeholder: 'Select job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'jobTitle',
  },
  {
    title: 'Role type',
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
    title: 'Country',
    placeholder: 'Pakistan',
    name: 'country',
  },
  {
    title: 'Salary range',
    placeholder: 'Enter first name',
    name: 'salaryRange',
    type: 'input-range',
    fields: [
      {
        placeholder: '0',
        name: 'min',
        suffixIcon: '$',
      },
      {
        placeholder: '1',
        name: 'max',
        suffixIcon: '$',
      },
    ],
  },

  {
    title: 'Employment term',
    placeholder: 'Select employment term',
    name: 'employmentTerm',
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
  },
  {
    title: 'Hiring start date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiringStartDate',
  },
  {
    title: 'Hiring end date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiringEndDate',
  },
];
