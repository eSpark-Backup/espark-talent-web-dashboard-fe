import { Box } from '@mui/material';
import React from 'react';
import SummarySlider from '../AtttendanceSummary/SummarySlider';
import { Summary_Boxes } from '@/src/constants/data/hrDashboard';

const HrAccess = () => {
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
      <SummarySlider Summary_Boxes={Summary_Boxes} isEmployee={false} />
    </Box>
  );
};
export default HrAccess;
