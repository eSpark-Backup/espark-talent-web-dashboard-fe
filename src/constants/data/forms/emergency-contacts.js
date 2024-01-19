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
    placeholder: '0330012378',
    name: 'phoneNumber1',
    prefixIcon: '/images/dashboard/plus.svg',
  },
  {
    title: 'Phone',
    placeholder: '0330012378',
    name: 'phoneNumber2',
    prefixIcon: '/images/dashboard/minus.svg',
  },
];

export const formEmergency = [
  {
    schema: emergencyContactsSchema,
    form: formEmergencyContact,
  },
];
