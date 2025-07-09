import AppTable from '@/src/components/app-table-new/AppTable';
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
  isLoading,
  viewClicked,
  minWidth,
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
          minWidth={minWidth}
          isLoading={isLoading}
          currentTab={currentReqStatusTab}
          column={column}
          data={filterTableRowsWRTTab(data, {
            status:
              currentReqStatusTab === 'All'
                ? ''
                : currentReqStatusTab?.toLowerCase(),
          })}
          handleOpen={handleOpen}
          handleOpenConditionalModal={handleOpenConditionalModal}
          handleClickActionView={handleClickActionView}
          handleClickActionDelete={handleClickActionDelete}
          viewClicked={viewClicked}
        />
      </Box>
    </CustomTabPanel>
  );
};
