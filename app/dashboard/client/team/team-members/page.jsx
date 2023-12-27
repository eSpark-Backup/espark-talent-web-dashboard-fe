'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import { teamMembersData } from '@/src/constants/data/teamMembers';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { changeTab } from '@/src/utils/tabs';
import { teamTabs } from '@/src/constants/data/teamTabs';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [empData, setEmpData] = useState(
    filterTableRowsWRTTab(teamMembersData, { memberStatus: '' })
  );

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

  const handleChangeTab = (event, newValue) => {
    changeTab({
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      setData: setEmpData,
      filterTableRowsWRTTab,
      teamMembersData,
      filterBy: 'memberStatus',
    });
  };

  useEffect(() => {
    const data = filterTableRowsWRTTab(teamMembersData, {
      memberStatus: currentTab === 'All' ? '' : currentTab,
    });
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, currentTab]);

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
              marginBottom={4}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h3">Team members</Typography>
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
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  {teamTabs?.map(({ label, prop, data }, i) => (
                    <Tab
                      key={i}
                      label={`${label} (${
                        filterTableRowsWRTTab(data, {
                          memberStatus: label === 'All' ? '' : label,
                        }).length
                      })`}
                      {...prop}
                    />
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
              {teamTabs?.map(({ column }, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  {isLoading ? (
                    <div>Loading...</div>
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
          </div>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
