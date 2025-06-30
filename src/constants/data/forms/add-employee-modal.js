import {
  addContractModalFormSchema,
  addEmployeModalFormSchema,
} from '@/src/components/form/schemas/addEmployeeModal';
import { jobTitles } from '../dropdown.js/startHiring';
import {
  addEmployeeFormTableColumn,
  addEmployeeFormTableData,
} from '../tables/hr/addEmployeeFormTable';

const formStep1 = [
  {
    title: 'First Name',
    placeholder: 'Enter first name',
    type: 'text',
    required: true,
    name: 'first_name',
  },
  {
    title: 'Last Name',
    placeholder: 'Enter last name',
    type: 'text',
    required: true,
    name: 'last_name',
  },
  {
    title: 'Job title',
    placeholder: 'Select Job',
    type: 'select',
    nested: true,
    required: true,
    options: jobTitles,
    name: 'job_title',
    selectWithType: true,
  },
  {
    title: 'Department',
    placeholder: 'Select department',
    type: 'select',
    required: true,
    name: 'department',
    options: [
      { label: 'Engineering' },
      { label: 'Product' },
      { label: 'Marketing' },
      { label: 'Sales' },
      { label: 'Human Resources' },
      { label: 'Finance' },
    ],
  },
  {
    title: 'Status',
    placeholder: 'Select status',
    type: 'select',
    required: true,
    name: 'status',
    options: [
      { label: 'Active' },
      { label: 'Inactive' },
      { label: 'Probation' },
      { label: 'Terminated' },
    ],
  },
  {
    title: 'External Employment ID',
    placeholder: 'Enter external ID',
    required: true,
    type: 'email',
    name: 'external_employment_id',
  },
  {
    title: 'Work Email',
    required: true,
    placeholder: 'Enter work email',
    type: 'email',
    name: 'work_email',
  },
  {
    title: 'Annual Salary',
    required: true,
    placeholder: 'Enter annual salary',
    name: 'annual_salary',
    type: 'number',
  },
];

const formStep2 = [
  {
    title: 'Employment Type',
    required: true,
    placeholder: 'Select employment type',
    defaultValue: 'Onsite',
    type: 'select',
    options: [{ label: 'Remote' }, { label: 'Hybrid' }, { label: 'Onsite' }],
    name: 'employment_type',
  },
  {
    title: 'Contract Duration',
    placeholder: 'Enter duration (in months)',
    type: 'number',
    required: true,
    name: 'contract_duration',
    suffix: 'months',
  },
  {
    title: 'Work Hours / Week',
    placeholder: 'Enter hours per week',
    type: 'number',
    required: true,
    name: 'work_hours_per_week',
    suffix: 'hrs',
  },
  {
    title: 'Days of Paid Off',
    placeholder: 'Enter number of paid days off',
    type: 'number',
    required: true,
    name: 'paid_off_days',
    suffix: 'days',
  },
  {
    title: 'Role Description',
    placeholder: 'Describe the role',
    type: 'textarea',
    required: true,
    name: 'role_description',
    rows: 4,
  },
  {
    title: 'Probation Period',
    placeholder: 'Select probation period',
    type: 'select',
    name: 'probation_period',
    required: true,
    options: Array.from({ length: 12 }, (_, i) => ({
      label: `${i + 1} month${i === 0 ? '' : 's'}`,
    })),
  },
  {
    title: 'Resume',
    required: true,
    type: 'file',
    name: 'resume',
    placeholder: 'Upload Resume',
    prefixIcon: 'upload',
    accept: '.pdf',
    filelabel: 'Accept .pdf files only',
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
    title: 'Personal details',
    countNo: 2,
    schema: addEmployeModalFormSchema,
    form: formStep1,
  },
  {
    title: 'Contract details',
    countNo: 3,
    schema: addContractModalFormSchema,
    form: formStep2,
  },
];
