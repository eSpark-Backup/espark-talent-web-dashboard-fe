import React from 'react';
import { Box } from '@mui/material';

import HiringDate from './HiringDate';
import GenderInput from './GenderInput';
import JobTitle from './JobTitle';
import CountryDropdown from './SelectCountry';
import Submit from './SubmitButton';

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
      <JobTitle />
      <GenderInput />
          <HiringDate />
          <CountryDropdown />
          <Submit/>
    </Box>
  );
};
export default HiringForm;
