import React, { useState } from 'react';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { a11yProps } from '@/src/utils/tabs';
import AppTable from '../appTableNew/AppTable';
import {
  leavesColumn,
  leavesData,
  timeColumn,
} from '@/src/constants/data/tables/hr/timeAndLeaves';
import TimeManagementModal from '@/app/hr/dashboard/clients/client-profile/TimeManagementModal';
import LeaveManagementModal from '@/app/hr/dashboard/clients/client-profile/LeaveManagementModal';
import { FORM_DATA } from '@/src/constants/form';
import { useParams } from 'next/navigation';
import { api } from '@/src/services/apiService';
import { HR_EMP_TIME_AND_LEAVES } from '@/src/services/apiService/apiEndPoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Toast } from '../Toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHrEmpLeaves,
  getHrEmpTime,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const TimeAndLeaves = () => {
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);

  const { id } = useSelector((state) => state?.hr?.employees?.currentEmployee);
  const dispatch = useDispatch();
  const { time, leaves } =
    useSelector((state) => state?.hr?.employees?.timeAndLeaves) || {};
  const params = useParams();
  const [currentTab, setCurrentTab] = useState({
    label: 'Time',
    val: 0,
    data: [],
    column: timeColumn,
  });
  useEffect(() => {
    setCurrentTab({
      label: 'Time',
      val: 0,
      data: time,
      column: timeColumn,
    });
  }, []);
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  console.log(isLoadingMutation, 'isLoadingMutation');

  const preetyTime = (time) => {
    if (dayjs(time)?.format('hh:mm A') === 'Invalid Date') {
      return time;
    } else {
      return dayjs(time)?.format('hh:mm A');
    }
  };
  const { data: timeData, isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-time-profile', params?.id],
    queryFn: async () => {
      return api
        .getData(`${HR_EMP_TIME_AND_LEAVES}?id=${params?.id}&tab=time`)
        .then(({ data }) => {
          const tempData = [
            {
              check_in: preetyTime(data?.check_in),
              check_out: preetyTime(data?.check_out),
            },
          ];
          dispatch(getHrEmpTime(tempData));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
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
          ...element[1],
          leave_type: element[0],
          total: +element[1].total,
          availed: +element[1].availed,
          balance: +element[1].balance,
          status: element[1].status == 'enable' ? 'Enabled' : 'Disabled',
          isLeaveUpdateStatus: true,
        });
      }
    }
    return refinedData;
  };
  const { mutate } = useMutation({
    mutationFn: async (tab) => {
      setIsLoadingMutation(true);
      return api.getData(
        `${HR_EMP_TIME_AND_LEAVES}?id=${params?.id}&tab=${tab?.toLowerCase()}`
      );
    },
    onSuccess: ({ data }) => {
      setIsLoadingMutation(false);
      if (currentTab.label === 'Time') {
        const tempData =
          [
            {
              check_in: preetyTime(data?.check_in),
              check_out: preetyTime(data?.check_out),
            },
          ] || [];
        dispatch(getHrEmpTime(tempData));
      } else {
        dispatch(getHrEmpLeaves(reformData(data)));
      }
      return data || [];
    },
    onError: (err) => {
      setIsLoadingMutation(false);
      Toast('error', err.message || 'Failed to update data');
    },
  });
  const updateLeaveStatusMutation = useMutation({
    mutationFn: async (formVals) => {
      return api.updateJSONData(
        `${HR_EMP_TIME_AND_LEAVES}?id=${id}&tab=leaves`,
        formVals
      );
    },
    onSuccess: () => {
      mutate('leaves');
      Toast('success', 'Leaves updates successfully');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });

  const [isOpenTimeManagementModal, setIsOpenTimeManagementModal] =
    useState(false);
  const [isOpenLeaveManagementModal, setIsOpenLeaveManagementModal] =
    useState(false);
  const tabs = [
    {
      prop: a11yProps(0),
      label: 'Time',
      data: timeData,
      column: timeColumn,
    },
    {
      prop: a11yProps(1),
      label: 'Leaves',
      data: leavesData,
      column: leavesColumn,
    },
  ];
  const handleChangeTab = (event, newValue, rest) => {
    setCurrentTab({
      label: tabs[newValue].label,
      val: newValue,
      data: newValue === 0 ? time : leaves,
      column: tabs[newValue].column,
    });
    mutate(tabs[newValue].label.toLowerCase());
    console.log(rest, 'rest');
    console.log(event, 'event');
  };
  const handleOpenTimeManagementModal = () => {
    setIsOpenTimeManagementModal(true);
  };
  const handleCloseTimeManagementModal = () => {
    setIsOpenTimeManagementModal(false);
  };
  const handleOpenLeaveManagementModal = () => {
    setIsOpenLeaveManagementModal(true);
  };
  const handleCloseLeaveManagementModal = () => {
    setIsOpenLeaveManagementModal(false);
  };
  const handleOpenModal = () => {
    if (currentTab?.val === 0) {
      handleOpenTimeManagementModal();
    } else {
      handleOpenLeaveManagementModal();
    }
  };

  const handleUpdateLeaveStatus = (data) => {
    const tempData = {
      [data.leave_type]: {
        availed: data?.availed,
        balance: data?.balance,
        status: data?.status === 'Enabled' ? 'disable' : 'enable',
        total: data?.total,
      },
    };

    updateLeaveStatusMutation.mutate(tempData);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          borderBottom: 'solid 1px #ccc',
          mb: '40px',
        }}
      >
        <Tabs
          value={currentTab?.val}
          onChange={(ev, newVal) => {
            handleChangeTab(ev, newVal);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
          sx={{ mt: '8px', order: { xs: 1, sm: 0 } }}
        >
          {tabs?.map(({ label, prop }, tabIndex) => (
            <Tab
              key={tabIndex}
              label={`${label}`}
              {...prop}
              disableRipple={true}
              sx={{
                marginRight: '10px',
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
          ))}
        </Tabs>
        {(role === 'super_admin' ||
          (role !== 'super_admin' && employee_perms?.[0].write)) && (
          <Box
            sx={{
              width: { xs: '100%', sm: 'auto' },
              borderBottom: { xs: 'solid 1px #ccc', sm: 'none' },
            }}
          >
            <Button
              sx={{
                minWidth: '160px',
                marginTop: { xs: '10px', md: '0px' },
                marginBottom: { xs: '10px', sm: '5px', md: '0px' },
                color: '#fff',
                background: '#029894',
                order: { xs: 0, sm: 0 },
                '&:hover': {
                  color: '#fff',
                  background: '#029894',
                },
              }}
              variant="contained"
              onClick={handleOpenModal}
            >
              {FORM_DATA?.manage}
            </Button>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable
          minWidth={'1200px'}
          currentTab={currentTab}
          column={currentTab.column}
          data={currentTab?.val === 0 ? time : leaves}
          noPagination
          updateLeaveStatus={handleUpdateLeaveStatus}
          isLoading={isLoading}
        />
      </Box>
      <TimeManagementModal
        open={isOpenTimeManagementModal}
        onClose={handleCloseTimeManagementModal}
      />
      <LeaveManagementModal
        open={isOpenLeaveManagementModal}
        onClose={handleCloseLeaveManagementModal}
      />
    </>
  );
};

export default TimeAndLeaves;
