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
      <Grid item xs={12} sm={10} md={10} lg={8}>
        <Box
          sx={{
            width: '100%',
            height: { xs: 'auto', md: '900px' },
            borderRadius: '10px',
            border: '1px solid #E4E4E4',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            padding: '20px',
            gap: '30px',

            '@media (min-width: 960px) and (max-width: 1590px)': {
              width: '120%',
            },
            '@media (min-width: 900px) and (max-width: 1440px)': {
              height: '1200px',
            },
          }}
        >
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            {HIRING_FORM_DATA.hire}
          </Typography>
          <Box
            sx={{
              width: '100%',
              padding: { xs: '10px', md: '8px' },
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
            <CountryDropdown
              open={open}
              SelectOpen={SelectOpen}
              SelectClose={SelectClose}
            />
            <Submit />
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default HiringForm;
