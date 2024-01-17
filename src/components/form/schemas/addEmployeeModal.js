import * as Yup from 'yup';

export const addEmployeModalFormSchema = Yup.object({
    employeeName: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    jobTitle: Yup.string().required('Required'),
    roleType: Yup.string().required('Required'),
    employmentTerm: Yup.string().required('Required'),
    joinDate: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    benefits: Yup.mixed().required('Required'),
});
