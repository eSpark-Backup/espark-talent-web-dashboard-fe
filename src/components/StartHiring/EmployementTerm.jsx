import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Typography } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppDropdown from '../dashboard/appDropdown';
import { employmentTerm } from '@/src/constants/data/startHiring';

const EmployementTerm = () => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 100,
      }}
    >
      <Typography>{HIRING_FORM_DATA?.employementTerm}</Typography>
      <FormControl>
        <InputLabel sx={{ color: '#888888' }}>
          {HIRING_FORM_DATA?.selectterms}
        </InputLabel>
        <AppDropdown
          data={employmentTerm}
          setIsLoadingList={setIsLoadingTitles}
          isLoadingList={isLoadingTitles}
          selectedItem={selectedJobTitle}
          setSelectedItem={setSelectedJobTitle}
          placeHolder="Select Gender..."
        />
      </FormControl>
    </Box>
  );
};
export default EmployementTerm;
