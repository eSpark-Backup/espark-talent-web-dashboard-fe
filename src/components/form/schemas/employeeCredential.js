import * as Yup from 'yup';

export const editEmployeeCredentialSchema = Yup.object({
  employeeId: Yup.string().required('Required'),
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
