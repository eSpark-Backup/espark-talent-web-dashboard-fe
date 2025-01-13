import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Breadcrumb = ({ title, currentPage, root, dispatchFunction }) => {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    dispatchFunction?.();
    router.back();
  };

  const handleRootNavigation = (e) => {
    e.preventDefault();
    router.push(`/hr/dashboard/${root || 'employees'}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      mb="36px"
      sx={{ cursor: 'pointer' }}
    >
      <Image
        src="/icons/Back.svg"
        alt="Back"
        width={10}
        height={10}
        onClick={handleBack}
      />
      <Box display="flex" alignItems="center" ml="10px">
        <Typography
          sx={{
            color: '#595959',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
          onClick={handleRootNavigation}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: '#595959',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            ml: '2px',
          }}
        >
          {currentPage}
        </Typography>
      </Box>
    </Box>
  );
};

export default Breadcrumb;
