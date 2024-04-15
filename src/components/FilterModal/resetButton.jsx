import React from 'react';
import { Box, Button } from '@mui/material';
import Image from 'next/image';

import { FILTER } from '@/src/constants/filter';

const ResetButton = ({ onSubmit }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '20px',
        justifyContent: 'center',
        gap: '15px',
      }}
    >
      <Button
        sx={{
          width: { xs: '105px', sm: '120px' },
          height: '40px',
          fontSize: '16px',
          fontWeight: 600,
          background: '#F23F3A',
          color: '#fff',
          '&:hover': {
            background: '#F23F3A',
            color: '#fff',
          },
        }}
        startIcon={
          <Image
            width={20}
            height={22}
            alt="Refresh"
            src={`/images/filter/reset.svg`}
            style={{ color: '#fff' }}
          />
        }
      >
        {FILTER?.Reset}
      </Button>
      <Button
        type="submit"
        variant="primary"
        sx={{
          width: { xs: '105px', sm: '120px' },
          height: '40px',
          fontSize: '16px',
          fontWeight: 600,
        }}
        onClick={onSubmit}
        startIcon={
          <Image
            width={20}
            height={22}
            alt="Refresh"
            src={`/images/filter/search.svg`}
          />
        }
      >
        {FILTER?.search}
      </Button>
    </Box>
  );
};
export default ResetButton;
