import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import EmployeeId from './EmployeeDetails';
import EmployeeName from './EmployeeName';

const EmployeeData = () => {
  return (
    <>
      <Box>
        <Image
          src="/images/attendance/avatar.svg"
          width={176}
          height={176}
          alt="Avatar"
        />
      </Box>
      <Box sx={{ width: '40%' }}>
        <EmployeeId />
      </Box>
      <Box sx={{ width: '40%' }}>
        <EmployeeName />
      </Box>
      <br />
    </>
  );
};
export default EmployeeData;
