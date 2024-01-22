import { emergencyContactsSchema } from '@/src/components/form/schemas/emergencyContact';

export const formEmergencyContact = [
  {
    title: 'Name',
    placeholder: 'John Doe',
    name: 'name1',
  },
  {
    title: 'Relationship',
    placeholder: 'Father',
    name: 'relation1',
  },
  {
    title: 'Phone',
    placeholder: '0330012372',
    name: 'phoneNumber1',
    suffixIconOutside: 'plus',
  },
  // {
  //   title: 'Phone',
  //   placeholder: '0330012372',
  //   name: 'phoneNumber2',
  //   suffixIconOutside: 'minus',
  // },
];
export const formEmergencySecondaryContact = [
  {
    title: 'Name',
    placeholder: 'John Doe',
    name: 'name2',
  },
  {
    title: 'Relationship',
    placeholder: 'Father',
    name: 'relation2',
  },
  {
    title: 'Phone',
    placeholder: '0330012373',
    name: 'phoneNumber3',
    suffixIconOutside: 'plus',
  },
  // {
  //   title: 'Phone',
  //   placeholder: '0330012372',
  //   name: 'phoneNumber4',
  //   suffixIconOutside: 'minus',
  // },
];

export const formEmergency = [
  {
    schema: emergencyContactsSchema,
    form: formEmergencyContact,
  },
];
