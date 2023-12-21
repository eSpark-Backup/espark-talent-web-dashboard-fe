import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import MyActionBar from './actionBar';

const DatePickerModal = ({ open, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ cancelButtonLabel: 'Close', okButtonLabel: 'Download' }}
        >
          <StaticDatePicker
            openTo="month"
            // onChange={handleDateChange}
            views={['year', 'month', 'day']}
            // slots={{
            //     actionBar: MyActionBar,

            //           }}

            slotProps={{
              actionBar: {
                actions: ['cancel', 'accept'],
                style: { border: '1px solid #029894' },
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};
export default DatePickerModal;
