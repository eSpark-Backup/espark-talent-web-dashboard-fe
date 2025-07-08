export const emergencyContactForm = [
  {
    contactTitle: 'Primary Contact',
    type: 'primary',
    fields: [
      {
        title: 'Name',
        placeholder: 'John Doe',
        name: 'name',
      },
      {
        title: 'Relationship',
        placeholder: 'Father',
        name: 'relation',
      },
      {
        title: 'Phone',
        placeholder: '0330012373',
        name: 'phone_number',
        type: 'number',
        suffixIconOutside: 'plus',
      },
      {
        title: 'Phone 2',
        placeholder: '0330012373',
        name: 'phone_number2',
        type: 'number',
        suffixIconOutside: 'minus',
      },
    ],
  },
  {
    contactTitle: 'Secondary Contact',
    type: 'secondary',
    fields: [
      {
        title: 'Name',
        placeholder: 'John Doe',
        name: 'name',
      },
      {
        title: 'Relationship',
        placeholder: 'Father',
        name: 'relation',
      },
      {
        title: 'Phone',
        placeholder: '0330012373',
        name: 'phone_number',
        suffixIconOutside: 'plus',
        type: 'number',
      },
      {
        title: 'Phone2',
        placeholder: '0330012373',
        name: 'phone_number2',
        suffixIconOutside: 'minus',
        type: 'number',
      },
    ],
  },
];
