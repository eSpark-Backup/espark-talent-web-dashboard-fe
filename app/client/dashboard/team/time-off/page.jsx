'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';

import Input from '@/src/components/dashboard/input';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { leaveRequestsTab } from '@/src/constants/data/tabs/timeOffTabs';
import {
  checkInOutColumn,
  checkInOutRequestData,
  leaveBalanceColumn,
  leaveBalanceData,
  leaveRequestsColumn,
  leaveRequestsData,
} from '@/src/constants/data/tables/timeOffRequest';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import Link from 'next/link';
import LeaveViewModal from './LeaveViewModal';
import PunchViewModal from './PunchViewModal';
import AppTable from '@/src/components/appTable/AppTable';
import { TIME_REQUEST } from '@/src/constants/timeSheet';
import { useQuery } from '@tanstack/react-query';
import {
  CLIENT_LEAVE_BALANCE,
  CLIENT_LEAVE_REQUEST,
  CLIENT_TIME_OFF,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchLeaveBalanceRequestFailed,
  fetchLeaveBalanceRequestSuccess,
  fetchLeaveRequestsFailed,
  fetchLeaveRequestsSuccess,
  fetchTimeOffRequestFailed,
  fetchTimeOffRequestSuccess,
} from '@/src/redux/slices/clientSlices/timeOffSlice';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import TimeOffTabs from './TimeOffTabs';
import RequestStatusTabs from './RequestStatusTabs';
import PageHeader from './PageHeader';

const Dashboard = () => {
  const { data, tabData } = useSelector((state) => state?.client?.timeOff);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const [search, setSearch] = useState('');
  // const [searchLeaveRequest, setSearchLeaveRequest] = useState('');
  // const [searchCheckInOutRequest, setSearchCheckInOutRequest] = useState('');
  // const [leaveBalanceDataState, setLeaveBalanceDataState] = useState(
  //   filterTableRowsWRTTab(leaveBalanceData, { status: '' })
  // );

  const [open, setOpen] = useState(false);
  const [openPunch, setOpenPunch] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log({ modalData });
    setOpen(false);
  };
  const handleClosePunch = () => setOpenPunch(false);
  const [leaveRequestDataState, setLeaveRequestDataState] = useState(
    filterTableRowsWRTTab(leaveRequestsData, { status: '' })
  );
  const [checkInOutRequestDataState, setCheckInOutRequestDataState] = useState(
    filterTableRowsWRTTab(checkInOutRequestData, { status: '' })
  );
  const [modalData, setModalData] = useState({});

  const fetchDataFake = async () => {
    return true;
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);
  const handleClickActionView = (props) => {
    const {
      item,
      row,
      row: { status, employeeName, count, leaveType },
    } = props;
    console.log({ item, row, status, count, leaveType, employeeName });
    setModalData({ item, ...row });
    if (tabData?.currentReqTypeTab === 'Leave Requests') {
      setOpen(true);
    } else if (tabData?.currentReqTypeTab === 'Clockin/Out Requests') {
      setOpenPunch(true);
    } else return;
  };
  const leaveRequestQuery = useQuery({
    staleTime: 10000,
    queryKey: ['leaveRequests'],
    queryFn: async () => {
      const { data } = await api.getData(`${CLIENT_LEAVE_REQUEST}?status=all`);
      dispatch(fetchLeaveRequestsSuccess(data || []));
      return data;
    },
  });
  const timeOffQuery = useQuery({
    staleTime: 10000,
    queryKey: ['timeOffRequests'],
    queryFn: async () => {
      const { data } = await api.getData(`${CLIENT_TIME_OFF}?status=all`);
      dispatch(fetchTimeOffRequestSuccess(data || []));
      return data;
    },
  });
  const leaveBalanceQuery = useQuery({
    staleTime: 10000,
    queryKey: ['leaveBalanceRequests'],
    queryFn: async () => {
      const { data } = await api.getData(`${CLIENT_LEAVE_BALANCE}`);
      dispatch(fetchLeaveBalanceRequestSuccess(data || []));
      return data;
    },
  });
  useEffect(() => {
    if (timeOffQuery.isError) {
      dispatch(fetchTimeOffRequestFailed());
    }
    if (leaveRequestQuery.isError) {
      dispatch(fetchLeaveRequestsFailed());
    }
    if (leaveBalanceQuery.isError) {
      dispatch(fetchLeaveBalanceRequestFailed());
    }
  }, [
    timeOffQuery.isError,
    leaveRequestQuery.isError,
    leaveBalanceQuery.isError,
  ]);
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <div>
            <PageHeader />
            <Box sx={{ width: '100%' }}>
              <TimeOffTabs />
              <RequestStatusTabs />
              {(tabData?.currentReqTypeTab === 'Leave Requests' ||
                tabData?.currentReqTypeTab === 'Clockin/Out Requests') &&
                renderNestedTable({
                  isLoading,
                  currentReqStatusTabVal: tabData?.currentReqStatusTabVal,
                  currentReqStatusTab: tabData?.currentReqStatusTab,
                  handleOpen,
                  column:
                    tabData?.currentReqTypeTab === 'Leave Requests'
                      ? leaveRequestsColumn
                      : checkInOutColumn,
                  data:
                    tabData?.currentReqTypeTab === 'Leave Requests'
                      ? data?.leaveRequest
                      : data?.clockInOutRequests,
                  currentReqTypeTab: tabData?.currentReqTypeTab,
                  handleClickActionView,
                })}
            </Box>
          </div>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LeaveViewModal modalData={modalData} handleClose={handleClose} />
      </Modal>
      <Modal
        open={openPunch}
        onClose={handleClosePunch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PunchViewModal modalData={modalData} handleClose={handleClosePunch} />
      </Modal>
    </>
  );
};
export default Dashboard;
