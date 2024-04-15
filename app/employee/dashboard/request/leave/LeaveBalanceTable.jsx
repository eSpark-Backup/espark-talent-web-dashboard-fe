import React from 'react';
import AppTable from '@/src/components/appTableNew/AppTable';

import { employeeLeaveBalanceColumn } from '@/src/constants/data/tables/requestsData';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpLeaveRequestDataSuccess,
  fetchEmpLeaveRequestData,
  getEmpLeaveRequestDataFailed,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';
import { Toast } from '@/src/components/Toast/Toast';

const LeaveBalanceTable = () => {
  const dispatch = useDispatch();
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { balance } = useSelector((state) => state?.emp?.leaveReq?.data);
  const query = useQuery({
    // staleTime: 10000,
    queryFn: () => {
      dispatch(fetchEmpLeaveRequestData());
      return api
        .getData(`${EMP_LEAVE_REQUEST}/?workspace=${workSpace?.email || ''}`)
        .then(({ data }) => {
          console.log({ data });
          dispatch(
            getEmpLeaveRequestDataSuccess({
              ...data,
              balance: reformData(data?.balance),
            })
          );
          return data;
        })
        .catch((err) => {
          console.log({ err, query });
          Toast('error', err.message || 'Failed to get data');
          dispatch(getEmpLeaveRequestDataFailed());
        });
    },
  });
  const reformData = (dataObj) => {
    const arrayfiedData = Object.entries(dataObj);
    const refinedData = [];
    for (let i = 0; i < arrayfiedData.length; i++) {
      const element = arrayfiedData[i];
      if (i > 0) {
        refinedData.push({
          leave_type: element[0],
          pending: +element[1].total - +element[1].balance,
          available: +element[1].total - +element[1].balance,
          ...element[1],
        });
      }
    }
    return refinedData;
  };
  // useEffect(() => {
  //   if (Object?.keys(balance).length) {
  //     console.log({ refined: reformData(balance) });
  //     setLeaveBalanceDataState(reformData(balance));
  //   }
  // }, [data]);

  return (
    <AppTable
      column={employeeLeaveBalanceColumn}
      data={balance}
      noPagination
      minWidth={'700px'}
    />
  );
};

export default LeaveBalanceTable;
