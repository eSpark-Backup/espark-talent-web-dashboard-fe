'use client';
import { useEffect, useState } from 'react';

import {
  Grid,
  Box,
  Modal,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import {
  checkInOutColumn,
  leaveRequestsColumn,
} from '@/src/data/tables/time-off-request';
import { renderNestedTable } from '@/src/components/client/dashboard/team/time-off/renderComponents';
import LeaveViewModal from '@/src/components/client/dashboard/team/time-off/LeaveViewModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CLIENT_LEAVE_BALANCE,
  CLIENT_LEAVE_REQUEST,
  CLIENT_TIME_OFF,
  DOWNLOAD_REPORT,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchLeaveBalanceRequestFailed,
  fetchLeaveBalanceRequestSuccess,
  fetchLeaveRequestsFailed,
  fetchLeaveRequestsSuccess,
  fetchTimeOffRequestFailed,
  fetchTimeOffRequestSuccess,
  updateLeaveRequest,
  updateTimeOffRequests,
} from '@/src/redux/slices/clientSlices/timeOffSlice';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import TimeOffTabs from '@/src/components/client/dashboard/team/time-off/TimeOffTabs';
import RequestStatusTabs from '@/src/components/client/dashboard/team/time-off/RequestStatusTabs';
import { Toast } from '@/src/utils/toast';
import DashboardHeading from '@/src/components/dashboard/DashboardHeading';
import { TIME_REQUEST } from '@/src/constants/time-sheet';
import dayjs from 'dayjs';
import PunchRequestDataView from '@/src/components/employee/dashboard/request/punch-requests/PunchRequestFormView';
import { formatTimeToHHMM } from '@/src/utils';

const Page = () => {
  const { data, tabData } = useSelector((state) => state?.client?.timeOff);
  const { c_email } = useSelector((state) => state?.client?.home?.data);
  const [leaveRequestDataState, setLeaveRequestDataState] = useState([]);
  const [clockInOutDataState, setClockInOutDataState] = useState([]);
  useEffect(() => {
    setLeaveRequestDataState(data?.leaveRequest);
    setClockInOutDataState(data?.clockInOutRequests);
  }, [data?.leaveRequest, data?.clockInOutRequests]);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [updatingLeaveRequest, setUpdatingLeaveRequest] = useState(null);
  const [openPunch, setOpenPunch] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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

  const handleClickActionView = (_, column, row) => {
    setViewClicked(true);
    setModalData({ ...row });
    if (tabData?.currentReqTypeTab === 'Leave Requests') {
      setOpen(true);
    } else if (tabData?.currentReqTypeTab === 'Clockin/out Requests') {
      setOpenPunch(true);
    } else return;
  };

  const updateRequestMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(`${data?.endpoint}?id=${data?.id}`, data?.data);
    },
    onSuccess: () => {
      if (tabData?.currentReqTypeTab === 'Leave Requests') {
        dispatch(updateLeaveRequest(updatingLeaveRequest));
      } else {
        dispatch(updateTimeOffRequests(updatingLeaveRequest));
      }
      Toast('success', 'Request updated successfully');
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to delete data');
    },
  });

  const handleApproveRequest = (props) => {
    setUpdatingLeaveRequest({
      id: props?.id,
      status: 'completed',
    });

    if (tabData?.currentReqTypeTab === 'Leave Requests' && props?.id !== null) {
      updateRequestMutation?.mutate({
        endpoint: CLIENT_LEAVE_REQUEST,
        id: props?.id,
        data: { status: 'completed' },
      });
    } else {
      updateRequestMutation?.mutate({
        endpoint: CLIENT_TIME_OFF,
        id: props?.id,
        data: { status: 'completed' },
      });
    }
  };

  const handleRejectRequest = (props) => {
    setUpdatingLeaveRequest({
      id: props?.id,
      status: 'rejected',
    });
    if (tabData?.currentReqTypeTab === 'Leave Requests' && props?.id !== null) {
      updateRequestMutation?.mutate({
        endpoint: CLIENT_LEAVE_REQUEST,
        id: props?.id,
        data: { status: 'reject' },
      });
    } else {
      updateRequestMutation?.mutate({
        endpoint: CLIENT_TIME_OFF,
        id: props?.id,
        data: { status: 'rejected' },
      });
    }
  };

  const leaveRequestQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['leaveRequests', c_email],
    queryFn: async () => {
      try {
        const response = await api.getData(
          `${CLIENT_LEAVE_REQUEST}?status=all`
        );
        const data = response.data || [];
        const tempData = data.map((item) => ({
          ...item,
          actionStatus: true,
          requested_at: dayjs(item?.requested_at).format(
            'MMMM D, YYYY hh:mm A'
          ),
          actions: [
            item?.status === 'pending' ? 'Reject' : null,
            item?.status === 'pending' ? 'Approve' : null,
            'View',
          ],
        }));
        dispatch(fetchLeaveRequestsSuccess(tempData));
        return tempData;
      } catch (err) {
        Toast('error', err?.message || 'Failed to get data');
        return [];
      }
    },
    enabled: !!c_email,
  });

  const timeOffQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['timeOffRequests', c_email],
    queryFn: async () => {
      try {
        const response = await api.getData(`${CLIENT_TIME_OFF}?status=all`);
        const tempData =
          response.data === ''
            ? []
            : response.data?.map((item) => ({
                ...item,
                actionStatus: true,
                date: dayjs(item?.date)?.format('DD-MMMM-YYYY'),
                punch_time: formatTimeToHHMM(item?.punch_time, 'hh:mm:ss A'),
                actions: [
                  item?.status === 'pending' ? 'Reject' : null,
                  item?.status === 'pending' ? 'Approve' : null,
                  'View',
                ],
              })) || [];

        dispatch(fetchTimeOffRequestSuccess(tempData));
        return tempData;
      } catch (err) {
        Toast('error', err?.message || 'Failed to get data');
        return [];
      }
    },
    enabled: !!c_email,
  });

  const leaveBalanceQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['leaveBalanceRequests', c_email],
    queryFn: async () => {
      try {
        const response = await api.getData(`${CLIENT_LEAVE_BALANCE}`);
        const data = response.data || [];
        dispatch(fetchLeaveBalanceRequestSuccess(data));
        return data;
      } catch (err) {
        Toast('error', err?.message || 'Failed to get data');
        return [];
      }
    },
    enabled: !!c_email,
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
  const resolveURL = () => {
    let url;
    if (tabData?.currentReqTypeTab === 'Leave Requests') {
      url = `${DOWNLOAD_REPORT}?tab=lr`;
    } else if (tabData?.currentReqTypeTab === 'Clockin/out Requests') {
      url = `${DOWNLOAD_REPORT}?tab=cio`;
    } else {
      url = `${DOWNLOAD_REPORT}?tab=lb`;
    }
    return url;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return api.downloadFile(resolveURL());
    },
    onSuccess: ({ data }) => {
      const url = window?.URL?.createObjectURL(new Blob([data]));
      const link = document?.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err?.message || 'File not downloaded');
    },
  });
  const handleDownloadReport = () => {
    mutate();
  };

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', sm: 'space-between' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                width: '100%',
                pb: { xs: 3, sm: 1.5 },
              }}
            >
              <DashboardHeading
                title={`Time off Request`}
                dashboardDescription={TIME_REQUEST?.manage}
              />
              <Button
                sx={{
                  minWidth: { xs: '100%', sm: '220px' },
                  color: '#029894',
                  border: `1px solid ${
                    isPending ||
                    !tabData ||
                    !tabData.currentReqTypeTab ||
                    (tabData.currentReqTypeTab === 'Leave Requests' &&
                      !data?.leaveRequest?.length) ||
                    (tabData.currentReqTypeTab === 'Leave Balance' &&
                      !data?.leaveRequest?.length) ||
                    !data?.clockInOutRequests?.length ||
                    (tabData.currentReqTypeTab === 'Clockin/out Requests' &&
                      !data?.clockInOutRequests?.length)
                      ? '#ccc'
                      : '#029894'
                  }`,
                  fontSize: '16px',
                  fontWeight: '600',
                  mt: '10px',
                  '&:hover': {
                    background: isPending ? '' : '#E6F5F4',
                  },
                }}
                onClick={handleDownloadReport}
                disabled={
                  isPending ||
                  !tabData ||
                  !tabData.currentReqTypeTab ||
                  (tabData.currentReqTypeTab === 'Leave Requests' &&
                    !data?.leaveRequest?.length) ||
                  (tabData.currentReqTypeTab === 'Leave Balance' &&
                    !data?.leaveRequest?.length) ||
                  !data?.clockInOutRequests?.length ||
                  (tabData.currentReqTypeTab === 'Clockin/out Requests' &&
                    !data?.clockInOutRequests?.length)
                }
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  TIME_REQUEST?.downloadReport
                )}
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <TimeOffTabs />
              <RequestStatusTabs
                setLeaveRequestDataState={setLeaveRequestDataState}
                setClockInOutDataState={setClockInOutDataState}
                refreshLeaveRequest={leaveRequestQuery}
                refreshClockInRequest={timeOffQuery}
                currentTab={tabData?.currentReqTypeTab}
              />
              {(tabData?.currentReqTypeTab === 'Leave Requests' ||
                tabData?.currentReqTypeTab === 'Clockin/out Requests') &&
                renderNestedTable({
                  minWidth: '1250px',
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
                      ? !leaveRequestDataState?.length
                        ? data?.leaveRequest
                        : leaveRequestDataState || []
                      : !clockInOutDataState?.length
                        ? data?.clockInOutRequests
                        : clockInOutDataState || [],
                  currentReqTypeTab: tabData?.currentReqTypeTab,
                  handleClickActionView,
                  viewClicked,
                  approveReq: handleApproveRequest,
                  rejectReq: handleRejectRequest,
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
        disableScrollLock
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LeaveViewModal
          modalData={modalData}
          handleClose={handleClose}
          handleApproveRequest={handleApproveRequest}
          handleRejectRequest={handleRejectRequest}
        />
      </Modal>
      <Modal
        open={openPunch}
        onClose={handleClosePunch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            bgcolor: '#fff',
            maxWidth: '1480px',
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            maxHeight: '82%',
            overflow: 'auto',
            scrollbarWidth: 'none',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              borderBottom: '1px solid #E4E4E4',
              p: 2,
              px: 3,
            }}
          >
            <Typography
              sx={{
                textAlign: { xs: 'center', sm: 'start' },
                fontSize: { xs: '23px', sm: '25px' },
                fontWeight: '600',
              }}
            >
              Punch request view
            </Typography>
          </Box>
          <PunchRequestDataView
            modalData={modalData}
            handleClose={handleClosePunch}
            handleApproveRequest={handleApproveRequest}
            handleRejectRequest={handleRejectRequest}
          />
        </Box>
      </Modal>
    </>
  );
};
export default Page;
