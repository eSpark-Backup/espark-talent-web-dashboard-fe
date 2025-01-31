import React from 'react';
import { Box, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { employeeOfficialDataLabel } from '@/src/constants/employeeProfile';

const OfficialInformation = ({ data }) => {
  return (
    <>
      <Box>
        {employeeOfficialDataLabel
          ?.filter(
            (empData) =>
              !(
                (empData?.name === 'probation_started' ||
                  empData?.name === 'probation_ended') &&
                (data?.status === 'Part-Time' || data?.status === 'Permanent')
              )
          )
          ?.map((empData, index) => (
            <Typography
              component={'span'}
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
              key={index}
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
                    textAlign: 'center',
                  },
                }}
              >
                {empData?.label}
              </Typography>
              <Typography
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
                  textTransform:
                    empData?.name === 'employee_id' ||
                    data?.[empData?.name]?.includes('@')
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

export default OfficialInformation;
