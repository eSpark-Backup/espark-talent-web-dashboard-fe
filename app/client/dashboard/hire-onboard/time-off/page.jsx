'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import {
  leaveRequestsTab,
  requestsStatusTab,
} from '@/src/constants/data/tabs/timeOffTabs';
import {
  checkInOutColumn,
  checkInOutRequestData,
  leaveBalanceColumn,
  leaveBalanceData,
  leaveRequestsColumn,
  leaveRequestsData,
} from '@/src/constants/data/tables/timeOffRequest';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import Link from 'next/link';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchLeaveRequest, setSearchLeaveRequest] = useState('');
  const [searchCheckInOutRequest, setSearchCheckInOutRequest] = useState('');
  const [leaveBalanceDataState, setLeaveBalanceDataState] = useState(
    filterTableRowsWRTTab(leaveBalanceData, { status: '' })
  );
  const [leaveRequestDataState, setLeaveRequestDataState] = useState(
    filterTableRowsWRTTab(leaveRequestsData, { status: '' })
  );
  const [checkInOutRequestDataState, setCheckInOutRequestDataState] = useState(
    filterTableRowsWRTTab(checkInOutRequestData, { status: '' })
  );
  const [currentReqTypeTab, setcurrentReqTypeTab] = useState('Leave Requests');
  const [currentReqTypeTabVal, setcurrentReqTypeTabVal] = useState(0);
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const handleChangeCurrReqTypeTab = (event, newValue) => {
    const tab = event?.target?.innerText;
    setcurrentReqTypeTab(tab);

    setcurrentReqTypeTabVal(newValue);
  };
  const handleChangeCurrReqStatusTab = (event, newValue, data) => {
    let tab = event?.target?.innerText;
    if (tab.includes('\n\n')) {
      tab = tab.split('\n\n')[1];
    } else if (!isNaN(+tab)) {
      tab = data[newValue]?.label;
    }
    setcurrentReqStatusTab(tab);
    setcurrentReqStatusTabVal(newValue);
  };

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

  useEffect(() => {
    const data = filterTableRowsWRTTab(leaveBalanceData);
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setLeaveBalanceDataState);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);
  useEffect(() => {
    const data = filterTableRowsWRTTab(leaveRequestsData);
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(
        data,
        searchLeaveRequest || '',
        setLeaveRequestDataState
      );
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchLeaveRequest]);
  useEffect(() => {
    const data = filterTableRowsWRTTab(checkInOutRequestData);
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(
        data,
        searchCheckInOutRequest || '',
        setCheckInOutRequestDataState
      );
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchCheckInOutRequest]);

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
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h3">Time off Request</Typography>
                <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '17px',
                      letterSpacing: '0em',
                      textAlign: 'left',
                    }}
                    variant="caption"
                  >
                    Manage your team member&apos;s time off requests. Remember 1
                    day = 8 working hours.
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '17px',
                      letterSpacing: '0em',
                      textAlign: 'left',
                    }}
                    variant="caption"
                  >
                    Use the following link to check{' '}
                    <Link
                      style={{
                        textDecoration: 'underline',
                      }}
                      href="/"
                    >
                      public holidays by country.
                    </Link>
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{ marginX: '10px', minWidth: '120px' }}
                variant="outlined"
              >
                Download Report
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tabs
                  value={currentReqTypeTabVal}
                  onChange={handleChangeCurrReqTypeTab}
                  aria-label="basic tabs example"
                  variant="scrollable"
                >
                  {leaveRequestsTab?.map(({ label, prop }, index) => (
                    <Tab key={index} label={`${label}`} {...prop} />
                  ))}
                </Tabs>
              </Box>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  borderBottom:
                    currentReqTypeTab !== 'Leave Balance' && 'solid 1px #ccc',
                }}
              >
                {leaveRequestsTab?.map(({ hasNestedTabs }, index) => {
                  return (
                    <CustomTabPanel
                      value={currentReqTypeTabVal}
                      index={index}
                      key={index}
                    >
                      {hasNestedTabs ? (
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          marginTop={5}
                        >
                          <Tabs
                            variant="scrollable"
                            value={currentReqStatusTabVal}
                            onChange={(ev, newVal) =>
                              handleChangeCurrReqStatusTab(
                                ev,
                                newVal,
                                requestsStatusTab
                              )
                            }
                            aria-label="basic tabs example"
                          >
                            {requestsStatusTab?.map(
                              ({ label, prop, background, color }, index) => {
                                return (
                                  <Tab
                                    key={index}
                                    label={
                                      <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                      >
                                        <Box
                                          sx={{
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
                                          }}
                                          display={'flex'}
                                          justifyContent={'center'}
                                          alignItems={'center'}
                                        >
                                          {
                                            filterTableRowsWRTTab(
                                              currentReqTypeTab ===
                                                'Leave Requests'
                                                ? leaveRequestsData
                                                : checkInOutRequestData,
                                              {
                                                status:
                                                  label === 'All' ? '' : label,
                                              }
                                            ).length
                                          }
                                        </Box>
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            color:
                                              label === currentReqStatusTab &&
                                              color,
                                          }}
                                        >
                                          {label}
                                        </Typography>
                                      </Box>
                                    }
                                    {...prop}
                                  />
                                );
                              }
                            )}
                          </Tabs>
                          <Box display={'flex'} alignItems={'center'}>
                            <Input
                              setIsLoading={
                                currentReqTypeTab === 'Leave Requests'
                                  ? setIsLoading
                                  : setIsLoading
                              }
                              handleChange={
                                currentReqTypeTab === 'Leave Requests'
                                  ? setSearchLeaveRequest
                                  : setSearchCheckInOutRequest
                              }
                              value={
                                currentReqTypeTab === 'Leave Requests'
                                  ? searchLeaveRequest
                                  : searchCheckInOutRequest
                              }
                              prefixIcon="SearchIcon.svg"
                              width={400}
                            />
                            <Button
                              sx={{ marginX: '10px', minWidth: '120px' }}
                              variant="outlined"
                              startIcon={
                                <Image
                                  width={20}
                                  height={22}
                                  alt="Refresh"
                                  src={`/icons/Refresh.svg`}
                                />
                              }
                            >
                              Refresh
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                minWidth: '120px',
                              }}
                              startIcon={
                                <Image
                                  width={18}
                                  height={15}
                                  alt="Refresh"
                                  src={`/icons/Filter.svg`}
                                />
                              }
                            >
                              Filter
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <>
                          <Box marginY={'20px'}>
                            <Input
                              setIsLoading={setIsLoading}
                              handleChange={setSearch}
                              value={search}
                              prefixIcon="SearchIcon.svg"
                              suffixIcon="QuestionMarkIcon.svg"
                            />
                          </Box>
                          {isLoading ? (
                            <Typography>Loading ...</Typography>
                          ) : (
                            <Box
                              sx={{
                                maxWidth: '100%',
                                overflowX: 'auto',
                              }}
                            >
                              <AppTable
                                column={leaveBalanceColumn}
                                data={leaveBalanceDataState}
                              />
                            </Box>
                          )}
                        </>
                      )}
                    </CustomTabPanel>
                  );
                })}
              </Box>
              {(currentReqTypeTab === 'Leave Requests' ||
                currentReqTypeTab === 'Clockin/Out Requests') &&
                renderNestedTable({
                  isLoading,
                  currentReqStatusTabVal,
                  currentReqStatusTab,
                  
                  column:
                    currentReqTypeTab === 'Leave Requests'
                      ? leaveRequestsColumn
                      : checkInOutColumn,
                  data:
                    currentReqTypeTab === 'Leave Requests'
                      ? leaveRequestDataState
                      : checkInOutRequestDataState,
                  currentReqTypeTab,
                })}
            </Box>
          </div>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
