import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import RoleType from './RoleType';
import AppNestedDropdown from '../dashboard/appDropdown';
import { jobTitles } from '@/src/constants/data/startHiring';

const JobTitle = ({ open, SelectOpen, SelectClose }) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        paddingTop: '15px',
        zIndex: 100,
        '@media (min-width: 900px) and (max-width: 1400px)': {
          flexDirection: 'column',
          gap: '10px',
        },
        gap: { xs: '7px', sm: '7px', md: '0px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 101,
        }}
      >
        <Typography>{HIRING_FORM_DATA?.jobTitle}</Typography>
        <AppNestedDropdown
          data={jobTitles}
          setIsLoadingList={setIsLoadingTitles}
          isLoadingList={isLoadingTitles}
          selectedItem={selectedJobTitle}
          setSelectedItem={setSelectedJobTitle}
          nested
          placeHolder="Select Job Title..."
        />
      </Box>
      <RoleType open={open} SelectOpen={SelectOpen} SelectClose={SelectClose} />
    </Box>
  );
};

export default JobTitle;
