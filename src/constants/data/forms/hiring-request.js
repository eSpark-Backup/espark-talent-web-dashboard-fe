import { jobTitles } from '../dropdown.js/startHiring';

export const hringRequestForm = [
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
    name: 'role_type',
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
    title: 'Country',
    placeholder: 'Select country',
    name: 'country',
    type: 'select',
    searchable: true,
    withFlag: true,
  },
  {
    title: 'Salary Currency',
    placeholder: 'Select currency',
    name: 'salary_currency',
    type: 'select',
    options: [
      {
        label: '$ U.S. dollar',
      },
      {
        label: '€ Euro',
      },
      {
        label: '¥ Japanese yen',
      },
      {
        label: '£ Sterling',
      },
      {
        label: 'Renminbi',
      },
      {
        label: 'Autralian dollar',
      },
      {
        label: 'Canadian dollar',
      },
      {
        label: 'Swiss franc',
      },
      {
        label: 'PKR',
      },
      {
        label: 'INR',
      },
    ],
  },
  {
    title: 'Salary range',
    placeholder: 'Enter first name',
    name: 'salary_range',
    type: 'input-range',
    fields: [
      {
        placeholder: 'from',
        name: 'minimum',
      },
      {
        placeholder: 'to',
        name: 'maximum',
      },
    ],
  },

  {
    title: 'Employment term',
    placeholder: 'Select employment term',
    name: 'employment_term',
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
    placeholder: 'DD/MM/YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiring_start_date',
  },
  {
    title: 'Hiring end date',
    placeholder: 'DD/MM/YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiring_end_date',
  },
  {
    title: 'Job Description',
    placeholder: 'Upload File',
    prefixIcon: 'upload',
    type: 'file',
    name: 'job_description',
    filelabel: 'Accept .pdf file only',
    accept: '.pdf',
    col: 2.5,
  },
  {
    title: 'Comments',
    placeholder: 'Write here..',
    type: 'text',
    name: 'description',
  },
];
