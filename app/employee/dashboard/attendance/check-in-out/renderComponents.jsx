import { Box, Typography } from '@mui/material';
import React from 'react';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import AppTable from '@/src/components/dashboard/appTable';
import { filterTableRowsWRTTab } from '@/src/utils/table';

export const renderTrackingStatus = ({
  statusIndex,
  label,
  background,
  shortForm,
}) => {
  return (
    <Box display={'flex'} alignItems={'center'} key={statusIndex}>
      <Box
        sx={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background,
          color: '#fff',
        }}
        display={'flex'}
        fontSize={'12px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {shortForm}
      </Box>
      <Typography variant="caption" marginX={'10px'}>
        {label}
      </Typography>
    </Box>
  );
};

export const renderNestedTable = ({
  isLoading,
  currentReqStatusTabVal,
  currentReqStatusTab,
  column,
  data,
}) => {
  return (
    <CustomTabPanel
      value={currentReqStatusTabVal}
      index={currentReqStatusTabVal}
    >
      <AppTable
        currentTab={currentReqStatusTab}
        column={column}
        data={filterTableRowsWRTTab(data, {
          status: currentReqStatusTab === 'All' ? '' : currentReqStatusTab,
        })}
      />
    </CustomTabPanel>
  );
};
