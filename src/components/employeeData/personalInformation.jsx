import React from 'react';
import { Box, Typography } from '@mui/material';

import { employeePersonalDataLabel } from '@/src/constants/employeeProfile';
import dayjs from 'dayjs';

const PersonalInformation = ({ data }) => {
  return (
    <>
      <Box>
        {employeePersonalDataLabel?.map((empData, index) => (
          <Typography
            component={'span'}
            key={index}
            sx={{
              display: 'flex',
              gap: { xs: 3, sm: 3, md: 5 },
              mb: 1.5,
              '@media (max-width: 499px)': {
                borderTop: '1px solid #E4E4E4',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 0.5,
                pt: 1.5,
              },
            }}
          >
            <Typography
              sx={{
                width: { xs: '150px', sm: '150px' },
                minWidth: { xs: '150px', sm: '150px' },
                fontSize: {
                  xs: '12px',
                  sm: '13px',
                  md: '15px',
                  lg: '15px',
                  xl: '16px',
                },
                color: '#171717',
                fontWeight: 400,
                '@media (max-width: 499px)': {
                  width: 'auto',
                },
              }}
            >
              {empData?.label}
            </Typography>
            <Typography
              key={index}
              sx={{
                fontSize: {
                  xs: '12px',
                  sm: '13px',
                  md: '13px',
                  lg: '14px',
                  xl: '16px',
                },
                color: '#171717',
                fontWeight: 400,
                wordBreak: 'break-all',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                textTransform: data?.[empData?.name]?.includes('@')
                  ? 'lowercase'
                  : 'capitalize',
              }}
            >
              {empData?.type === 'date'
                ? dayjs(data?.[empData?.name]).format('DD/MM/YYYY')
                : data?.[empData?.name]}
            </Typography>
          </Typography>
        ))}
      </Box>
    </>
  );
};
export default PersonalInformation;
