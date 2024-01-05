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
import { Clock_Title } from '@/src/constants/employeeDashboard';
// import RequestHeading from '@/src/components/requestview/modalHeading';
// import PunchRequestView from '@/src/components/punchIn/punchRequestView';
import AppDropdown from '@/src/components/dashboard/appDropdown';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs';
// import DateIcon from '@/public/icons/CalendarOutline.svg';
// import AccessibleIcon from '@mui/icons-material/Accessible';
import ActionBarComponent from '@/src/components/requestview/actionbarComponent';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import PunchRequestModal from './PunchRequestModal';

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
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const handleCloseDatePicker = () => setIsOpenDatePicker(false);

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
    setModalData({})
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]
      };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="h3">Check in / out</Typography>
          <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
              variant="caption"
            >
              Manage punch request from one place.
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
              height: { xs: '950px', md: '890px' },
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
              <Typography variant="h5">Mark clock in/ clock out</Typography>
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
                  fontSize: '20px',
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
                  fontSize: '20px',
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
                  width: `${getPercentage(timeToSeconds('03:10:00'), 9) < 100
                      ? getPercentage(timeToSeconds('03:10:00'), 9)
                      : 100
                    }%`,
                  background: '#E6F4F4',
                  height: '100%',
                }}
              ></Box>
              <Box
                sx={{
                  width: `${100 - getPercentage(timeToSeconds('03:10:00'), 9)
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
              <Grid item xs={12} md={6} lg={6} xl={6}>
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
                    // border:"solid 1px #ccc",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '10px',
                    // borderRadius:'5px',
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
              <Typography variant="h5">Statistics</Typography>
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
                            width: `${getPercentage(
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
                            width: `${100 -
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
              <Typography variant="h5">{Clock_Title}</Typography>
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
                            alignItems: 'center',
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
                    <Box display={'flex'} alignItems={'center'} my={'20px'}>
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
          height: { xs: '950px', md: '890px' },
        }}
      >
        <PunchRequestModal
          modalData={modalData}
          handleClose={handleCloseModal}
        />
      </Modal>
    </>
  );
};
export default Dashboard;
