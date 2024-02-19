import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import LeaveRequestForm from './LeaveRequestForm';

const LeaveRequestModal = ({ handleClose }) => {
  const [formData, setFormData] = useState({});
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        width: { xs: '90%', sm: '90%', md: '77.084%' },
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
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          Create leave request
        </Typography>
      </Box>
      <LeaveRequestForm handleClose={handleClose} handleData={handleData} />
    </Box>
  );
};

export default LeaveRequestModal;
