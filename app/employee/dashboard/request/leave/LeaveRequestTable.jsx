import { employeeLeaveRequestsColumn } from '@/src/constants/data/tables/requestsData';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { renderNestedTable } from './renderComponents';

const LeaveRequestTable = ({
  tabVal,
  tab,
  handleOpen,
  handleOpenModal,
  handleClickView,
  handleClickDelete,
}) => {
  const { data, isLoading } = useSelector((state) => state?.emp?.leaveReq);
  const [leaveRequestDataState, setLeaveRequestDataState] = useState([]);
  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr.map((item) => ({
        ...item,
        actions: item?.status === 'pending' ? ['Delete', 'View'] : ['View'],
      }));
      return tempData;
    }
    return [];
  };
  useEffect(() => {
    setLeaveRequestDataState(
      filterTableRowsWRTTab(reformData(data?.requests), { status: '' })
    );
  }, [data]);
  if (isLoading) return 'Loading...';
  return renderNestedTable({
    currentReqStatusTabVal: tabVal,
    currentReqStatusTab: tab,
    handleOpen,
    column: employeeLeaveRequestsColumn,
    data: leaveRequestDataState,
    // data: [],
    handleOpenConditionalModal: handleOpenModal,
    handleClickActionView: handleClickView,
    handleClickActionDelete: handleClickDelete,
  });
};

export default LeaveRequestTable;
