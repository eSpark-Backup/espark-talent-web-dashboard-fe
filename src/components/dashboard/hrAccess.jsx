import React from 'react';
import { Box } from '@mui/material';

import StatusBox from '../AtttendanceSummary/StatusBox';

const HrAccess = ({ isHr, data }) => {
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
          data?.map((item, index) => (
            <StatusBox
              key={index}
              title={item?.title}
              count={item?.count}
              horizontalLineColor={item?.horizontalLineColor}
              backgroundColor={item?.backgroundColor}
              image={item?.image}
              isHr={isHr}
            />
          ))}
      </Box>
    </Box>
  );
};
export default HrAccess;
