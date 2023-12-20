import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import DownloadReports from './DownloadReports';
import ReportDate from './DatePicker';

const ReportBoxes = ({ data }) => {
  const [showDatePicker, setDatePicker] = useState(false);
  const showReportDate = () => {
    setDatePicker(true);
  };
  return (
    <>
      <Grid container spacing={0}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%',
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
              <DownloadReports
                key={item.id}
                image={item.image}
                reportHeading={item.reportHeading}
                downloadReports={item.downloadReports}
                downloadBtn={item.downloadBtn}
                onDownloadClick={showReportDate}
              />
            </Grid>
          ))}
        </Box>

        {showDatePicker && <ReportDate />}
      </Grid>
    </>
  );
};
export default ReportBoxes;
