import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

import DatePickerModal from './Modal';

const DownloadReports = ({
  image,
  reportHeading,
  downloadReports,
  downloadBtn,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      <Typography>{downloadReports}</Typography>
      <Button
        variant="primary"
        sx={{
          width: { xs: '100px', md: '170px' },
          padding: '8px',
        }}
        onClick={handleOpen}
      >
        {downloadBtn}
      </Button>
      {open && <DatePickerModal handleClose={handleClose} open={open} />}
    </Box>
  );
};
export default DownloadReports;
