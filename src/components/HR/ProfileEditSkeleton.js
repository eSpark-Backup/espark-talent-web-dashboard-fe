'use client';
import React from 'react';
import { Stack } from '@mui/material';
import { Box, Skeleton } from '@mui/material';

const ProfileEditSkeleton = ({ isClient }) => {
  return (
    <Stack
      sx={{
        borderRadius: '5px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        marginBottom: '40px',
        px: 5,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Skeleton variant="circular" width={100} height={100} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            rowGap: 7,
          }}
        >
          <Stack spacing={1}>
            <Skeleton variant="text" width={150} height={25} />
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={150} height={20} />
          </Stack>
          {!isClient && (
            <Stack spacing={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
              <Skeleton
                variant="rounded"
                sx={{ width: { xs: '100%', md: 160 }, height: 40 }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: { xs: '100%', md: 160 }, height: 40 }}
              />
            </Stack>
          )}
          {isClient && (
            <>
              <Stack spacing={2.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: 140 }, height: 20 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: 140 }, height: 20 }}
                />
              </Stack>
              <Stack spacing={2.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: 140 }, height: 20 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: 140 }, height: 20 }}
                />
              </Stack>
              <Stack spacing={2.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: 140 }, height: 20 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: 140 }, height: 20 }}
                />
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default ProfileEditSkeleton;
