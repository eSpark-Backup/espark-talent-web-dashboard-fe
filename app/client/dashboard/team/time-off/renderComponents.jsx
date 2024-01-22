import AppTable from '@/src/components/appTable/AppTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Box, Typography } from '@mui/material';

export const renderNestedTable = ({
  isLoading,
  currentReqStatusTabVal,
  currentReqStatusTab,
  column,
  data,
  handleOpen,
  handleClickActionView,
}) => {
  return (
    <CustomTabPanel
      value={currentReqStatusTabVal}
      index={currentReqStatusTabVal}
    >
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          <AppTable
            currentTab={currentReqStatusTab}
            column={column}
            data={filterTableRowsWRTTab(data, {
              status: currentReqStatusTab === 'All' ? '' : currentReqStatusTab,
            })}
            handleOpen={handleOpen}
            handleClickActionView={handleClickActionView}
          />
        </Box>
      )}
    </CustomTabPanel>
  );
};
