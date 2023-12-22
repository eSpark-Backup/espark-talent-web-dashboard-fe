import React from 'react';
import { Box, Grid } from '@mui/material';

import DownloadPolicies from './downloadPolicies';

const PoliciesCard = ({ data }) => {
  return (
    <>
      <Grid container spacing={0}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: { xs: '100%', md: '60%' },
            mx: 'auto',
          }}
        >
          {data.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={12}
              md={12}
              lg={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '15px',
              }}
            >
              <DownloadPolicies
                key={item.id}
                image={item.image}
                reportHeading={item.reportHeading}
                downloadReports={item.downloadReports}
                downloadBtn={item.downloadBtn}
              />
            </Grid>
          ))}
        </Box>
      </Grid>
    </>
  );
};
export default PoliciesCard;
