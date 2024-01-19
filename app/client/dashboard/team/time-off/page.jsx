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
import LeaveViewModal from './LeaveViewModal';
import PunchViewModal from './PunchViewModal';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchLeaveRequest, setSearchLeaveRequest] = useState('');
  const [searchCheckInOutRequest, setSearchCheckInOutRequest] = useState('');
  const [leaveBalanceDataState, setLeaveBalanceDataState] = useState(
    filterTableRowsWRTTab(leaveBalanceData, { status: '' })
  );

  const [open, setOpen] = useState(false);
  const [openPunch, setOpenPunch] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log({ modalData });
    setOpen(false);
  };
  const handleClosePunch = () => setOpenPunch(false);
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
  const [modalData, setModalData] = useState({});

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
  const handleClickActionView = (props) => {
    const {
      item,
      row,
      row: { status, employeeName, count, leaveType },
    } = props;
    console.log({ item, row, status, count, leaveType, employeeName });
    setModalData({ item, ...row });
    if (currentReqTypeTab === 'Leave Requests') {
      setOpen(true);
    } else if (currentReqTypeTab === 'Clockin/Out Requests') {
      setOpenPunch(true);
    } else return;
  };
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
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'flex-start', md: 'space-between' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
              // display={'flex'}
              // justifyContent={'space-between'}
              // alignItems={'center'}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h3">Time off Request</Typography>
                <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
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
                      fontWeight: 400,
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
                      <span style={{ color: '#000', fontWeight: 400 }}>
                        {' '}
                        public holidays by country.
                      </span>
                    </Link>
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  marginX: '10px',
                  minWidth: '220px',
                  color: '#029894',
                  border: '1px solid #029894',
                  fontSize: '16px',
                  fontWeight: '600',
                  '&:hover': {
                    background: '#E6F5F4',
                  },
                }}
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
                    <Tab
                      key={index}
                      label={`${label}`}
                      {...prop}
                      disableRipple={true}
                    />
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
                        <Box>
                          <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
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
                                      sx={{
                                        mr: {
                                          xs: '10px',
                                          sm: '20px',
                                          md: '50px',
                                        },
                                        p: 0,
                                        // width:"50px"
                                      }}
                                      label={
                                        <Box
                                          display={'flex'}
                                          alignItems={'center'}
                                          // sx={{
                                          //   p:0
                                          //   // mr:{xs:"10px", sm:"20px",md:"50px"}
                                          // }}
                                          // gap={'23px'}
                                        >
                                          <Box
                                            sx={{
                                              width: '30px',
                                              height: '30px',
                                              background,
                                              borderRadius: '5px',
                                              marginRight: '10px',
                                              color,
                                              fontSize: '14px',
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
                                                    label === 'All'
                                                      ? ''
                                                      : label,
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
                            <Box
                              sx={{
                                my: { xs: '10px', lg: 0 },
                                display: { xs: 'none', md: 'flex' },
                              }}
                              maxWidth="100%"
                              alignItems={'center'}
                            >
                              <Box
                                maxWidth="100%"
                                sx={{ mb: { xs: '10px', lg: 0 } }}
                              >
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
                                />
                              </Box>
                              <Button
                                sx={{
                                  marginX: '10px',
                                  minWidth: '120px',
                                  border: '1px solid #138A72',
                                  color: '#138A72',
                                  '&:hover:': {
                                    background: '#fff',
                                  },
                                }}
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
                                sx={{
                                  minWidth: '120px',
                                  background: '#138A72',
                                  color: '#fff',
                                  '&:hover': {
                                    background: '#138A72',
                                  },
                                }}
                                startIcon={
                                  <Image
                                    width={18}
                                    height={15}
                                    alt="Refresh"
                                    src={`/icons/Filter.svg`}
                                    onClick={handleOpen}
                                  />
                                }
                              >
                                Filter
                              </Button>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              my: { xs: '10px', lg: 0 },
                              display: { xs: 'flex', md: 'none' },
                            }}
                            maxWidth="100%"
                            alignItems={'center'}
                          >
                            <Box
                              maxWidth="100%"
                              sx={{ mb: { xs: '10px', lg: 0 } }}
                              display={'flex'}
                            >
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
                              />
                              <Box
                                sx={{
                                  border: 'solid 1px #029E9C',
                                  width: '60px',
                                  p: '5px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '5px',
                                  mx: '10px',
                                }}
                              >
                                <Image
                                  width={15}
                                  height={15}
                                  alt="Refresh"
                                  src={`/icons/Refresh.svg`}
                                />
                              </Box>
                              <Box
                                sx={{
                                  background: '#029E9C',
                                  width: '60px',
                                  p: '5px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '5px',
                                }}
                              >
                                <Image
                                  width={15}
                                  height={15}
                                  alt="Refresh"
                                  src={`/icons/Filter.svg`}
                                />
                              </Box>
                            </Box>
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
                  handleClickActionView,
                })}
            </Box>
          </div>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LeaveViewModal modalData={modalData} handleClose={handleClose} />
      </Modal>
      <Modal
        open={openPunch}
        onClose={handleClosePunch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PunchViewModal modalData={modalData} handleClose={handleClosePunch} />
      </Modal>
    </>
  );
};
export default Dashboard;
