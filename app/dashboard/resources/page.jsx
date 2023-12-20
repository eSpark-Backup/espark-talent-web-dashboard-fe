import React from 'react';
import { Box, Grid } from '@mui/material';

import EmployeeData from '@/src/components/resources/EmployeeData';
import ResourceHeading from '@/src/components/resources/ResourceHeading';

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
          <ResourceHeading />
          <EmployeeData />
        </Box>
      </Grid>
    </>
  );
};
export default Resource;
