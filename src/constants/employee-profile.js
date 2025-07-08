import { a11yProps } from '@/src/utils/tabs';

export const employeeProfileData = {
  downloadResume: 'Download resume',
  editCredentials: 'Edit credentials',
  personalInformation: 'Personal information',
  officialDetails: 'Official Details',
  personalDetails: 'Personal Details',
  emergencyContact: 'Emergency contact',
  profile: 'Profile',
  employees: 'Employees',
  name: 'John Doe',
  id: 'Employee ID: es-00020',
  designation: ' Web developer',
  primary: 'Primary',
  secondary: 'Secondary',
  acceptImage: 'image/',
  invalidFile: 'Invalid file type.Please select an image.',
  employeeId: 'Employee ID',
  refreshBtn: 'Refresh',
  filterBtn: 'Filter',
  addAsset: 'Add asset',
  addBenefit: 'Add benefit',
  addLetter: 'Add letter',
  addSalary: 'Add salary',
  loading: ' Loading...',
  employeeNotfound: ' Employee not found',
  noidFound: 'No Employee Found',
  client: 'Client',
  attendanceReports: 'Attendance reports',
  valueOne: 'one',
  valueTwo: 'two',
  valuethree: 'three',
  valueFour: 'four',
  valueFive: 'five',
  valueSix: 'six',
  valueSeven: 'seven',
  valueEight: 'eight',
  valueNine: 'nine',
  select: ' Select',
  save: 'Save',
  addEmployee: 'Add employee',
};

export const EDIT_MODAL = {
  editProfile: 'Edit profile picture',
  addassetForm: 'Add Asset',
  editassetForm: 'Edit Asset',
  addbenefitForm: 'Add Benefit',
  addletterForm: 'Add Letter',
  addsalaryForm: 'Add Salary',
  editbenefitForm: 'Edit Benefit',
  editletterForm: 'Edit Letter',
  editsalaryForm: 'Edit Salary',
  viewLeaveRequest: 'View Leave Request',
  ViewPunchRequest: 'View Punch Request',
  viewWfhRequest: 'View WFH Request',
  remove: 'Remove',
  change: 'Change',
  employeeId: 'Employee ID',
  newPassword: 'New password',
  currentPassword: 'Current password',
  confirmPassword: 'Confirm password',
  id: 'eS000020',
  enterPassword: 'Enter current password',
  enternewPassword: 'Enter new password',
  save: 'Save',
  editEmergencyContacts: 'Edit emergency contacts',
  editEmployeeCredentials: 'Edit employee credentials',
  name: 'Name',
  namePlaceholder: 'John Doe',
  relationship: 'Relationship',
  father: 'Father',
  phone: 'Phone',
  mobileNo: '0330012378',
  phoneNo: '090078601',
  primaryContact: 'Primary Contact',
  secondaryContact: 'Secondary Contact',
  editPersonalDetails: 'Edit personal informations',
  editOfficialDetails: 'Edit official informations',
  employeeName: 'Employee name',
  birthDate: 'Birth Date',
  email: 'Email',
  emailPlaceholder: 'johndoe@1123.com',
  jobTitle: 'Job title',
  maritalStatus: 'Marital status',
  gender: 'Gender',
  team: 'Team',
  joiningDate: 'Joining date',
  gadgetName: 'Gadget name',
  gadgetPlaceholder: 'Enter gadget name',
  assetID: 'Asset ID',
  assetidPlaceholder: 'Enter asset ID',
  assignedDate: 'Assigned date',
  assigneeName: 'Assignee name',
  assignnamePlacholder: 'Enter assignee name',
  assignedEmail: 'Assigned email',
  assignedemailPlaceholder: ' Enter assignee email',
  assigneePicture: 'Assignee picture',
  uploadPicture: 'Upload picture',
  submit: 'Submit',
};

export const employeeDataLabel = [
  { label: 'Employee name', value: 'John Doe', name: 'employee_name' },
  { label: 'Employee ID', value: '090078601', name: 'employee_id' },
  { label: 'Birth date', value: 'January 1, 1990', name: 'dob', type: 'date' },
  { label: 'Gender', value: 'Male', name: 'gender' },
  { label: 'Email', value: 'johndoe@123.com', name: 'email' },
  { label: 'Job title', value: 'Web developer', name: 'job_title' },
  { label: 'Role', value: 'Senior', name: 'role' },
  {
    label: 'Joining date',
    value: '26/01/23',
    name: 'joining_date',
    type: 'date',
  },
  { label: 'Marital status', value: 'Married', name: 'marital_status' },
];

export const employeePersonalDataLabel = [
  {
    label: 'First Name ',
    value: 'John Doe',
    name: 'first_name',
  },
  {
    label: 'Last Name ',
    value: 'John Doe',
    name: 'last_name',
  },
  { label: 'Birth date', value: 'January 1, 1990', name: 'dob', type: 'date' },
  { label: 'Gender', value: 'Male', name: 'gender' },
  { label: 'Personal Email', value: 'johndoe@123.com', name: 'personal_email' },
  { label: 'Marital status', value: 'Married', name: 'marital_status' },
  { label: 'Phone number', value: '+92 03192013292', name: 'phone_number' },
];

export const employeeOfficialDataLabel = [
  { label: 'Employee ID', value: '090078601', name: 'employee_id' },
  { label: 'Official Email', value: 'johndoe@123.com', name: 'email' },
  { label: 'Job title', value: 'Web developer', name: 'job_title' },
  { label: 'Role', value: 'Senior', name: 'role' },
  { label: 'Status', value: 'Permenent', name: 'status' },
  {
    label: 'Starting date',
    value: 'January 1, 1990',
    name: 'probation_started',
    type: 'date',
  },
  {
    label: 'Ending date',
    value: 'January 1, 1990',
    name: 'probation_ended',
    type: 'date',
  },
  {
    label: 'Joining date',
    value: 'January 1, 1990',
    name: 'joining_date',
    type: 'date',
  },
];

export const emergencyContact = [
  { label: 'Name', value: 'John Doe', name: 'name' },
  { label: 'Relationship', value: 'Father', name: 'relation' },
  { label: 'Phone', value: '03323883838', name: 'phone_number' },
];

export const employeeProfileDetails = [
  {
    employeeId: 12222,
    employeeName: 'Bilal Ahmed Khan',
    birthDate: 'January 1, 1997',
    gender: 'Male',
    team: 'Web development',
    designation: 'Web developer',
    joiningDate: '26/01/21',
    maritalStatus: 'single',
  },
  {
    employeeId: 12223,
    employeeName: 'Muzamil Ali',
    birthDate: 'January 1, 1996',
    gender: 'Male',
    team: 'Web development',
    designation: 'Web developer',
    joiningDate: '25/05/21',
    maritalStatus: 'single',
  },
];

export const employeesTabs = [
  {
    label: 'Public',
    prop: a11yProps(0),
  },
  {
    label: 'Client',
    prop: a11yProps(1),
  },
  {
    label: 'Attendance reports',
    prop: a11yProps(2),
  },
  {
    label: 'Assets',
    prop: a11yProps(3),
  },
  {
    label: 'Benefits',
    prop: a11yProps(4),
  },
  {
    label: 'Letters',
    prop: a11yProps(5),
  },
  {
    label: 'Salary',
    prop: a11yProps(6),
  },
  {
    label: 'Requests',
    prop: a11yProps(7),
  },
];

export const MARITAL_STATUS = [
  {
    label: 'Single',
    value: 'Single',
  },
  {
    label: 'Married',
    value: 'Married',
  },
];

export const ASSET_TABLECOLUMN = [
  {
    title: 'Gadget',
    flex: 2,
    name: 'gadget',
  },
  {
    title: 'Asset ID',
    flex: 2,
    name: 'asset_id',
  },
  {
    title: 'Assigned date',
    flex: 2,
    name: 'assigned_date',
  },
  {
    title: 'Assignee',
    flex: 2,
    name: 'assignee_name',
  },
  {
    title: 'Action',
    flex: 2,
    name: 'action',
  },
];

export const LETTERS_TABLECOLUMN = [
  {
    title: 'Objective',
    flex: 2,
    name: 'objective',
  },
  {
    title: 'Issue date',
    flex: 2,
    name: 'issue_date',
  },
  {
    title: 'Download',
    flex: 2,
    name: 'download',
  },
];

export const HR_EMP_LETTERS_TABLECOLUMN = [
  {
    title: 'Objective',
    flex: 2,
    name: 'objective',
  },
  {
    title: 'Date',
    flex: 2,
    name: 'issue_date',
  },
  {
    title: 'Reason',
    flex: 2,
    name: 'reason',
  },
  {
    title: 'Download',
    flex: 2,
    name: 'download',
  },
  {
    title: 'Action',
    flex: 2,
    name: 'action',
  },
];

export const BENEFITS_TABLECOLUMN = [
  {
    title: 'Benefits',
    flex: 2,
    name: 'benefit',
  },
  {
    title: 'Card ID',
    flex: 2,
    name: 'card_id',
  },
  {
    title: 'Issue date',
    flex: 2,
    name: 'issue_date',
  },
  {
    title: 'Description',
    flex: 2,
    name: 'description',
  },
  {
    title: 'Action',
    flex: 2,
    name: 'action',
  },
];

export const SALARY_TABLECOLUMN = [
  {
    title: 'Job Status',
    flex: 2,
    name: 'job_status',
  },
  {
    title: 'Gross Salary(Rs)',
    flex: 2,
    name: 'gross_salary',
  },
  {
    title: 'Tax Deduction(%)',
    flex: 2,
    name: 'tax_deduction',
  },
  {
    title: 'Net Salary(Rs)',
    flex: 2,
    name: 'net_salary',
  },
  {
    title: 'Date',
    flex: 2,
    name: 'date',
  },
  {
    title: 'Pay_slip',
    flex: 2,
    name: 'pay_slip',
  },
  {
    title: 'Action',
    flex: 2,
    name: 'action',
  },
];

export const SALARY_SAMPLE_DATA = [
  {
    id: 8,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '90,000',
    tax_deduction: '10%',
    net_salary: '81,000',
    issue_date: '26 February,2024',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 6,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '50,000',
    tax_deduction: '10%',
    net_salary: '45,000',
    issue_date: '26 January,2024',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 6,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '50,000',
    tax_deduction: '10%',
    net_salary: '45,000',
    issue_date: '26 January,2024',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 5,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '50,000',
    tax_deduction: '10%',
    net_salary: '45,000',
    issue_date: '26 December,2023',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 4,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '50,000',
    tax_deduction: '10%',
    net_salary: '45,000',
    issue_date: '26 November,2023',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 3,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '50,000',
    tax_deduction: '10%',
    net_salary: '45,000',
    issue_date: '26 October,2023',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 2,
    action: ['Delete', 'View'],
    job_status: 'Permanent',
    gross_salary: '50,000',
    tax_deduction: '10%',
    net_salary: '45,000',
    issue_date: '26 September,2023',
    download: 'Download',
    pay_slip: '../filelink',
  },
  {
    id: 1,
    action: ['Delete', 'View'],
    job_status: 'Probation',
    gross_salary: '35,000',
    tax_deduction: '10%',
    net_salary: '2,800',
    issue_date: '26 August,2023',
    download: 'Download',
    pay_slip: '../filelink',
  },
];

export const ASSET_TABLEDATA = [
  {
    gadget: 'LapTop',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: [
      '/icons/AssigneeAvatar.svg',
      'Bilal Ahmed Khan',
      'bilal@espark.com',
    ],
    action: ['Delete'],
    actionStatus: true,
  },
  {
    gadget: 'Del keyboard',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: [
      '/icons/AssigneeAvatar.svg',
      'Bilal Ahmed Khan',
      'bilal@espark.com',
    ],
    action: ['Delete'],
    actionStatus: true,
  },
  {
    gadget: 'Laptop',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: [
      '/icons/AssigneeAvatar.svg',
      'Bilal Ahmed Khan',
      'bilal@espark.com',
    ],
    action: ['Delete'],
    actionStatus: true,
  },
  {
    gadget: 'Logictech mouse',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: [
      '/icons/AssigneeAvatar.svg',
      'Bilal Ahmed Khan',
      'bilal@espark.com',
    ],
    action: ['Delete'],
    actionStatus: true,
  },
  {
    gadget: 'Laptop',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: [
      '/icons/AssigneeAvatar.svg',
      'Bilal Ahmed Khan',
      'bilal@espark.com',
    ],
    action: ['Delete'],
    actionStatus: true,
  },
];
