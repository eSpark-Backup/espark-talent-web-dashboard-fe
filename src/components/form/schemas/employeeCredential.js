import * as Yup from 'yup';

export const editEmployeeCredentialSchema = Yup.object({
    employeeId: Yup.string().required('Required'),
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required'),

});