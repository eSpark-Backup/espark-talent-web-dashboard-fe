'use client';
import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import {
  employeeTableDataInterviewSchedule,
  employeeTableDataHiringRequest,
  employeeTableDataOnBoarding,
  employeeTableHiringRequestColumn,
  employeeTableInterviewScheduleColumn,
  employeeTableOnboardingColumn,
} from '@/src/constants/data/employee';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState('Hiring Request');
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [empData, setEmpData] = React.useState(employeeTableDataHiringRequest);

  const fetchDataFake = async () => {
    return true;
  };

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const tabs = React.useMemo(
    () => [
      {
        label: 'Hiring Request',
        prop: a11yProps(0),
        data: employeeTableDataHiringRequest,
        column: employeeTableHiringRequestColumn,
      },
      {
        label: 'Interview Schedule',
        prop: a11yProps(1),
        data: employeeTableDataInterviewSchedule,
        column: employeeTableInterviewScheduleColumn,
      },
      {
        label: 'Onboarding',
        prop: a11yProps(2),
        data: employeeTableDataOnBoarding,
        column: employeeTableOnboardingColumn,
      },
    ],
    []
  );

  const handleChange = (event, newValue) => {
    const tab = event?.target?.innerText.split(' ');
    tab.pop();
    setCurrentTab(tab.join(' '));
    setValue(newValue);
    setEmpData(tabs[newValue].data);
  };

  React.useEffect(() => {
    const data = tabs[value].data;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, tabs, value]);

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '60px',
            gap: '20px',
            width: '100%',
          }}
        >
            <Box
              marginY={5}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h3">Hire a team member</Typography>
              <Button
                style={{
                  background: '#029894',
                }}
                variant="contained"
              >
                New hire
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {tabs?.map(({ label, prop, data }, i) => (
                    <Tab
                      key={i}
                      label={`${label} (${data?.length})`}
                      {...prop}
                    />
                  ))}
                </Tabs>
              </Box>
              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
              {tabs?.map(({ column }, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  {isLoading ? (
                    <Box>Loading...</Box>
                  ) : (
                    <AppTable
                      currentTab={currentTab}
                      column={column}
                      data={empData}
                    />
                  )}
                </CustomTabPanel>
              ))}
            </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
