import * as Yup from 'yup';
import { nameRegExp } from './validations';

const benefitFormSchema = Yup.object({
  benefit: Yup.string()
    .required('Benefits are required')
    .transform((value) => value.trim())
    .matches(nameRegExp, 'Benefits is not valid')
    .min(2, 'Benefits is too short - should be 2 chars minimum.')
    .max(255, 'Benefits is too long - should be 255 chars maximum.'),
  card_id: Yup.string()
    .required('Card ID is required')
    .transform((value) => value.trim())
    .min(1, 'Card ID is too short - should be 1 chars minimum.')
    .max(255, 'Card ID is too long - should be 255 chars maximum.'),
  issue_date: Yup.date().required('Issue date is required'),
  description: Yup.string()
    .required('Description is required')
    .transform((value) => value.trim())
    .min(2, 'Description is too short - should be 2 chars minimum.')
    .max(255, 'Description is too long - should be 255 chars maximum.'),
});

export { benefitFormSchema };
