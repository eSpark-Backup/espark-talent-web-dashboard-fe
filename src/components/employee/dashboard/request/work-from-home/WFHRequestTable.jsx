import Skeleton from '@mui/material/Skeleton';
import { employeeWFHRequestsColumn } from '@/src/data/tables/requests-data';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { WFHRequestRenderComponents } from '@/src/components/employee/dashboard/request/work-from-home/WFHRequestRenderComponents';
import dayjs from 'dayjs';

const WFHRequestTable = ({
  minWidth,
  tabVal,
  tab,
  handleOpen,
  handleOpenModal,
  handleClickView,
  handleClickDelete,
  leaveRequestDataState,
  setLeaveRequestDataState,
  commonRowStyle,
  viewClicked,
}) => {
  const { data, isLoading } = useSelector((state) => state?.emp?.wfhReq);
  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr?.map((item) => ({
        ...item,
        actions: item?.status === 'pending' ? ['Delete', 'View'] : ['View'],
        start_date: dayjs(item?.start_date)?.format('MMMM D, YYYY'),
        end_date: dayjs(item?.end_date)?.format('MMMM D, YYYY'),
      }));
      return tempData;
    }
    return [];
  };
  useEffect(() => {
    setLeaveRequestDataState(
      filterTableRowsWRTTab(reformData(data?.requests), { status: '' })
    );
  }, [data, tabVal]);

  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        width={'100%'}
        height={40}
        sx={{ background: '#F6F6F6' }}
      />
    );
  }
  return WFHRequestRenderComponents({
    minWidth: minWidth,
    currentReqStatusTabVal: tabVal,
    currentReqStatusTab: tab,
    handleOpen,
    column: employeeWFHRequestsColumn,
    data: leaveRequestDataState || [],
    handleOpenConditionalModal: handleOpenModal,
    handleClickActionView: handleClickView,
    handleClickActionDelete: handleClickDelete,
    isLoading,
    commonRowStyle,
    viewClicked,
  });
};

export default WFHRequestTable;
