import React from 'react';
import { Box, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import DownloadGuide from './DownloadGuide';

const GuideCard = ({ guideData, isLoading }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        maxWidth: '850px',
        width: '100%',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridTemplateColumns: guideData?.length === 1 ? '1fr' : 'repeat(2, 1fr)',
        '@media (min-width: 280px) and (max-width: 768px)': {
          gridTemplateRows: 'repeat(1, 1fr)',
          gridTemplateColumns: 'repeat(1, 1fr)',
          mx: 0,
        },
        justifyContent:
          guideData?.length === 1
            ? { xs: 'flex-start', lg: 'center' }
            : { xs: 'flex-start', lg: 'flex-start' },
        columnGap: 5.5,
        rowGap: 5.5,
        flexWrap: 'wrap',
        mx: 'auto',
      }}
    >
      {isLoading ? (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={5}
          sx={{
            width: '100%',
            display: 'flex',
            mx: 'auto',
          }}
        >
          <Stack
            spacing={5}
            sx={{
              minWidth: { xs: '100%', md: '400px' },
              width: '50%',
              minHeight: '300px',
              border: '1px solid #E4E4E4',
              borderRadius: '10px',
              alignItems: { xs: 'center', sm: 'start' },
              textAlign: { xs: 'center', sm: 'start' },
              padding: '40px 28px',
              '@media (min-width: 769px) and (max-width: 899px)': {
                width: '340px',
              },
              '@media (min-width: 800px) and (max-width: 1200px)': {
                maxWidth: '40%',
                display: 'flex',
                mx: 'auto',
              },
              '@media (min-width: 600px) and (max-width: 800px)': {
                maxWidth: '55%',
                display: 'flex',
                mx: 'auto',
              },
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Stack spacing={1} width={'30%'}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Stack>
            <Skeleton variant="rounded" width={120} height={40} />
          </Stack>
          <Stack
            spacing={5}
            sx={{
              minWidth: { xs: '100%', md: '400px' },
              width: '50%',
              minHeight: '300px',
              border: '1px solid #E4E4E4',
              borderRadius: '10px',
              alignItems: { xs: 'center', sm: 'start' },
              textAlign: { xs: 'center', sm: 'start' },
              padding: '40px 28px',
              '@media (min-width: 769px) and (max-width: 899px)': {
                width: '340px',
              },
              '@media (min-width: 800px) and (max-width: 1200px)': {
                maxWidth: '40%',
                display: 'flex',
                mx: 'auto',
              },
              '@media (min-width: 600px) and (max-width: 800px)': {
                maxWidth: '55%',
                display: 'flex',
                mx: 'auto',
              },
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Stack spacing={1} width={'30%'}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Stack>
            <Skeleton variant="rounded" width={120} height={40} />
          </Stack>
        </Stack>
      ) : (
        guideData?.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: { xs: 'start', lg: 'center' },
            }}
          >
            <DownloadGuide
              key={item?.id}
              id={item?.id}
              reportLanguage={item?.language || ''}
              image={'/images/guides/property-contract.svg'}
              reportHeading={item?.guide_name || ''}
              downloadReports={item?.description || ''}
              downloadBtn={'Download'}
              documentLink={item?.guide_doc}
              data={guideData}
              viewBtn={'View'}
            />
          </Box>
        ))
      )}
    </Box>
  );
};
export default GuideCard;
