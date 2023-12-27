import React from 'react';
import { Box, Button, Modal } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { REPORT_DATA } from '@/src/constants/report';
import dayjs from 'dayjs';
import ActionButtonComponent from './actionButton';

const DatePickerModal = ({ open, handleClose }) => {
  const minDate = dayjs().year(1900).month(0).date(1); // January 1, 2023
  const maxDate = dayjs().year(2023).month(11).date(31); // December 31, 2023
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
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '380px',
          height: '500px',
          background: '#fff',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            background: 'gray',
            borderRadius: '10px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              openTo="month"
              sx={{ borderRadius: '10px', height: '300px' }}
              views={['year', 'month', 'day']}
              slots={{
                actionBar: () => (
                  <ActionButtonComponent handleClose={handleClose} />
                ),
              }}
              slotProps={{
                actionBar: {
                  actions: [],
                },
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                background: 'pink',
                marginBottom: '30px',
                // paddingBottom: '15px',
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
            </Box> */}
          </LocalizationProvider>
        </Box>
      </Box>
    </Modal>
  );
};
export default DatePickerModal;
