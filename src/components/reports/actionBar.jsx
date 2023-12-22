import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import { REPORT_DATA } from '@/src/constants/report';
import DatePickerModal from './Modal';

const MyActionBar = ({ onAccept }) => {
  const [open, setOpen] = useState(false);

  const handleonClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        margin: 'auto',
        display: 'flex',
        gap: '10px',
        marginBottom: '-320px',
        justifyContent: 'flex-end',
      }}
    >
      <Button
        sx={{
          borderRadius: '5px',
          border: '1px solid #029894',
          background: '#FFF',
        }}
        onClick={handleonClose}
      >
        {REPORT_DATA?.close}
      </Button>
      <Button variant="contained" onClick={onAccept}>
        {REPORT_DATA?.download}
      </Button>
      {open && <DatePickerModal />}
    </Box>
  );
};
export default MyActionBar;
