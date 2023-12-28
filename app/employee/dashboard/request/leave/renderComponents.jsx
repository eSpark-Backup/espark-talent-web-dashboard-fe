import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import AppTable from '@/src/components/dashboard/appTable';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Typography } from '@mui/material';

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
