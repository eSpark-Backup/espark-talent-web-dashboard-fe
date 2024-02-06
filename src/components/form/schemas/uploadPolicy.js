import * as Yup from 'yup';

export const uploadPolicyFormSchema = Yup.object({
    policyName: Yup.string().required('Required'),
    upload: Yup.mixed().required('Required'),
});