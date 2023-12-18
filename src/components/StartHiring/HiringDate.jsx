import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from 'next/image';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

const HiringDate = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
                  <Typography>{HIRING_FORM_DATA.startDate}</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                          label="Select Start Date"
                          placeholder=""
              renderInput={(startProps, endProps, { startIcon, endIcon }) => (
                <>
                  {startIcon}
                  <IconButton
                    {...startProps}
                    onClick={startProps.onClick}
                    sx={{ padding: 0 }}
                  >
                    <Image
                      src="/images/hiring/calender.svg"
                      alt="Calendar"
                      width={30}
                      height={30}
                    />
                  </IconButton>
                </>
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
                  <Typography>{ HIRING_FORM_DATA.endDate}</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker  label="Select End Date"
                          placeholder="" />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
};
export default HiringDate;
