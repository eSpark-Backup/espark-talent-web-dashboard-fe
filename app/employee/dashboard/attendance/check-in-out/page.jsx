'use client';
import React, { useMemo, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import { checkInOutStatusTabs } from '@/src/constants/data/tabs/checkInOutTabs';
import {
  employeeCheckInOutRequestColumn,
  employeeCheckInOutRequestData,
} from '@/src/constants/data/tables/checkInOutRequestsData';
import PunchRequestModal from './PunchRequestModal';
import FilterModal from '@/src/components/FilterModal/filterModal';

const Dashboard = () => {
  const checkInOutRequestDataState = useMemo(
    () => filterTableRowsWRTTab(employeeCheckInOutRequestData, { status: '' }),
    [employeeCheckInOutRequestData]
  );
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openPunch, setOpenPunch] = useState(false);
  const handleClosePunch = () => setOpenPunch(false);
  const [showFilterModal, setFilterModal] = useState(false);
  const handleOpenFilterModal = () => {
    setFilterModal(true);
  };
  const handleClose = () => {
    setFilterModal(false);
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
  function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
  }

  const getPercentage = (time, totalHours = 9) => {
    const totalSeconds = totalHours * 3600;
    // const currentSeconds = timeToSeconds(time);
    const spentPercentage = (time / totalSeconds) * 100;
    return Math.round(spentPercentage);
  };

  const data = [
    {
      title: 'Today',
      hoursCompleted: '3.45',
      totalHours: '8',
      remainingBack: '#E6F4F4',
      background: '#FEDB41',
    },
    {
      title: 'This week',
      hoursCompleted: '28',
      totalHours: '40',
      remainingBack: '#E6F4F4',
      background: '#F4B844',
    },
    {
      title: 'This month',
      hoursCompleted: '90',
      totalHours: '160',
      remainingBack: '#E6F4F4',
      background: '#2D9C98',
    },
    {
      title: 'Remaining',
      hoursCompleted: '90',
      totalHours: '160',
      remainingBack: '#E6F4F4',
      background: '#B24057',
    },
    {
      title: 'Overtime',
      hoursCompleted: '4',
      totalHours: '20',
      remainingBack: '#E6F4F4',
      background: '#338CB2',
    },
  ];

  const timelineData = [
    {
      id: 1,
      title: 'Check in',
      time: '10:00 AM',
    },
    {
      id: 2,
      title: 'Break at',
      time: '10:00 AM',
      description: 'Description of Event 2.',
    },
    {
      id: 3,
      title: 'Resumed at',
      time: '10:00 AM',
    },
    {
      id: 3,
      title: 'Check out',
      time: '10:00 AM',
    },
    // Add more items as needed
  ];

  const handleClickActionView = (props) => {
    const {
      item,
      row,
      row: { status, employeeName, count, leaveType },
    } = props;
    console.log({ item, row, status, count, leaveType, employeeName });
    setModalData({ item, ...row });
    setOpenPunch(true);
    // setStatusType(item);
    // setActionType(status)
  };
  const handleOpenModal = () => {
    setModalData({});
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={'50px'}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={{ xs: '20px', md: '30px' }} fontWeight={600}>
            Clock in / out
          </Typography>
          <Box display={'flex'} flexDirection={'column'} mt={'20px'}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0em',
                textAlign: 'left',
                color: '#595959',
              }}
              variant="caption"
            >
              Manage timesheet from one place.
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{ marginX: '10px', minWidth: '120px' }}
          variant="contained"
          onClick={handleOpenModal}
        >
          Create
        </Button>
        {openModal && (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // height: { xs: '950px', md: '890px' },
            }}
          >
            <PunchRequestModal
              modalData={modalData}
              handleClose={handleCloseModal}
              createModal
            />
          </Modal>
        )}
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
              height: '470px',
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2.5,
                height: '70px',
                borderRadius: '10px 10px 0px 0px',
                borderBottom: '1px solid #E4E4E4',
                background: '#FFF',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '19px', md: '25px' },
                  fontWeight: 600,
                }}
              >
                Mark clock in/ clock out
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                pt: 3,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              display={'flex'}
            >
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: { xs: '15px', md: '20px' },
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                Check in
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src="/icons/ClockIcon.svg"
                  width={20}
                  height={20}
                  alt="Clock"
                />
                <Typography
                  sx={{
                    color: '#171717',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    mx: '10px',
                  }}
                >
                  10:41 AM
                </Typography>
                <Typography
                  sx={{
                    color: '#595959',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  Exp: 10:00 AM
                </Typography>
              </Box>
            </Box>
            <br />
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              display={'flex'}
            >
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: { xs: '15px', md: '20px' },
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                Check out
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Image
                  src="/icons/ClockIcon.svg"
                  width={20}
                  height={20}
                  alt="Clock"
                />
                <Typography
                  sx={{
                    color: '#171717',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    mx: '10px',
                    minWidth: '69.66px',
                  }}
                >
                  --:-- --
                </Typography>
                <Typography
                  sx={{
                    color: '#595959',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  Exp: 10:00 AM
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: '50px',
                mx: { xs: 3, sm: 3, lg: 3 },
                my: '30px',
                border: 'solid 1px #ccc',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
              }}
              display={'flex'}
            >
              <Box
                sx={{
                  width: `${
                    getPercentage(timeToSeconds('03:10:00'), 9) < 100
                      ? getPercentage(timeToSeconds('03:10:00'), 9)
                      : 100
                  }%`,
                  background: '#E6F4F4',
                  height: '100%',
                }}
              ></Box>
              <Box
                sx={{
                  width: `${
                    100 - getPercentage(timeToSeconds('03:10:00'), 9)
                  }%`,
                  background: '#F5F5F5',
                  height: '100%',
                }}
              ></Box>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 'calc(50% - 24px)',
                  top: 'calc(50% - 8px)',
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: 'normal',
                }}
              >
                03:10:00
              </Typography>
            </Box>
            <Grid
              gap={'10px'}
              sx={{
                height: '50px',
                mx: { xs: 3, sm: 3, lg: 3 },
                my: '30px',
                borderRadius: '5px',
                position: 'relative',
              }}
              display={'flex'}
            >
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Button
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    border: '1px solid #E4E4E4',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '10px',
                    width: '100%',
                    height: '50px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: 'normal',
                      ml: '10px',
                      textTransform: 'math-auto',
                      '&:hover': {
                        color: '#fff',
                      },
                    }}
                  >
                    Mark check in
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Button
                  variant="contained"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '10px',
                    width: '100%',
                    height: '50px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFF',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: 'normal',
                      ml: '10px',
                      textTransform: 'math-auto',
                    }}
                  >
                    Mark check out
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                height: '50px',
                // background:"#ccc",
                mx: { xs: 3, sm: 3, lg: 3 },
                my: '30px',
                // border: "solid 1px #ccc",
                borderRadius: '5px',
                position: 'relative',
                // overflow: "hidden"
              }}
              display={'flex'}
            >
              <Button
                variant="outlined"
                sx={{
                  // border:"solid 1px #ccc",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: '10px',
                  // borderRadius:'5px',
                  width: '100%',
                  height: '50px',
                  color: '#068987',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  textTransform: 'math-auto',
                  '&:hover': {
                    color: '#fff',
                  },
                }}
              >
                <Image
                  src="/icons/TeaIcon1.svg"
                  style={{ marginRight: '10px' }}
                  width={20}
                  height={20}
                />
                Mark break out
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
              height: '470px',
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2.5,
                height: '70px',
                borderRadius: '10px 10px 0px 0px',
                borderBottom: '1px solid #E4E4E4',
                background: '#FFF',
              }}
            >
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 600,
                }}
              >
                Statistics
              </Typography>
            </Box>
            <Box p={'20px'}>
              {data?.map(
                (
                  {
                    title,
                    hoursCompleted,
                    totalHours,
                    remainingBack,
                    background,
                  },
                  index
                ) => {
                  console.log({
                    title,
                    hoursCompleted,
                    totalHours,
                    remainingBack,
                    background,
                  });
                  return (
                    <Box
                      sx={{
                        boxShadow: '0px 0px 5px 2px #ccc',
                        borderRadius: '5px',
                        // height:"40px",
                        width: '100%',
                        mb: '20px',
                        p: '10px',
                      }}
                      display={'flex'}
                      flexDirection={'column'}
                      key={index}
                    >
                      <Box
                        display={'flex'}
                        alignItem={'center'}
                        justifyContent={'space-between'}
                      >
                        <Typography
                          sx={{
                            color: '171717',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '171717',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                          }}
                        >{`${hoursCompleted} / ${totalHours}`}</Typography>
                      </Box>
                      <Box
                        sx={{
                          height: '10px',
                          border: 'solid 1px #ccc',
                          borderRadius: '5px',
                          position: 'relative',
                          overflow: 'hidden',
                          mt: '10px',
                        }}
                        display={'flex'}
                        flexDirection={'row-reverse'}
                      >
                        <Box
                          sx={{
                            width: `${
                              getPercentage(
                                +hoursCompleted * 3600,
                                +totalHours
                              ) < 100
                                ? getPercentage(
                                    +hoursCompleted * 3600,
                                    +totalHours
                                  )
                                : 100
                            }%`,
                            background: background,
                            height: '100%',
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: `${
                              100 -
                              getPercentage(+hoursCompleted * 3600, +totalHours)
                            }%`,
                            background: remainingBack,
                            height: '100%',
                          }}
                        ></Box>
                      </Box>
                    </Box>
                  );
                }
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <Box
            sx={{
              mx: { xs: 'auto', md: 0 },
              width: { xs: 'auto', md: 'auto' },
              height: '470px',
              borderRadius: '10px',
              background: '#FFF',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2.5,
                height: '70px',
                borderRadius: '10px 10px 0px 0px',
                borderBottom: '1px solid #E4E4E4',
                background: '#FFF',
              }}
            >
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 600,
                }}
              >
                Today Activity
              </Typography>
            </Box>
            <Box
              sx={{
                px: { xs: 3, sm: 3, lg: 3 },
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: 'calc(100% - 70px)',
                // height:"100%"
              }}
            >
              <Box>
                {timelineData.map(({ title, time }, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                  >
                    <Box
                      sx={{
                        width: '25px',
                        height: '25px',
                        border: 'solid 2px #068987',
                        borderRadius: '50%',
                        position: 'relative',
                      }}
                      display={'flex'}
                      alignItems={'center'}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '40px',
                          width: '150px',
                          top: 0,
                        }}
                        display={'flex'}
                        flexDirection={'column'}
                      >
                        <Typography
                          sx={{
                            color: '#171717',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#595959',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            display: 'flex',
                            marginTop: '10px',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <Image
                            src={'/icons/ClockIcon.svg'}
                            width={20}
                            height={20}
                          />{' '}
                          {time}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: '2px',
                        height: '60px',
                        background: '#ccc',
                      }}
                    ></Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
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
            <Box my={'20px'}>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontWeight: 400,
                  lineHeight: '36px',
                  letterSpacing: '0em',
                  color: '#595959',
                }}
                textAlign={'center'}
              >
                Bilal Khan - (eS-00020)
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  borderBottom: 'solid 1px #ccc',
                }}
              >
                <CustomTabPanel value={0} index={0} key={0}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                    marginTop={5}
                    px={'10px'}
                  >
                    <Tabs
                      variant="scrollable"
                      value={currentReqStatusTabVal}
                      onChange={(ev, newVal) =>
                        handleChangeCurrReqStatusTab(
                          ev,
                          newVal,
                          checkInOutStatusTabs
                        )
                      }
                      aria-label="basic tabs example"
                    >
                      {checkInOutStatusTabs?.map(
                        ({ label, prop, background, color }, index) => {
                          return (
                            <Tab
                              key={index}
                              disableRipple={true}
                              sx={{
                                mr: { xs: '10px', sm: '20px', md: '50px' },
                                p: 0,
                                // width:"50px"
                              }}
                              label={
                                <Box display={'flex'} alignItems={'center'}>
                                  <Box
                                    sx={{
                                      width: 30,
                                      height: 30,
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
                                        checkInOutRequestDataState,
                                        {
                                          status: label === 'All' ? '' : label,
                                        }
                                      ).length
                                    }
                                  </Box>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color:
                                        label === currentReqStatusTab && color,
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
                      display={'flex'}
                      alignItems={'center'}
                      sx={{
                        pt: { xs: '10px', md: 0 },
                        pb: '10px',
                      }}
                    >
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
                        onClick={handleOpenFilterModal}
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
                  {showFilterModal && (
                    <FilterModal
                      open={handleOpenFilterModal}
                      onClose={handleClose}
                      clockinOut
                    />
                  )}
                </CustomTabPanel>
              </Box>
              {renderNestedTable({
                currentReqStatusTabVal,
                currentReqStatusTab,
                column: employeeCheckInOutRequestColumn,
                data: checkInOutRequestDataState,
                handleClickActionView,
              })}
            </Box>
          </div>
        </Box>
      </Grid>
      <Modal
        open={openPunch}
        onClose={handleClosePunch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // height: { xs: '950px', md: '890px' },
        }}
      >
        <PunchRequestModal
          modalData={modalData}
          handleClose={handleClosePunch}
        />
      </Modal>
    </>
  );
};
export default Dashboard;
