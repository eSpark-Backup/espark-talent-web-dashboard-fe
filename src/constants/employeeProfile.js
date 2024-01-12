import { a11yProps } from '@/src/utils/tabs';

export const employeeProfileData = {
  downloadResume: 'Download resume',
  editCredentials: 'Edit credentials',
  personalInformation: 'Personal information',
  emergencyContact: 'Emergency contact',
  profile: 'Profile',
  employees: 'Employees',
  name: 'John Doe',
  id: 'Employee ID: es-00020',
  designation: ' Web developer',
};
export const EDIT_MODAL = {
  editProfile: 'Edit profile picture',
  addassetForm: 'Add asset form',
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
  editPersonalDetails: 'Edit personal details',
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
  { label: 'Employee name' },
  { label: 'Employee ID' },
  { label: 'Birth date' },
  { label: 'Gender' },
  { label: 'Email' },
  { label: 'Team' },
  { label: 'Designation' },
  { label: 'Joining date' },
  { label: 'Marital status' },
];
export const employeeData = [
  { value: 'John Doe' },
  { value: '090078601' },
  { value: 'January 1, 1990' },
  { value: 'Male' },
  { value: 'johndoe@123.com' },
  { value: 'Web development' },
  { value: 'Web developer' },
  { value: '26/01/23' },
  { value: 'Married' },
];
export const emergencyContact = [
  { label: 'Name' },
  { label: 'Relationship' },
  { label: 'Phone' },
];
export const emergencyContactData = [
  { value: 'John Doe' },
  { value: 'Father' },
  { value: '03323883838' },
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
    label: ' Attendance reports',
    prop: a11yProps(2),
  },
  {
    label: ' Assets',
    prop: a11yProps(3),
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
  },
  {
    title: 'Asset ID',
    flex: 2,
  },
  {
    title: 'Assigned date',
    flex: 2,
  },
  {
    title: 'Assignee',
    flex: 2,
  },
];
export const ASSET_TABLEDATA = [
  {
    gadget: 'LapTop',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: 'Bilal Ahmed Khan',
  },
  {
    gadget: 'Del keyboard',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: 'Bilal Ahmed Khan',
  },
  {
    gadget: 'Laptop',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: 'Bilal Ahmed Khan',
  },
  {
    gadget: 'Logictech mouse',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: 'Bilal Ahmed Khan',
  },
  {
    gadget: 'Laptop',
    assetId: 'AST-001',
    assignedDate: 'September 7,2023 11:07 AM',
    assignee: 'Bilal Ahmed Khan',
  },
];
