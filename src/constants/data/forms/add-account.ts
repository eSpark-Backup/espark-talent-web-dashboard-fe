export const accountForm = [
  {
    title: 'Account name',
    placeholder: 'Enter name',
    name: 'account_name',
    type: 'text',
    autocomplete: 'name',
  },
  {
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
    type: 'email',
    autocomplete: 'email',
  },
  {
    title: 'Password',
    placeholder: 'Enter password',
    name: 'password',
    type: 'password',
    autocomplete: 'new-password',
  },
  {
    title: 'Confirm password',
    placeholder: 'Confirm password',
    name: 'confirm_password',
    type: 'password',
    autocomplete: 'new-password',
  },
  {
    title: 'Upload',
    placeholder: 'Upload picture',
    prefixIcon: 'upload',
    type: 'file',
    name: 'image',
    filelabel: 'Accept .png or .jpg files only',
    accept: 'image/png, image/jpg',
  },
];
