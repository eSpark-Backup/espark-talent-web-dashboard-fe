// constants/employeeFields.js
import dayjs from 'dayjs';

export const fallbackMember = {
  employee_name: 'Syed Hasni',
  country: 'Pakistan',
  profileImage: '/icons/Ellipse 14.svg',
  joining_date: dayjs().format('DD-MMMM-YYYY'),
  status: 'onBoard',
  job_title: 'Frontend Developer',
  department: 'Engineering',
  employment_status: 'Active',
  external_employment_id: 'syedhasni@gmail.com',
  work_email: 'syedhasni@esparkconsultants.com',
  annual_salary: '800k',
  employee_type: 'Probation',
  contract_duration: '2 months',
  work_hours_per_week: '46',
  days_paid_off: '20',
  role_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  location: 'Karachi, Pakistan',
  sidebar_email: 'syedhasni@esparkconsultants.com',
  probation_period: 'Active',
};

export const employeeProfileDetails = [
  { label: 'Job Title', value: fallbackMember.job_title },
  { label: 'Department', value: fallbackMember.department },
  { label: 'Status', value: fallbackMember.employment_status },
  {
    label: 'External Employment ID',
    value: fallbackMember.external_employment_id,
  },
  { label: 'Work Email', value: fallbackMember.work_email },
  { label: 'Annual Salary', value: fallbackMember.annual_salary },
];

export const employeeContractDetails = [
  { label: 'Employee Type', value: fallbackMember.employee_type },
  { label: 'Contract Duration', value: fallbackMember.contract_duration },
  { label: 'Work Hours per Week', value: fallbackMember.work_hours_per_week },
  { label: 'Days of Paid OFF', value: fallbackMember.days_paid_off },
  { label: 'Role Description', value: fallbackMember.role_description },
];

export const employeeSidebarDetails = [
  { label: 'Employment Status:', value: fallbackMember.employment_status },
  { label: 'Location:', value: fallbackMember.location },
  { label: 'Department:', value: fallbackMember.department },
  { label: 'Email:', value: fallbackMember.sidebar_email, editable: true },
  { label: 'Probation Period:', value: fallbackMember.probation_period },
];
