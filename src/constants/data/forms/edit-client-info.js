export const clientEditForm = [
  {
    title: 'First name',
    placeholder: 'Enter first name',
    name: 'firstName',
  },
  {
    title: 'Last name',
    placeholder: 'Enter first name',
    name: 'lastName',
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
    title: 'Phone number',
    placeholder: 'Enter phone number',
    name: 'phoneNumber',
  },
  {
    title: 'Marital status',
    placeholder: 'Select',
    name: 'maritalStatus',
    type: 'select',
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
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
  },
  {
    title: 'Company',
    placeholder: 'eSparkTalent',
    name: 'company',
  },
  {
    title: 'Date of birth',
    placeholder: 'DD-MM-YYYY',
    name: 'dateOfBirth',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Picture',
    placeholder: 'john.png',
    name: 'picture',
    prefixIcon: 'upload',
    type: 'file',
  },
];
