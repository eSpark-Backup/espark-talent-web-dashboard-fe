import * as Yup from 'yup';

export const assetFormSchema = Yup.object({
    gadgetName: Yup.string().required('Required'),
    assetId: Yup.string().required('Required'),
    dateOfBirth: Yup.string().required('Required'),
    assetName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    image: Yup.mixed().required('Required'),
});