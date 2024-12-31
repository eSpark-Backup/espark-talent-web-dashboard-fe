import * as Yup from 'yup';

export const benefitFormSchema = Yup.object({
  benefit: Yup.string().required('Benefits are required'),
  card_id: Yup.string().required('Card ID is required'),
  issue_date: Yup.date().required('Issue date is required'),
  description: Yup.string().required('Description is required'),
});
