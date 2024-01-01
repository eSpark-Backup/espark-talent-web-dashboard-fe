import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Typography } from '@mui/material';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

import EmployementTerm from './EmployementTerm';
import AppDropdown from '../dashboard/appDropdown';
import { gender } from '@/src/constants/data/dropdown.js/startHiring';

const GenderInput = ({ open, SelectOpen, SelectClose }) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        paddingTop: '25px',
        '@media (min-width: 900px) and (max-width: 1400px)': {
          flexDirection: 'column',
          gap: '10px',
        },
        gap: { xs: '9px', md: '0px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 102,
        }}
      >
        <Typography>{HIRING_FORM_DATA?.gender}</Typography>

        <FormControl>
          <InputLabel sx={{ color: '#888888' }}>
            {HIRING_FORM_DATA?.selectGender}
          </InputLabel>
          <AppDropdown
            data={gender}
            setIsLoadingList={setIsLoadingTitles}
            isLoadingList={isLoadingTitles}
            selectedItem={selectedJobTitle}
            setSelectedItem={setSelectedJobTitle}
            placeHolder="Select Gender..."
          />
        </FormControl>
      </Box>
      <EmployementTerm
        open={open}
        SelectOpen={SelectOpen}
        SelectClose={SelectClose}
      />
    </Box>
  );
};
export default GenderInput;
