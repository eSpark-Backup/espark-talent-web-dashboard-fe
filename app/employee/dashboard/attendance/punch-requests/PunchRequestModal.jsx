import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import PunchRequestForm from '@/app/employee/dashboard/attendance/punch-requests/PunchRequestForm';
import PunchRequestDataView from './PunchRequestFormView';

const PunchRequestModal = ({ createModal, modalData, handleClose }) => {
  const [formData, setFormData] = useState({});
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log({ modalData });
  }, [modalData]);
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
        maxHeight: '82%',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          {createModal ? (
            <div>Create punch request</div>
          ) : (
            <div>Punch request view</div>
          )}
        </Typography>
      </Box>
      {createModal ? (
        <PunchRequestForm handleClose={handleClose} handleData={handleData} />
      ) : (
        <PunchRequestDataView
          modalData={modalData}
          handleClose={handleClose}
          handleData={handleData}
        />
      )}
    </Box>
  );
};

export default PunchRequestModal;
