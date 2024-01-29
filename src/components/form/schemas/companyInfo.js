import * as Yup from 'yup';

export const companyInfoSchema = Yup.object({
    companyName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    url: Yup.string().required('Required'),
    upload: Yup.mixed().required('Required'),
});