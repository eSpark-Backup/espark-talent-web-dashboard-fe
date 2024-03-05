import React, { useEffect, useState } from 'react';
import AppTable from '@/src/components/appTableNew/AppTable';
import { employeeLeaveBalanceColumn } from '@/src/constants/data/tables/requestsData';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpLeaveRequestData } from '@/src/redux/slices/employeeSlices/leaveRequestSlice';

const LeaveBalanceTable = () => {
  const dispatch = useDispatch();
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { balance } = useSelector((state) => state?.emp?.leaveReq?.data);
  const query = useQuery({
    staleTime: 10000,
    queryFn: () => {
      return api
        .getData(`${EMP_LEAVE_REQUEST}/?workspace=${workSpace?.email || ''}`)
        .then(({ data }) => {
          dispatch(
            getEmpLeaveRequestData({
              ...data,
              balance: reformData(data?.balance),
            })
          );
          return data;
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
  if (query?.isLoading) return 'Loading...';
  return (
    <AppTable column={employeeLeaveBalanceColumn} data={balance} noPagination />
  );
};

export default LeaveBalanceTable;
