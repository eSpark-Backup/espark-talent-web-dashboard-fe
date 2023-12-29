'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
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
import RequestHeading from '@/src/components/requestview/modalHeading';
import LeaveRequest from '@/src/components/requestview/leaveRequestView';
import { USER_TYPES } from '@/src/constants/requestviewModal';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchLeaveRequest, setSearchLeaveRequest] = useState('');
  const [searchCheckInOutRequest, setSearchCheckInOutRequest] = useState('');
  const [leaveBalanceDataState, setLeaveBalanceDataState] = useState(
    filterTableRowsWRTTab(leaveBalanceData, { status: '' })
  );

  const determineUserType = () => {
  

    return (
      USER_TYPES.client
    
    ); 
};

const userType = determineUserType();
const isViewingClient = userType === USER_TYPES.client;

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const handleOpen = (type) => {
    console.log("types", {type });
    setModalType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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
                            <AppTable
                              column={leaveBalanceColumn}
                              data={leaveBalanceDataState}
                            />
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
                  handleOpen,
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
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              border: '1px solid #029894',
            }}
          >
            <Box
              sx={{
                background: '#fff',
                borderRadius: '20px',
                width: '40px',
                padding: '2.5px',
                position: 'absolute',
                top: '2%',
                right: '25%',
              }}
            >
              <Image
                src="/images/leave-request/cancel.svg"
                width={37}
                height={37}
                alt="cancel"
                onClick={handleClose}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '53%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#fff',
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                height: '850px',
              }}
            >
              <RequestHeading view={isViewingClient} />
              <LeaveRequest modalType={modalType} view={isViewingClient}/>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
export default Dashboard;
