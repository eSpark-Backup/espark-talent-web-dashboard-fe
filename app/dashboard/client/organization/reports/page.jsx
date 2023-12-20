'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import ReportHeading from '@/src/components/reports/reportHeading';
import ReportBoxes from '@/src/components/reports/reportBoxes';
import { DOWNLOAD_REPORTS_DATA } from '@/src/constants/report';

const Reports = () => {
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
          <ReportHeading />
          <ReportBoxes data={DOWNLOAD_REPORTS_DATA} />
        </Box>
      </Grid>
    </>
  );
};
export default Reports;
