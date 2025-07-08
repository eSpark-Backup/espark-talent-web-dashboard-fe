import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { employeeOfficialDataLabel } from '@/src/constants/employee-profile';
import { ellipsisWithTooltip } from '@/src/utils/tooltipEllipsis';

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
              <Tooltip
                title={
                  ellipsisWithTooltip(data?.[empData?.name], 24)
                    ? `${data?.[empData?.name]}`
                    : ''
                }
              >
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
                    : `${data?.[empData?.name]?.slice(0, 24)}${
                        ellipsisWithTooltip(data?.[empData?.name], 24)
                          ? '...'
                          : ''
                      }`}
                </Typography>
              </Tooltip>
            </Typography>
          ))}
      </Box>
    </>
  );
};

export default OfficialInformation;
