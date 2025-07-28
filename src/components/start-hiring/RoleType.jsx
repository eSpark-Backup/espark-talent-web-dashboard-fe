import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import AppDropdown from '@/src/components/dashboard/AppDropdown';

import { HIRING_FORM_DATA } from '@/src/constants/hiring';

import { roles } from '@/src/data/dropdown.js/start-hiring';

const RoleType = () => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  return (
    <Grid item xs={12} lg={6}>
      <Typography
        sx={{
          mb: '10px',
        }}
      >
        {HIRING_FORM_DATA?.roleType}
      </Typography>
      <AppDropdown
        data={roles}
        setIsLoadingList={setIsLoadingTitles}
        isLoadingList={isLoadingTitles}
        selectedItem={selectedJobTitle || ''}
        setSelectedItem={setSelectedJobTitle}
        placeHolder="Select role"
      />
    </Grid>
  );
};
export default RoleType;
