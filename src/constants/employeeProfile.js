import { a11yProps } from '@/src/utils/tabs';

export const employeeProfileData = {
  downloadResume: 'Download resume',
  editCredentials: 'Edit credentials',
  personalInformation: 'Personal information',
  emergencyContact: 'Emergency contact',
};
export const EDIT_MODAL = {
  editProfile: 'Edit profile picture',
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
