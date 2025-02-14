import { addEmployeModalFormSchema } from '@/src/components/form/schemas/addEmployeeModal';
import { jobTitles } from '../dropdown.js/startHiring';
import {
  addEmployeeFormTableColumn,
  addEmployeeFormTableData,
} from '../tables/hr/addEmployeeFormTable';

const form = [
  {
    title: 'Job title',
    placeholder: 'Select Job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'job_title',
    selectWithType: true,
  },
  {
    title: 'Role type',
    placeholder: 'Select Role',
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
    name: 'employment_term',
  },
  {
    title: 'Join date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joining_date',
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
    title: 'Salary',
    placeholder: 'Enter salary',
    name: 'salary',
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
        label: 'Australian dollar',
      },
      {
        label: 'Canadian dollar',
      },
      {
        label: 'Swiss franc',
      },
      {
        label: 'SAR',
      },
      {
        label: 'PKR',
      },
      {
        label: 'INR',
      },
    ],
  },
];
export const addEmployeeModalFormSteps = [
  {
    title: 'Select employee',
    countNo: 1,
    data: addEmployeeFormTableData,
    column: addEmployeeFormTableColumn,
  },
  {
    title: 'Add employee',
    countNo: 2,
    schema: addEmployeModalFormSchema,
    form: form,
  },
];
