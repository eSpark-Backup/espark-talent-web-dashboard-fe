import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

const DownloadPolicies = ({
  image,
  reportHeading,
  downloadReports,
  downloadBtn,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #E4E4E4',
        borderRadius: '10px',
        flexDirection: 'column',
        padding: '35px',
        gap: '15px',
        width: { xs: '100%', md: '400px' },
      }}
    >
      <Image src={image} width={50} height={50} alt={reportHeading} />
      <Typography variant="h5">{reportHeading}</Typography>
      <Typography sx={{ fontSize: '16px' }}>{downloadReports}</Typography>
      <Button
        variant="primary"
        sx={{
          width: { xs: '100px', md: '170px' },
          padding: '8px',
        }}
      >
        {downloadBtn}
      </Button>
    </Box>
  );
};
export default DownloadPolicies;
