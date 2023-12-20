import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { RESOURCE_DATA } from '@/src/constants/resources';
import Link from 'next/link';

const HolidaysCalender = () => {
  return (
    <Link href="/">
      <Box
        sx={{
          height: { xs: '350px', md: '300px' },
          borderRadius: '10px',
          background: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          padding: '18px',
          border: '1px solid #E4E4E4',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '440px',
            gap: '30px',
            paddingTop: '30px',
          }}
        >
          <Box>
            <Image
              src="/images/resources/holiday-calender.svg"
              width={70}
              height={70}
              alt="calender"
            />
          </Box>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            {RESOURCE_DATA?.holidayCalender}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {RESOURCE_DATA?.employeeData}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};
export default HolidaysCalender;
