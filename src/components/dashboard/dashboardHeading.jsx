import React from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { ellipsisWithTooltip } from '@/src/utils/tooltipEllipsis';

const DashboardHeading = ({ dashboardDescription, title, isLoading }) => {
  return isLoading ? (
    <Stack spacing={1.5} sx={{ width: { xs: '100%', md: '200px' } }}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
    </Stack>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'start' },
        gap: 1.4,
        my: 1,
        ml: 0.5,
      }}
    >
      <Tooltip title={ellipsisWithTooltip(title, 24) ? title : ''}>
        <Typography
          sx={{
            fontSize: { xs: '25px', md: '28px', lg: '30px', color: '#171717' },
            fontWeight: 600,
            color: '#171717',
            textAlign: { xs: 'center', sm: 'start' },
          }}
        >
          {`${title?.slice(0, 24)}${ellipsisWithTooltip(title, 24) ? '...' : ''}`}
        </Typography>
      </Tooltip>
      <Typography
        sx={{
          fontSize: { xs: '14px', lg: '14px' },
          fontWeight: 400,
          color: '#595959',
          textAlign: { xs: 'center', sm: 'start' },
        }}
      >
        {dashboardDescription || ''}
      </Typography>
    </Box>
  );
};

export default DashboardHeading;
