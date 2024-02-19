'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import ProfileSection from './ProfileSection';
import SettingTitle from './SettingTitle';
import PasswordSection from './PasswordSection';
import {
  Profile_Edit_Section,
  Setting_Data,
  User_Detail,
  User_Password,
} from '@/src/constants/profileEditData';

const EditProfile = () => {
  const [formData, setFormData] = useState({});
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  return (
    <>
      <Box
        sx={{
          mx: 'auto',
          minWidth: 'auto',
          maxWidth: { xs: 'auto', md: '750px' },
          height: 'auto',
          borderRadius: '10px',
          border: '1px solid #E4E4E4',
          background: '#FFF',
          p: 4,
          '@media (min-width: 790px) and (max-width: 899px)': {
            maxWidth: '750px',
          },
          '@media (max-width: 380px)': {
            padding: 2,
          },
        }}
      >
        <SettingTitle Setting_Data={Setting_Data} />
        <Box sx={{ mt: 5 }}>
          <ProfileSection
            Profile_Edit_Section={Profile_Edit_Section}
            User_Detail={User_Detail}
            handleData={handleData}
          />
          <PasswordSection
            User_Password={User_Password}
            handleData={handleData}
          />
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
