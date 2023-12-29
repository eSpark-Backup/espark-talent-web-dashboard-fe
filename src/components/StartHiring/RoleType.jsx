import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppDropdown from '../dashboard/appDropdown';
import { roles } from '@/src/constants/data/startHiring';

const RoleType = () => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 101,
      }}
    >
      <Typography>{HIRING_FORM_DATA?.roleTitle}</Typography>
      <AppDropdown
        data={roles}
        setIsLoadingList={setIsLoadingTitles}
        isLoadingList={isLoadingTitles}
        selectedItem={selectedJobTitle}
        setSelectedItem={setSelectedJobTitle}
        placeHolder="Select Role Type..."
      />
    </Box>
  );
};
export default RoleType;
