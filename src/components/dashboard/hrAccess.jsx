import { Box } from '@mui/material';
import React from 'react';
import { Summary_Boxes } from '@/src/constants/data/hrDashboard';
import StatusBox from '../AtttendanceSummary/StatusBox';

const HrAccess = ({ hrView }) => {
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
        }}
      >
        {Summary_Boxes?.map((item, index) => (
          <StatusBox
            key={index}
            title={item?.title}
            count={item?.count}
            horizotalLineColor={item?.horizotalLineColor}
            backgroundColor={item?.backgroundColor}
            image={item?.image}
            hrView={hrView}
          />
        ))}
      </Box>
    </Box>
  );
};
export default HrAccess;
