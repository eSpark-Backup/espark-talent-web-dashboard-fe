'use client';
import React, { useMemo, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppTable from '@/src/components/dashboard/appTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import { employeeRequestsTabs } from '@/src/constants/data/tabs/requestTabs';
import { employeeLeaveBalanceColumn, employeeLeaveBalanceData, employeeLeaveRequestsColumn, employeeLeaveRequestsData } from '@/src/constants/data/tables/requestsData';

const Dashboard = () => {
  const leaveBalanceDataState = useMemo(() => filterTableRowsWRTTab(employeeLeaveBalanceData, { status: '' }), [leaveBalanceDataState])
  const leaveRequestDataState = useMemo(() => filterTableRowsWRTTab(employeeLeaveRequestsData, { status: '' }), [leaveBalanceDataState])
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
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
                <Typography sx={{
                  fontSize: "30px",
                  fontWeight: 400,
                  lineHeight: "36px",
                  letterSpacing: "0em",
                  textAlign: "left",

                }} >Requests</Typography>
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
                    Manage Leaves from one place.
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{ marginX: '10px', minWidth: '120px' }}
                variant="contained"
              >
                Create
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                }}
              >
                <AppTable
                  column={employeeLeaveBalanceColumn}
                  data={leaveBalanceDataState}
                />
              </Box>
            </Box>
          </div>
        </Box>
      </Grid>
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
                <Typography sx={{
                  fontSize: "30px",
                  fontWeight: 400,
                  lineHeight: "36px",
                  letterSpacing: "0em",
                  textAlign: "left",

                }} >Requests</Typography>
                
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  borderBottom: 'solid 1px #ccc',
                }}
              >
                <CustomTabPanel
                  value={0}
                  index={0}
                  key={0}
                >
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
                          employeeRequestsTabs
                        )
                      }
                      aria-label="basic tabs example"
                    >
                      {employeeRequestsTabs?.map(
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
                                      filterTableRowsWRTTab(employeeLeaveRequestsData,
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
                </CustomTabPanel>
              </Box>
              {renderNestedTable({
                currentReqStatusTabVal,
                currentReqStatusTab,
                column: employeeLeaveRequestsColumn,
                data: leaveRequestDataState,
              })}
            </Box>
          </div>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
