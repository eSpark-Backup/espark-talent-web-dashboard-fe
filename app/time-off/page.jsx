'use client';
import React from 'react';
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
import { requestsStatusTab } from '@/src/constants/data/timeOffTabs';

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState('All');
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [empData, setEmpData] = React.useState(
    filterTableRowsWRTTab(teamMembersData, { memberStatus: '' })
  );

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
    });
  };

  React.useEffect(() => {
    const data = filterTableRowsWRTTab(teamMembersData, {
      memberStatus: currentTab,
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
            paddingTop: '60px',
            gap: '20px',
            width: '100%',
          }}
        >
          <div>
            <Box
              marginY={5}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h3">Time off Request</Typography>
                <Typography sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '17px',
                  letterSpacing: '0em',
                  textAlign: 'left',

                }} variant='caption'>Manage your team members' time off requests. Remember 1 day = 8 working hours.</Typography>
                <Typography sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '17px',
                  letterSpacing: '0em',
                  textAlign: 'left',

                }} variant='caption'>Use the following link to check <a style={{
                  textDecoration: 'underline'

                }} href='#'>public holidays by country.</a></Typography>
              </Box>
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
                  {requestsStatusTab?.map(({ label, prop, data, background, color }, i) => (
                    <Tab
                      label={<Box display={"flex"} alignItems={"center"}>
                        <Box sx={{
                          width: 30,
                          height: 30,
                          background,
                          borderRadius: '5px',
                          marginRight: '10px',
                          color,
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '19px',
                          letterSpacing: '0em',
                          textAlign: 'left',

                        }} display={"flex"} justifyContent={"center"} alignItems={"center"} >
                          {
                            filterTableRowsWRTTab(data, {
                              memberStatus: label === 'All' ? '' : label,
                            }).length
                          }
                        </Box>
                        <Typography variant='body1' sx={{color:label === currentTab && color}}>
                          {label}
                        </Typography>
                      </Box>}
                      {...prop}
                    />
                    // </Box>
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
              {requestsStatusTab?.map(({ column }, i) => (
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
