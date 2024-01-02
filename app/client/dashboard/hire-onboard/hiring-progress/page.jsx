'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import { employeeTableDataHiringRequest } from '@/src/constants/data/tables/employee';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/tabs/empTabs';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Hiring Request');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [empData, setEmpData] = useState(employeeTableDataHiringRequest);

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

  const handleChange = (event, newValue) => {
    changeTab({
      isSingular: true,
      tabs: empTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      setData: setEmpData,
    });
  };

  useEffect(() => {
    const data = empTabs[value].data;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value]);

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
          <Box
            marginBottom={4}
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
              Add New hire
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
              >
                {empTabs?.map(({ label, prop, data }, i) => (
                  <Tab key={i} label={`${label} (${data?.length})`} {...prop} />
                ))}
              </Tabs>
            </Box>
            <Box my={4}>
              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
            </Box>
            {empTabs?.map(({ column }, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <Box
                    sx={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                  >
                    <AppTable
                      currentTab={currentTab}
                      column={column}
                      data={empData}
                    />
                  </Box>
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
