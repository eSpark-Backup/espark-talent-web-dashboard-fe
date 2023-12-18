import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { HIRING_FORM_DATA,SALARY_TYPE } from '@/src/constants/Hiring';
const EmployementTerm = () => {
    return (
     
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
            >
            <Typography>{HIRING_FORM_DATA.employementTerm}</Typography>
                 <Autocomplete
      options={SALARY_TYPE}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField sx={{width:"250px"}} {...params} label={HIRING_FORM_DATA.selectterms} variant="outlined" fullWidth />
      )}
    />
            </Box>
    );
}
export default EmployementTerm;