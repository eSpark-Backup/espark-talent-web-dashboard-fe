import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import LeaveDatePicker from './leaveDatepicker';

const ActionBarComponent = () => {
  const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
    return(
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        paddingTop: '15px',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        zIndex: 1,
      }}
    >
      <Button
        sx={{
          borderRadius: '5px',
          border: '1px solid #029894',
          background: '#FFF',
          width: '100px',
              }}
              onClick={handleClose}
      >
        {REQUESTVIEW_DATA?.close}
            </Button>
        {open && <LeaveDatePicker
          // handleClose={handleClose} open={open}
        />}

      <Button variant="contained" sx={{ width: '100px' }} >
        {REQUESTVIEW_DATA?.set}
      </Button>
    </Box>
  );
};
export default ActionBarComponent;
