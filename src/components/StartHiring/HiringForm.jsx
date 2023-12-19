import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import HiringDate from './HiringDate';
import GenderInput from './GenderInput';
import JobTitle from './JobTitle';
import CountryDropdown from './SelectCountry';
import Submit from './SubmitButton';

const HiringForm = () => {
  const [open, setOpen] = useState(false);
  const SelectOpen = () => {
    setOpen(true);
  };
  const SelectClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} sm={10} md={12} lg={10}>
        <Box
          sx={{
            width: '100%',
            height: { xs: "auto", md: '900px' },
            borderRadius: '10px',
            border: '1px solid #E4E4E4',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '30px',
            }}
          >
            {' '}
            <Typography variant="h2">{HIRING_FORM_DATA.hire}</Typography>
          </Box>
          <Box
            sx={{
              paddingTop: '80px',
            }}
          >
            <JobTitle
              open={open}
              SelectOpen={SelectOpen}
              SelectClose={SelectClose}
            />
            <GenderInput
              open={open}
              SelectOpen={SelectOpen}
              SelectClose={SelectClose}
            />
            <HiringDate />
            <CountryDropdown  open={open}
              SelectOpen={SelectOpen}
              SelectClose={SelectClose} />
            <Submit />
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default HiringForm;
