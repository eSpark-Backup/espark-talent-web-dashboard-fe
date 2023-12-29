'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import { POLICIES_DATA } from '@/src/constants/policies';
import PoliciesCard from '@/src/components/policies/policiesCard';

const Policies = () => {
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '60px',
            gap: '20px',
            width: '100%',
          }}
        >
          <Heading
            title={POLICIES_DATA?.title}
            description={POLICIES_DATA?.description}
            containerStyles={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          />
          <PoliciesCard data={POLICIES_DATA?.items} />
        </Box>
      </Grid>
    </>
  );
};
export default Policies;
