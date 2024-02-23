import React from 'react';
import { Box, Typography } from '@mui/material';

import { Summary_Boxes } from '@/src/constants/data/hrDashboard';
import StatusBox from '../AtttendanceSummary/StatusBox';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_HOME } from '@/src/services/apiService/apiEndPoints';

const HrAccess = ({ isHr }) => {
  const { data, isLoading } = useQuery({
    staleTime: 10000,
    queryFn: () => {
      const response = api.getData(HR_HOME);
      return response.then((respData) => {
        const tempData = JSON.parse(JSON.stringify(Summary_Boxes)).map(
          (item) => ({
            ...item,
            count: respData?.data[item.name],
          })
        );
        return tempData;
      });
    },
  });
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
      {isLoading ? (
        <Typography>Loading ...</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '40px',
            paddingLeft: { xs: '0px', md: '50px' },
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
      )}
    </Box>
  );
};
export default HrAccess;
