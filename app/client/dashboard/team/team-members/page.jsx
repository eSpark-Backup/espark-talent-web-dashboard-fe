'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';

import Input from '@/src/components/dashboard/input';
import { teamMembersData } from '@/src/constants/data/tables/teamMembers';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { changeTab } from '@/src/utils/tabs';
import { teamTabs } from '@/src/constants/data/tabs/teamTabs';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppTable from '@/src/components/appTable/AppTable';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_TEAM_MEMBER } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTeamMembersRequest,
  fetchTeamMembersRequestFailed,
  fetchTeamMembersRequestSuccess,
} from '@/src/redux/slices/clientSlices/teamMembersSlice';

const Dashboard = () => {
  const { data } = useSelector((state) => state?.client?.teamMembers);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const temMembersQuery = useQuery({
    staleTime: 10000,
    queryKey: 'teamMembers',
    queryFn: async () => {
      dispatch(fetchTeamMembersRequest());
      const { data } = await api.getData(`${CLIENT_TEAM_MEMBER}/?status=all`);
      dispatch(fetchTeamMembersRequestSuccess(data || []));
      return data;
    },
  });
  useEffect(() => {
    if (temMembersQuery.isError) {
      dispatch(fetchTeamMembersRequestFailed());
    }
  }, [temMembersQuery.isError]);

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
      filterDataByKeyword(data, search || '');
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
              <Link href={HIRING_FORM_DATA?.startHiringLink}>
                <Button
                  style={{
                    background: '#029894',
                  }}
                  variant="contained"
                >
                  {HIRING_FORM_DATA?.newHire}
                </Button>
              </Link>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                  variant="scrollable"
                >
                  {teamTabs?.map(({ label, prop, data }, i) => (
                    <Tab
                      key={i}
                      disableRipple={true}
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
                    <Box
                      sx={{
                        maxWidth: '100%',
                        overflowX: 'auto',
                      }}
                    >
                      <AppTable
                        currentTab={currentTab}
                        column={column}
                        data={data}
                      />
                    </Box>
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
