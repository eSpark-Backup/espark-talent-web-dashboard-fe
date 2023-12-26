import React from 'react';
import { Box, Button, Modal } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { REPORT_DATA } from '@/src/constants/report';

const DatePickerModal = ({ open, handleClose }) => {
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onClick={handleOutsideClick}
      >
        <Box
          sx={{
            background: '#fff',
            marginTop: '150px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              openTo="month"
              views={['year', 'month', 'day']}
              slotProps={{
                actionBar: {
                  actions: [],
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                paddingBottom: '15px',
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
                {REPORT_DATA?.close}
              </Button>
              <Button variant="contained">{REPORT_DATA?.download}</Button>{' '}
            </Box>
          </LocalizationProvider>
        </Box>
      </Box>
    </Modal>
  );
};
export default DatePickerModal;
