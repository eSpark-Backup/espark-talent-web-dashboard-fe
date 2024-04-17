import React from 'react';
import { Box } from '@mui/material';

import StatusBox from '../AtttendanceSummary/StatusBox';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const HrAccess = ({ isHr, data, isLoading }) => {
  return (
    <Box
      sx={{
        px: { xs: 3, sm: 3, lg: 3 },
        py: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '40px',
          paddingLeft: { xs: '0px', md: '50px' },

          '@media (min-width: 900px) and (max-width: 1310px)': {
            flexWrap: 'wrap',
            '& > div': {
              flex: '0 0 calc(50% - 20px)',
              maxWidth: 'calc(50% - 20px)',
            },
          },
        }}
      >
        {isHr &&
          data?.map((item, index) =>
            isLoading ? (
              <Stack
                direction={'row'}
                key={index}
                sx={{
                  width: { xs: '100%', md: '100%' },
                  height: '110px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  background: 'rgb(249 250 251)',
                  '@media (min-width: 900px) and (max-width: 1290px)': {
                    height: '110px',
                  },
                }}
              >
                <Stack spacing={1.2} sx={{ justifyContent: 'center', pl: 3 }}>
                  <Stack spacing={0.5}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '0.2rem' }}
                      width={'27px'}
                    />
                    <Skeleton variant="text" width={25} height={30} />
                  </Stack>
                  <Skeleton variant="text" width={90} height={30} />
                </Stack>
                <Stack sx={{ justifyContent: 'center', pr: 3 }}>
                  <Stack>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Stack>
                </Stack>
              </Stack>
            ) : (
              <StatusBox
                key={index}
                title={item?.title}
                count={item?.count}
                horizontalLineColor={item?.horizontalLineColor}
                backgroundColor={item?.backgroundColor}
                image={item?.image}
                isHr={isHr}
              />
            )
          )}
      </Box>
    </Box>
  );
};
export default HrAccess;
