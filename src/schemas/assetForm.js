import * as Yup from 'yup';
import { emailValidation, nameRegExp, nameValidation } from './validations';

export const assetFormSchema = Yup.object({
  gadget: Yup.string()
    .required('Gadget name is required')
    .matches(nameRegExp, 'Gadget is not valid')
    .min(1, 'Gadget name must be at least 2 characters')
    .max(255, 'Gadget name must not exceed 255 characters'),
  asset_id: Yup.string()
    .required('Asset id is required')
    .min(1, 'Asset id must be at least 1 characters')
    .max(255, 'Asset id must not exceed 255 characters'),
  assigned_date: Yup.date().required('Assigned date is required'),
  assignee_name: nameValidation,
  assignee_email: emailValidation,
});
