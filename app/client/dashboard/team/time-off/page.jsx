'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Modal } from '@mui/material';

import {
  checkInOutColumn,
  leaveRequestsColumn,
} from '@/src/constants/data/tables/timeOffRequest';
import { renderNestedTable } from './renderComponents';
import LeaveViewModal from './LeaveViewModal';
import PunchViewModal from './PunchViewModal';
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
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const { data, tabData } = useSelector((state) => state?.client?.timeOff);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
      return await api
        .getData(`${CLIENT_LEAVE_REQUEST}?status=all`)
        .then(({ data }) => {
          dispatch(fetchLeaveRequestsSuccess(data || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const timeOffQuery = useQuery({
    staleTime: 10000,
    queryKey: ['timeOffRequests'],
    queryFn: async () => {
      return api
        .getData(`${CLIENT_TIME_OFF}?status=all`)
        .then(({ data }) => {
          dispatch(fetchTimeOffRequestSuccess(data || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const leaveBalanceQuery = useQuery({
    staleTime: 10000,
    queryKey: ['leaveBalanceRequests'],
    queryFn: async () => {
      return await api
        .getData(`${CLIENT_LEAVE_BALANCE}`)
        .then(({ data }) => {
          dispatch(fetchLeaveBalanceRequestSuccess(data || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
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
