import { companyInfoSchema } from '@/src/components/form/schemas/companyInfo';

export const companyformElement = [
  {
    title: 'Company name',
    placeholder: 'Enter company name',
    name: 'companyName',
  },
  {
    title: 'Company Email',
    placeholder: 'Enter  email',
    name: 'email',
  },
  {
    title: 'Website URL',
    placeholder: 'Enter url',
    name: 'url',
  },
  {
    title: 'Upload',
    placeholder: 'Upload picture',
    prefixIcon: 'upload',
    type: 'file',
    name: 'upload',
  },
];
export const formSteps = [
  {
    schema: companyInfoSchema,
    form: companyformElement,
  },
];
