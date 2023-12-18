import React from 'react';
import { Box, Typography } from '@mui/material';

import HiringDate from './HiringDate';
import GenderInput from './GenderInput';
import JobTitle from './JobTitle';
import CountryDropdown from './SelectCountry';
import Submit from './SubmitButton';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
const HiringForm = () => {
  return (
    <Box
      sx={{
        width: '750px',
        height: '900px',
        borderRadius: '10px',
        border: '1px solid #E4E4E4',
      }}
      >
          <Box sx={{
              display: "flex",
              justifyContent:"center"
          }}> <Typography variant='h2'>{HIRING_FORM_DATA.hire}</Typography></Box>
         
      <JobTitle />
      <GenderInput />
      <HiringDate />
      <CountryDropdown />
      <Submit />
    </Box>
  );
};
export default HiringForm;
