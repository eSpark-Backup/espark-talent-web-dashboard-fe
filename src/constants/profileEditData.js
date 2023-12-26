export const SettingData = {
  title: 'Settings',
  description:
    'Here you can edit your profile, understand how you can request to export your data and update your notification preferences.',
};

export const ProfileEditSection = {
  title: 'Profile Picture',
  profileAvatar: '/icons/avatar.svg',
  buttonIcon: '/icons/upload.svg',
  buttonText: 'Upload Picture',
  alt: 'Profile_Avatar',
};

export const UserDetail = {
  title: 'General',
  buttonText: 'Update',
  Fields: [
    {
      label: 'Company Name',
      place: 'Company Name',
      type: 'text',
      // buttonText: 'Update',
    },
    {
      label: 'Email',
      place: 'Email',
      type: 'email',
      // buttonText: 'Update',
    },
  ],
};

export const UserPassword = {
  title: 'Change your password',
  buttonText: 'Update',
  Fields: [
    {
      label: 'Current Password',
      place: 'Enter password',
      type: 'password',
    },
    {
      label: 'New Password',
      place: 'Enter password',
      type: 'password',
    },
    {
      label: 'Confirm New Password',
      place: 'Enter password',
      type: 'password',
    },
  ],
};
