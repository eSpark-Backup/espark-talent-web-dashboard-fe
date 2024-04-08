import { TIME_REQUEST } from '@/src/constants/timeSheet';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const PageHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        alignItems: { xs: 'flex-start', md: 'center' },
      }}
    >
      <Box display={'flex'} flexDirection={'column'}>
        <Typography variant="h3">Time off Request</Typography>
        <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '17px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#595959',
              marginBottom: '10px',
            }}
            variant="caption"
          >
            {TIME_REQUEST?.manage}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '17px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#595959',
            }}
            variant="caption"
          >
            {TIME_REQUEST?.link}{' '}
            <Link
              style={{
                textDecoration: 'underline',
              }}
              href="/"
            >
              <span
                style={{
                  color: 'black',
                  fontWeight: 400,
                  fontSize: '14px',
                }}
              >
                {' '}
                {TIME_REQUEST?.holiday}
              </span>
            </Link>
          </Typography>
        </Box>
      </Box>
      <Button
        sx={{
          marginX: '10px',
          minWidth: '220px',
          color: '#029894',
          border: '1px solid #029894',
          fontSize: '16px',
          fontWeight: '600',
          mb: '100px',
          '&:hover': {
            background: '#E6F5F4',
          },
        }}
      >
        {TIME_REQUEST?.downloadReport}
      </Button>
    </Box>
  );
};

export default PageHeader;
