import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import {
  activeClientData,
  activeClientsColumn,
} from '@/src/constants/data/tables/hr/employeeProfileClient';
import { a11yProps } from '@/src/utils/tabs';
import AppTable from '../appTable/AppTable';

const Client = () => {
  const [currentTab, setCurrentTab] = useState({
    label: 'Active clients',
    val: 0,
    data: activeClientData,
    column: activeClientsColumn,
  });
  const tabs = [
    {
      prop: a11yProps(0),
      label: 'Active clients',
      data: activeClientData,
      column: activeClientsColumn,
    },
    {
      prop: a11yProps(1),
      label: 'Inactive clients',
      data: activeClientData,
      column: activeClientsColumn,
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
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
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
    </>
  );
};

export default Client;
