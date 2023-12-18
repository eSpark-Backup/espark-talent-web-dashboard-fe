import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { GENDER_OPTION,HIRING_FORM_DATA } from '@/src/constants/Hiring';

import EmployementTerm from './EmployementTerm';

const GenderInput = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography>{HIRING_FORM_DATA.gender}</Typography>
        <Autocomplete
          sx={{ width: '100%' }}
          options={GENDER_OPTION}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              sx={{ width: '250px' }}
              {...params}
              label={HIRING_FORM_DATA.selectGender}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      <EmployementTerm />
    </Box>
  );
};
export default GenderInput;
