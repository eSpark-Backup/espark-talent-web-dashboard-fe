import React, { useState } from 'react';
import { Box, Button, Tab, Tabs } from '@mui/material';

import { a11yProps } from '@/src/utils/tabs';
import AppTable from '../appTable/AppTable';
import {
  leavesColumn,
  leavesData,
  timeColumn,
  timeData,
} from '@/src/constants/data/tables/hr/timeAndLeaves';
import TimeManagementModal from '@/app/hr/dashboard/clients/client-profile/TimeManagementModal';
import LeaveManagementModal from '@/app/hr/dashboard/clients/client-profile/LeaveManagementModal';
import { FORM_DATA } from '@/src/constants/form';

const TimeAndLeaves = () => {
  const [currentTab, setCurrentTab] = useState({
    label: 'Time',
    val: 0,
    data: timeData,
    column: timeColumn,
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
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          borderBottom: 'solid 1px #ccc',
          mb: '20px',
        }}
      >
        <Tabs
          value={currentTab.val}
          onChange={(ev, newVal) => {
            handleChangeTab(ev, newVal);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          {tabs?.map(({ label, prop }, tabIndex) => (
            <Tab
              key={tabIndex}
              label={`${label}`}
              {...prop}
              disableRipple={true}
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
        <AppTable
          currentTab={currentTab}
          column={currentTab.column}
          data={currentTab.data}
          noPagination
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
