import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import AppTable from '../dashboard/appTable';
import {
  ASSET_TABLECOLUMN,
  ASSET_TABLEDATA,
  employeeProfileData,
} from '@/src/constants/employeeProfile';

const Assets = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Box>{employeeProfileData?.loading}</Box>
      ) : (
        <>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <AppTable column={ASSET_TABLECOLUMN} data={ASSET_TABLEDATA} />
          </Box>
        </>
      )}
    </>
  );
};

export default Assets;
