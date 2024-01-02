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
        '@media (min-width:1200px) and (max-width:1300px)': {
          width: '350px',
        },
        width: { xs: '100%', sm: '100%', md: '350px', lg: '400px' },
      }}
    >
      <Image src={image} width={50} height={50} alt={reportHeading} />
      <Typography variant="h5">{reportHeading}</Typography>
      <Typography variant="body2">{downloadReports}</Typography>
      <Button
        variant="primary"
        sx={{
          width: { xs: '120px', md: '120px' },
          height: '40px',
          padding: '8px',
        }}
      >
        {downloadBtn}
      </Button>
    </Box>
  );
};
export default DownloadPolicies;
