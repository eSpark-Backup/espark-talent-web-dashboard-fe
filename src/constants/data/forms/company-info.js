import { companyInfoSchema } from '@/src/components/form/schemas/companyInfo';

export const companyformElement = [
  {
    title: 'Company name',
    placeholder: 'Enter company name',
    name: 'company_name',
  },
  {
    title: 'Company Email',
    placeholder: 'Enter email',
    name: 'company_email',
  },
  {
    title: 'Website URL',
    placeholder: 'Enter url',
    name: 'website_url',
  },
  {
    title: 'Upload',
    placeholder: 'Upload picture',
    prefixIcon: 'upload',
    type: 'file',
    name: 'image',
    accept: '.png',
  },
];
export const formSteps = [
  {
    schema: companyInfoSchema,
    form: companyformElement,
  },
];
