import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import AppDropdown from '@/src/components/dashboard/AppDropdown';
import EmployementTerm from '@/src/components/start-hiring/EmployementTerm';

import { HIRING_FORM_DATA } from '@/src/constants/hiring';

import { gender } from '@/src/data/dropdown.js/start-hiring';

const GenderInput = ({ open, SelectOpen, SelectClose }) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Grid
      container
      gap={'20px'}
      sx={{
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
      }}
    >
      <Grid item xs={12} lg={6}>
        <Typography
          sx={{
            mb: '10px',
          }}
        >
          {HIRING_FORM_DATA?.gender}
        </Typography>
        <AppDropdown
          data={gender}
          setIsLoadingList={setIsLoadingTitles}
          isLoadingList={isLoadingTitles}
          selectedItem={selectedJobTitle || ''}
          setSelectedItem={setSelectedJobTitle}
          placeHolder="Select gender"
        />
      </Grid>
      <EmployementTerm
        open={open}
        SelectOpen={SelectOpen}
        SelectClose={SelectClose}
      />
    </Grid>
  );
};
export default GenderInput;
