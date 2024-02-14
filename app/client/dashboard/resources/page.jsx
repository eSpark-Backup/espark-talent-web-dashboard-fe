import React from 'react';
import { Box, Grid } from '@mui/material';

import ResourceCard from '@/src/components/resources/ResourceCard';
import { RESOURCE_DATA } from '@/src/constants/resources';
import Heading from '@/src/components/global/Heading';

const Resource = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '100px',
              width: '100%',
            }}
          >
            <Heading
              title={RESOURCE_DATA?.title}
              description={RESOURCE_DATA?.description}
            />
            <ResourceCard data={RESOURCE_DATA?.items} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Resource;
