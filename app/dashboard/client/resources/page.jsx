import React from 'react';
import { Box, Grid } from '@mui/material';

import ResourceCard from '@/src/components/resources/ResourceCard';

const Resource = () => {
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
          <ResourceCard data={RESOURCE_DATA?.items} />
        </Box>
      </Grid>
    </>
  );
};
export default Resource;
