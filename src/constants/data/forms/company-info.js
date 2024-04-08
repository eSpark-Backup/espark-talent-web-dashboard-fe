import { companyInfoSchema } from '@/src/components/form/schemas/companyInfo';

export const companyformElement = [
  {
    title: 'Company name',
    placeholder: 'Enter company name',
    name: 'company_name',
    col: 2.5,
  },
  {
    title: 'Company Email',
    placeholder: 'Enter email',
    name: 'company_email',
    col: 2.5,
  },
  {
    title: 'Website URL',
    placeholder: 'Enter url',
    name: 'website_url',
    col: 2.5,
  },
  {
    title: 'Upload',
    placeholder: 'Upload picture',
    prefixIcon: 'upload',
    type: 'file',
    name: 'image',
    accept: '.png',
    col: 2.5,
  },
];
export const formSteps = [
  {
    schema: companyInfoSchema,
    form: companyformElement,
  },
];
