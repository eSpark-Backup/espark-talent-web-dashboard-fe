'use client';
import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  HR_LEAVE_REQUEST,
  HR_PUNCH_REQUEST,
  HR_WFH_REQUEST,
} from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { EmployeeRequestsTabs } from '@/src/constants/data/tabs/RequestTab';
import LeaveViewModal from '@/app/client/dashboard/team/time-off/LeaveViewModal';
import WfhViewModal from '@/app/client/dashboard/team/time-off/WfhViewModal';

import {
  getEmpRequest,
  getEmpRequestFailed,
  getEmpRequestSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { renderTable } from '@/app/hr/dashboard/clients/[id]/renderComponents';
import dayjs from 'dayjs';
import PunchRequestModal from '@/app/employee/dashboard/request/punch-requests/PunchRequestModal';
import { useSearchParams } from 'next/navigation';

const Request = () => {
  const [value, setValue] = useState(0);
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [openLeave, setOpenLeave] = useState(false);
  const [openPunch, setOpenPunch] = useState(false);
  const [openWfh, setOpenWfh] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentTab, setCurrentTab] = useState('Leave');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const param = searchParams.get('param');

  const { data: leaveData, isLoading: leaveLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-employee-get-leave-request', currentEmployee?.email],
    queryFn: async () => {
      try {
        if (!currentEmployee?.email) {
          return [];
        }

        dispatch(getEmpRequest());

        const { data } = await api.getData(
          `${HR_LEAVE_REQUEST}?emp_email=${currentEmployee?.email}`
        );

        const tempRequest =
          data === '' || !data.length
            ? []
            : data.map((item) => ({
                ...item,
                actionStatus: true,
                requested_at: dayjs(item?.requested_at).format(
                  'MMMM D, YYYY hh:mm A'
                ),
                actions: ['View'],
              }));

        dispatch(
          getEmpRequestSuccess({
            type: 'leave',
            data: tempRequest,
          })
        );

        return tempRequest || [];
      } catch (err) {
        dispatch(getEmpRequestFailed());
        Toast('error', err.message || 'Failed to get data');
        return [];
      }
    },
  });

  const { data: punchData, isLoading: punchLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-employee-get-punch-request', currentEmployee?.email || ''],
    queryFn: async () => {
      dispatch(getEmpRequest());
      return api
        .getData(
          `${HR_PUNCH_REQUEST}?emp_email=${currentEmployee?.email || ''}`
        )
        .then(({ data }) => {
          const tempRequest =
            data === '' || !data.length
              ? []
              : data?.map((item) => ({
                  ...item,
                  actionStatus: true,
                  date: dayjs(item?.date)?.format('MMMM D, YYYY'),
                  punch_time: dayjs(item?.punch_time, 'hh:mm:ss A')?.format(
                    'hh:mm A'
                  ),
                  actions: ['View'],
                }));
          dispatch(
            getEmpRequestSuccess({
              type: 'punch',
              data: tempRequest,
            })
          );
          return tempRequest || [];
        })
        .catch((err) => {
          dispatch(getEmpRequestFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
    enabled: !!currentEmployee?.email,
  });

  const { data: wfhData, isLoading: wfhLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: [
      'hr-employee-get-wfh-request',
      currentEmployee?.email,
      employee_perms?.read,
    ],
    queryFn: async () => {
      dispatch(getEmpRequest());
      return api
        .getData(`${HR_WFH_REQUEST}?e_email=${currentEmployee?.email}`)
        .then(({ data }) => {
          console.log(
            data?.map((item) =>
              dayjs(item?.start_date)?.format('MMMM D, YYYY')
            ),
            'data pppp'
          );
          const tempRequest =
            data === '' || !data.length
              ? []
              : data?.map((item) => ({
                  ...item,
                  date: dayjs(item?.start_date)?.format('MMMM D, YYYY'),
                  actionStatus: true,
                  actions: [
                    item?.status === 'pending' &&
                    (role === 'super_admin' || employee_perms?.write)
                      ? 'Reject'
                      : null,
                    item?.status === 'pending' &&
                    (role === 'super_admin' || employee_perms?.write)
                      ? 'Approve'
                      : null,
                    'View',
                  ]?.filter(Boolean),
                }));
          dispatch(
            getEmpRequestSuccess({
              type: 'whf',
              data: tempRequest,
            })
          );
          return tempRequest || [];
        })
        .catch((err) => {
          dispatch(getEmpRequestFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateData(`${data?.endpoint}?id=${data?.id}`, data?.data);
    },
    onSuccess: () => {
      queryClient?.invalidateQueries(['hr-employee-get-wfh-request']);
      Toast('success', 'Request updated successfully');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });

  const handleApproveRequest = (props) => {
    updateRequestMutation?.mutate({
      endpoint: HR_WFH_REQUEST,
      id: props.id,
      data: { status: 'completed' },
    });
  };

  const handleRejectRequest = (props) => {
    updateRequestMutation?.mutate({
      endpoint: HR_WFH_REQUEST,
      id: props.id,
      data: { status: 'rejected' },
    });
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    let tab = event?.target?.innerText.split(' ');
    if (tab.length > 1) {
      tab = tab.slice(0, -1).join(' ');
    } else {
      tab = tab.join(' ');
    }
    setCurrentTab(tab);
    setValue(newValue);
  };
  const handleOpenLeaveModal = () => {
    setOpenLeave(true);
  };
  const handleOpenWfhModal = () => {
    setOpenWfh(true);
  };
  const handleOpenPunchModal = () => {
    setOpenPunch(true);
  };
  const handleCloseModal = () => {
    setOpenPunch(false);
    setOpenWfh(false);
    setOpenLeave(false);
  };
  const handleClickEdit = (a) => {
    setModalData(a);
    if (value === 0) {
      handleOpenLeaveModal();
    } else if (value === 1) {
      handleOpenWfhModal();
    } else {
      handleOpenPunchModal();
    }
  };
  const handleClose = () => {
    setOpenPunch(false);
    setOpenWfh(false);
    setOpenLeave(false);
  };

  useEffect(() => {
    if (param === 'wfh_request') {
      setValue(1);
      setCurrentTab('WFH');
    }
  }, []);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box
          display={'flex'}
          alignItems={'center'}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mt: '8px',
            justifyContent: 'space-between',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
          >
            {EmployeeRequestsTabs?.map(({ label, prop }, index) => (
              <Tab
                key={index}
                label={`${label}`}
                {...prop}
                disableRipple={true}
                sx={{
                  marginRight: '30px',
                  color: '#595959',
                  textTransform: 'math-auto',
                  '&.Mui-selected': {
                    color: '#068987',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box mt={4}>
          {EmployeeRequestsTabs?.map((tab, i) => (
            <CustomTabPanel value={value} key={i} index={i}>
              <Box
                sx={{
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                {renderTable({
                  minWidth: '1200px',
                  column: tab?.columns,
                  currentTab: currentTab,
                  data: currentTab?.includes('Leave')
                    ? leaveData
                    : currentTab?.includes('Punch')
                      ? punchData
                      : currentTab?.includes('WFH')
                        ? wfhData
                        : [],
                  handleClickActionView: handleClickEdit,
                  approveReq: handleApproveRequest,
                  rejectReq: handleRejectRequest,
                  tableRowClass: 'app-table-row-contract',
                  isLoading: currentTab?.includes('Leave')
                    ? leaveLoading
                    : currentTab?.includes('Punch')
                      ? punchLoading
                      : currentTab?.includes('WFH')
                        ? wfhLoading
                        : false,
                })}
              </Box>
            </CustomTabPanel>
          ))}
        </Box>
      </Box>
      <Modal
        open={openLeave}
        onClose={handleCloseModal}
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
          modalData={{
            ...modalData?.row,
            status: '',
            employee_image: currentEmployee?.image_path || '',
          }}
          handleClose={handleClose}
        />
      </Modal>
      <Modal
        open={openWfh}
        onClose={handleCloseModal}
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
        <WfhViewModal
          title={'WFH request view'}
          modalData={{
            ...modalData?.row,
            date: dayjs(modalData?.row?.date)?.format('MMMM D, YYYY'),
          }}
          handleClose={handleClose}
          handleApproveRequest={handleApproveRequest}
          handleRejectRequest={handleRejectRequest}
        />
      </Modal>
      <Modal
        open={openPunch}
        onClose={handleCloseModal}
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
        <PunchRequestModal
          modalData={{
            ...modalData?.row,
            date: dayjs(modalData?.row?.date)?.format('MMMM D, YYYY'),
          }}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
};
export default Request;
