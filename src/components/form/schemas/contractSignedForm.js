import * as Yup from 'yup';

export const contractFormSchema = Yup.object({
    contractName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    date: Yup.string().required('Required'),
    upload: Yup.mixed().required('Required'),
});