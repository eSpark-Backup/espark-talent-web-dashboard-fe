import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import LeaveRequestForm from '@/src/components/employee/dashboard/request/leave/LeaveRequestForm';

const LeaveRequestModal = forwardRef(({ handleClose }, ref) => {
  return (
    <Box
      ref={ref} // Attach the forwarded ref here
      tabIndex={-1}
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        width: '95%',
        maxWidth: '1480px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '80%',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
        <Typography
          sx={{
            textAlign: { xs: 'center', sm: 'start' },
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          Create leave request
        </Typography>
      </Box>
      <LeaveRequestForm handleClose={handleClose} />
    </Box>
  );
});

LeaveRequestModal.displayName = 'LeaveRequestModal';

export default LeaveRequestModal;
