import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import {  HIRING_FORM_DATA, ROLE_TYPE } from '@/app/constants/Hiring';


const RoleType = () => {
  return (
   
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography>{HIRING_FORM_DATA.roleTitle}</Typography>
        <Autocomplete
          sx={{ width: '100%' }}
          options={ROLE_TYPE}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              sx={{ width: '250px' }}
              {...params}
              label={HIRING_FORM_DATA.selectRole}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
     
  );
};
export default RoleType;
