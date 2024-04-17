import React from 'react';
import { Box, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import DownloadPolicies from './downloadPolicies';

const PoliciesCard = ({ data, isLoading }) => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          maxWidth: '900px',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridTemplateColumns: 'repeat(2, 1fr)',
          '@media (min-width: 280px) and (max-width: 768px)': {
            gridTemplateRows: 'repeat(1, 1fr)',
            gridTemplateColumns: 'repeat(1, 1fr)',
            mx: 0,
          },
          justifyContent: { xs: 'start', lg: 'center' },
          columnGap: 3.5,
          rowGap: 3.5,
          flexWrap: 'wrap',
          mx: 'auto',
        }}
      >
        {data.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'start', lg: 'center' },
            }}
          >
            {isLoading ? (
              <Stack
                spacing={3}
                sx={{
                  minWidth: { xs: '100%', md: '400px' },
                  width: '100%',
                  minHeight: '300px',
                  border: '1px solid #E4E4E4',
                  borderRadius: '10px',
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  textAlign: { xs: 'center', sm: 'start' },
                  padding: '40px 28px',
                  '@media (min-width: 769px) and (max-width: 899px)': {
                    width: '340px',
                  },
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Stack spacing={0.5} width={'100%'}>
                  <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: '1rem',
                      mx: 'auto',
                      width: { xs: '100%', sm: 120 },
                    }}
                  />
                </Stack>
                <Stack spacing={1} width={'100%'}>
                  <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
                </Stack>
                <Skeleton variant="rounded" width={120} height={40} />
              </Stack>
            ) : (
              <DownloadPolicies
                key={item.id}
                image={item.image}
                reportHeading={item.reportHeading}
                downloadReports={item.downloadReports}
                downloadBtn={item.downloadBtn}
              />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};
export default PoliciesCard;
