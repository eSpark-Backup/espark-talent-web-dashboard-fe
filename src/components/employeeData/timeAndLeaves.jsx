import React, { useState } from 'react';
import { Box, Button, Tab, Tabs } from '@mui/material';

import { a11yProps } from '@/src/utils/tabs';
import AppTable from '../appTableNew/AppTable';
import {
  leavesColumn,
  leavesData,
  timeColumn,
  timeData,
} from '@/src/constants/data/tables/hr/timeAndLeaves';
import TimeManagementModal from '@/app/hr/dashboard/clients/client-profile/TimeManagementModal';
import LeaveManagementModal from '@/app/hr/dashboard/clients/client-profile/LeaveManagementModal';
import { FORM_DATA } from '@/src/constants/form';
import { useParams } from 'next/navigation';
import { api } from '@/src/services/apiService';
import { HR_GET_EMP_TIME_AND_LEAVES } from '@/src/services/apiService/apiEndPoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Toast } from '../Toast/Toast';

const TimeAndLeaves = () => {
  const params = useParams();
  const [currentTab, setCurrentTab] = useState({
    label: 'Time',
    val: 0,
    data: timeData,
    column: timeColumn,
  });
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  const [tabData, setTabData] = useState([]);
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['employee-time-profile'],
    queryFn: async () => {
      return api
        .getData(`${HR_GET_EMP_TIME_AND_LEAVES}?id=${params.id}&tab=time`)
        .then(({ data }) => {
          console.log({ data });
          setTabData(
            [
              {
                ...data,
              },
            ] || []
          );
          return data || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
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
        });
      }
    }
    return refinedData;
  };
  const { mutate } = useMutation({
    mutationFn: async (tab) => {
      setIsLoadingMutation(true);
      return api.getData(
        `${HR_GET_EMP_TIME_AND_LEAVES}?id=${params.id}&tab=${tab.toLowerCase()}`
      );
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      setIsLoadingMutation(false);
      if (currentTab.label === 'Time') {
        console.log({ data });
        setTabData([
          {
            ...data,
          },
        ]);
      } else {
        setTabData(reformData(data));
      }
      return data || [];
    },
    onError: (err) => {
      setIsLoadingMutation(false);
      console.log({ err: err.message, name: err.name, stack: err.stack });
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
    console.log({ event, newValue, rest });
    setCurrentTab({
      label: tabs[newValue].label,
      val: newValue,
      data: tabs[newValue].data,
      column: tabs[newValue].column,
    });
    mutate(tabs[newValue].label.toLowerCase());
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
  console.log({ tabData });
  if (isLoading) return 'Loading...';
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
          value={currentTab.val}
          onChange={(ev, newVal) => {
            handleChangeTab(ev, newVal);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
          sx={{ mt: '8px' }}
        >
          {tabs?.map(({ label, prop }, tabIndex) => (
            <Tab
              key={tabIndex}
              label={`${label}`}
              {...prop}
              disableRipple={true}
              sx={{ marginRight: '10px' }}
            />
          ))}
        </Tabs>
        {
          <Button
            sx={{
              minWidth: '160px',
              marginTop: { xs: '10px', md: '0px' },
              marginBottom: { xs: '10px', md: '0px' },
              color: '#fff',
              background: '#029894',
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
        }
      </Box>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        {isLoadingMutation ? (
          'Loading data...'
        ) : (
          <AppTable
            currentTab={currentTab}
            column={currentTab.column}
            data={tabData}
            noPagination
          />
        )}
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
