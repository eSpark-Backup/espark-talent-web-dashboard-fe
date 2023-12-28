import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import AppTable from '@/src/components/dashboard/appTable';
import { filterTableRowsWRTTab } from '@/src/utils/table';

export const renderNestedTable = ({
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
