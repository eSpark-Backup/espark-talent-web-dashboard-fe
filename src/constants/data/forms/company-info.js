import { companyInfoSchema } from '@/src/components/form/schemas/companyInfo';

export const companyformElement = [
  {
    title: 'Company name',
    placeholder: 'Enter company name',
    name: 'company_name',
    col: 2.5,
  },
  {
    title: 'Company email',
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
    filelabel: 'Accept .png, .jpg, .jpeg, or .svg files only',
    prefixIcon: 'upload',
    type: 'upload',
    name: 'image',
    accept: '.png, .jpg, .jpeg, .svg',
    col: 2.5,
  },
];
export const formSteps = [
  {
    schema: companyInfoSchema,
    form: companyformElement,
  },
];
