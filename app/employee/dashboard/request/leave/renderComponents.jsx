import AppTable from '@/src/components/appTable/AppTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Box } from '@mui/material';

export const renderNestedTable = ({
  currentReqStatusTabVal,
  currentReqStatusTab,
  column,
  data,
  handleOpen,
  handleOpenConditionalModal,
  handleClickActionView,
  handleClickActionDelete,
}) => {
  return (
    <CustomTabPanel
      value={currentReqStatusTabVal}
      index={currentReqStatusTabVal}
    >
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
          handleOpenConditionalModal={handleOpenConditionalModal}
          handleClickActionView={handleClickActionView}
          handleClickActionDelete={handleClickActionDelete}
        />
      </Box>
    </CustomTabPanel>
  );
};
