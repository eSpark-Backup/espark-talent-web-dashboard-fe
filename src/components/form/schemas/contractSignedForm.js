import * as Yup from 'yup';

export const contractFormSchema = Yup.object({
  contract_name: Yup.string().required('Required'),
  client_id: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  contract_doc: Yup.mixed().required('Required'),
});

export const contractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string().required('Required'),
  employee_id: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  contract_doc: Yup.mixed().required('Required'),
});
export const OffShContractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string().required('Required'),
  employee_id: Yup.string().required('Required'),
  client_id: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  contract_doc: Yup.mixed().required('Required'),
});
