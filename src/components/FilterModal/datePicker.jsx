import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Image from 'next/image';

import ActionBarComponent from '../requestview/actionbarComponent';

const DatePickerSet = ({ title }) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          color: '#595959',
          marginBottom: '10px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {title}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className="custom-date-time-picker"
          open={isOpenDatePicker}
          slots={{
            openPickerIcon: () => (
              <Image
                src={'/icons/CalendarOutline.svg'}
                width={20}
                height={20}
                alt="Date"
                onClick={() => setIsOpenDatePicker((ps) => !ps)}
              />
            ),
            actionBar: () => (
              <ActionBarComponent onClose={handleCloseDatePicker} />
            ),
          }}
          sx={{ width: '100%', borderRadius: '50%' }}
          defaultValue={dayjs('2022-04-17')}
        />
      </LocalizationProvider>
    </Box>
  );
};
export default DatePickerSet;
