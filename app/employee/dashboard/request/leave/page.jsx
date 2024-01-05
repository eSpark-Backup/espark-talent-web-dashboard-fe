'use client';
import React, { useMemo, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppTable from '@/src/components/dashboard/appTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import { employeeRequestsTabs } from '@/src/constants/data/tabs/requestTabs';
import {
  employeeLeaveBalanceColumn,
  employeeLeaveBalanceData,
  employeeLeaveRequestsColumn,
  employeeLeaveRequestsData,
} from '@/src/constants/data/tables/requestsData';
// import LeaveRequest from '@/src/components/requestview/leaveRequestView';
// import RequestHeading from '@/src/components/requestview/modalHeading';
// import RequestviewModal from '@/src/components/requestview/requestviewModal';
// import { usePathname } from 'next/navigation';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import ActionBarComponent from '@/src/components/requestview/actionbarComponent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const Dashboard = () => {
  // const pathName = usePathname();
  // const isViewingClient = pathName == '/client/dashboard/team/time-off';
  const [open, setOpen] = useState(false);
  // const [statusType, setStatusType] = useState('');
  // const [rowType, setRowType] = useState('');
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('Sick leave');
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isOpenDatePickerEnd, setIsOpenDatePickerEnd] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);
  const handleCloseEndDatePicker = () => setIsOpenDatePickerEnd(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpen = () =>
    // status,
    //  row
    {
      // setStatusType(status);
      // setRowType(row);
      setOpen(true);
    };
  const handleClickActionView = (props) => {
    const {
      item,
      row,
      row: { status, employeeName, count, leaveType },
    } = props;
    console.log({ item, row, status, count, leaveType, employeeName });
    setModalData({ item, status, count, leaveType, employeeName });
    setOpen(true);
    // setStatusType(item);
    // setActionType(status)
  };
  const handleClose = () => setOpen(false);
  const leaveBalanceDataState = useMemo(
    () => filterTableRowsWRTTab(employeeLeaveBalanceData, { status: '' }),
    [employeeLeaveBalanceData]
  );
  const leaveRequestDataState = useMemo(
    () => filterTableRowsWRTTab(employeeLeaveRequestsData, { status: '' }),
    [employeeLeaveRequestsData]
  );
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

  const handleOpenConditionalModal = (rowType, actionType) => {
    if (rowType === 'Pending') {
      if (actionType === 'View') {
        // render pending view modal
      } else {
        // render pending reject modal
      }
    } else if (rowType === 'Completed') {
      // render completed modal
    } else if (rowType === 'Rejected') {
      // render completed modal
    } else {
      // render cancelled modal
    }
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
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[600] : blue[200]
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
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                >
                  Requests
                </Typography>
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
                onClick={handleOpenModal}
              >
                Create
              </Button>
              {openModal && (
                // <RequestviewModal
                //   title="Create Leave Request"
                //   open={openModal}
                //   onClose={handleCloseModal}
                //   // isViewingClient={isViewingClient}
                //   // modalData={modalData}
                //   createLeaveRequest
                // />
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{
                    height: { xs: '850px', md: '900px' },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      mx: 'auto',
                      bgcolor: '#fff',
                      width: { xs: '80%', md: '50%' },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '10px',
                      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                      maxHeight: '80%',
                      overflowY: 'auto',
                    }}
                  >
                    <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
                      <Typography
                        sx={{
                          fontSize: '25px',
                          fontWeight: '600',
                        }}
                      >
                        Create leave request
                      </Typography>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#F6F6F6',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            Leave type
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            <AppDropdown
                              data={[
                                {
                                  label: 'Sick leave',
                                },
                                {
                                  label: 'Casual leave',
                                },
                                {
                                  label: 'Annual leave',
                                },
                              ]}
                              setIsLoadingList={setIsLoadingTitles}
                              isLoadingList={isLoadingTitles}
                              selectedItem={selectedJobTitle}
                              setSelectedItem={setSelectedJobTitle}
                              placeHolder="Select Leave Type"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '0 20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#fff',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            Start date
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{
                              border: "solid 1px #ccc",
                              p: "15px",
                              borderRadius: "5px",
                              background: "#f6f6f6"
                            }}>
                              <Typography>October 17,2023</Typography>
                              <Image src={"/icons/CalendarOutline.svg"} width={20} height={20} alt='Date' />
                            </Box> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                open={isOpenDatePicker}
                                slots={{
                                  openPickerIcon: () => (
                                    <Image
                                      src={'/icons/CalendarOutline.svg'}
                                      width={20}
                                      height={20}
                                      alt="Date"
                                      onClick={() =>
                                        setIsOpenDatePicker((ps) => !ps)
                                      }
                                    />
                                  ),
                                  actionBar: () => (
                                    <ActionBarComponent
                                      onClose={handleCloseDatePicker}
                                    />
                                  ),
                                }}
                                sx={{ width: '100%', borderRadius: '50%' }}
                                defaultValue={dayjs('2022-04-17')}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#F6F6F6',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            End date
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{
                              border: "solid 1px #ccc",
                              p: "15px",
                              borderRadius: "5px",
                              background: "#f6f6f6"
                            }}>
                              <Typography>October 17,2023</Typography>
                              <Image src={"/icons/CalendarOutline.svg"} width={20} height={20} alt='Date' />
                            </Box> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                open={isOpenDatePickerEnd}
                                slots={{
                                  openPickerIcon: () => (
                                    <Image
                                      src={'/icons/CalendarOutline.svg'}
                                      width={20}
                                      height={20}
                                      alt="Date"
                                      onClick={() =>
                                        setIsOpenDatePickerEnd((ps) => !ps)
                                      }
                                    />
                                  ),
                                  actionBar: () => (
                                    <ActionBarComponent
                                      onClose={handleCloseEndDatePicker}
                                    />
                                  ),
                                }}
                                sx={{ width: '100%', borderRadius: '50%' }}
                                defaultValue={dayjs('2022-04-17')}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '0 20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#FFF',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            Count
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            <Box
                              display={'flex'}
                              justifyContent={'space-between'}
                              alignItems={'center'}
                              sx={{
                                border: 'solid 1px #ccc',
                                p: '15px',
                                borderRadius: '5px',
                                background: '#f6f6f6',
                              }}
                            >
                              <Typography>1</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#f6f6f6',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            Total count
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            <Box
                              display={'flex'}
                              justifyContent={'space-between'}
                              alignItems={'center'}
                              sx={{
                                border: 'solid 1px #ccc',
                                p: '15px',
                                borderRadius: '5px',
                                background: '#f6f6f6',
                              }}
                            >
                              <Typography>0</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '0 20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#FFF',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            Attachment
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            <Box
                              display={'flex'}
                              justifyContent={'space-between'}
                              alignItems={'center'}
                              sx={{
                                border: 'solid 1px #ccc',
                                p: '15px',
                                borderRadius: '5px',
                                background: '#f6f6f6',
                              }}
                            >
                              <Typography></Typography>
                              <Image
                                src={'/icons/Attachment.svg'}
                                width={20}
                                height={20}
                                alt="Attachment"
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          padding: '20px',
                        }}
                      >
                        <Grid
                          container
                          p={'5px 5px 5px 20px'}
                          sx={{
                            background: '#f6f6f6',
                            borderRadius: '5px',
                            display: 'flex',
                            // alignItems: { xs: "flex-start", md: "center" },
                            flexDirection: { xs: 'column', md: 'row' },
                          }}
                        >
                          <Grid item xs={12} md={6}>
                            Reason
                          </Grid>
                          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                            {/* <Box display={"flex"} justifyContent={"space-between"} sx={{
                              border: "solid 1px #ccc",
                              p: "15px",
                              borderRadius: "5px",
                              background: "#f6f6f6",
                              minHeight: "150px"
                            }}>
                              <Typography>Health issues</Typography>
                            </Box> */}
                            <Box
                              display={'flex'}
                              justifyContent={'space-between'}
                              sx={{
                                borderRadius: '5px',
                                background: '#f6f6f6',
                              }}
                            >
                              <Textarea
                                sx={{
                                  width: '100%',
                                  background: '#f6f6f6',
                                }}
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Minimum 3 rows"
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'flex-end'}
                      sx={{ padding: '20px' }}
                    >
                      <Button onClick={handleCloseModal} variant="outlined">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCloseModal}
                        sx={{ ml: '20px' }}
                        variant="contained"
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              )}
            </Box>

            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <AppTable
                  column={employeeLeaveBalanceColumn}
                  data={leaveBalanceDataState}
                  noPagination
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
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                >
                  Requests
                </Typography>
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
                          employeeRequestsTabs
                        )
                      }
                      aria-label="basic tabs example"
                    >
                      {employeeRequestsTabs?.map(
                        ({ label, prop, color, background }, index) => {
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
                                        employeeLeaveRequestsData,
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
                    <Box my={'10px'} display={'flex'} alignItems={'center'}>
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
                handleOpen,
                column: employeeLeaveRequestsColumn,
                data: leaveRequestDataState,
                handleOpenConditionalModal,
                handleClickActionView,
              })}
            </Box>
          </div>
        </Box>
      </Grid>

      {/* LeaveRequest Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          height: { xs: '850px', md: '900px' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            bgcolor: '#fff',
            width: { xs: '80%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            maxHeight: '80%',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
            <Typography
              sx={{
                fontSize: '25px',
                fontWeight: '600',
              }}
            >
              Leave request view
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#F6F6F6',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  Leave type
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <AppDropdown
                    disabled
                    data={[
                      {
                        label: 'Sick leave',
                      },
                      {
                        label: 'Casual leave',
                      },
                      {
                        label: 'Annual leave',
                      },
                    ]}
                    setIsLoadingList={setIsLoadingTitles}
                    isLoadingList={isLoadingTitles}
                    selectedItem={selectedJobTitle}
                    setSelectedItem={setSelectedJobTitle}
                    placeHolder="Select Leave Type"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '0 20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#fff',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  Start date
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '15px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography>October 17,2023</Typography>
                    <Image
                      src={'/icons/CalendarOutline.svg'}
                      width={20}
                      height={20}
                      alt="Date"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#F6F6F6',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  End date
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '15px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography>October 17,2023</Typography>
                    <Image
                      src={'/icons/CalendarOutline.svg'}
                      width={20}
                      height={20}
                      alt="Date"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Grid
              spacing={'5px'}
              sx={{
                border: 'solid 1px #ccc',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'row',
              }}
              container
              p={'5px 5px 5px 10px'}
            >
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    width: '100%',
                    py: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '595959',
                      fontSize: '12px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    Oct 17,23 - Oct 17,23
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                    border: 'solid 1px #ccc',
                    borderRadius: '5px',
                    mt: '5px',
                    p: '0 5px',
                  }}
                >
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#f6f6f6',
                      my: '10px',
                    }}
                  />
                  <Box ml={'5px'}>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '11px', lg: '16px' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: 'normal',
                      }}
                    >
                      Bilal Ahmed Khan
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '10px', lg: '14px' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: 'normal',
                        textAlign: { xs: 'center', md: 'left' },
                      }}
                    >
                      eS-00020
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                display={'flex'}
                flexDirection={'column'}
                item
                xs={12}
                md={8}
              >
                <Box
                  sx={{
                    width: '100%',
                    py: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '595959',
                      fontSize: '12px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    October week3
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    border: 'solid 1px #ccc',
                    borderRadius: '5px',
                    mt: '5px',
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: 'solid 1px #ccc',
                      m: '5px',
                      flex: 1,
                      borderRadius: '5px',
                    }}
                    display={'flex'}
                    justifyContent={'flex-end'}
                    flexDirection={'column'}
                  >
                    <Box sx={{ mb: '5px' }}>
                      <Typography
                        textAlign={'center'}
                        sx={{
                          color: '#595959',
                          fontSize: { xs: '12px', lg: '16px' },
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: 'normal',
                        }}
                      >
                        Tuesday
                      </Typography>
                    </Box>
                    <Box sx={{ background: '#F6F6F6' }} p={'0 10px'}>
                      <Typography
                        sx={{
                          color: '#595959',
                          fontSize: { xs: '10px', lg: '14px' },
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: 'normal',
                          textAlign: { xs: 'center', md: 'left' },
                          p: '8px 0',
                        }}
                      >
                        10:00 AM-7:00 PM
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#F6F6F6',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  Count
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '15px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography>1</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '0 20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#fff',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  Sandwich count
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '15px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography>0</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#F6F6F6',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  Total
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '15px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography>1</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                padding: '0 20px',
              }}
            >
              <Grid
                container
                p={'5px 5px 5px 20px'}
                sx={{
                  background: '#fff',
                  borderRadius: '5px',
                  display: 'flex',
                  // alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  Reason
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '15px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                      minHeight: '150px',
                    }}
                  >
                    <Typography>Health issues</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {modalData?.status === 'Pending' ? (
            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              sx={{ padding: '20px' }}
            >
              <Button onClick={handleClose} variant="outlined">
                Cancel Request
              </Button>
            </Box>
          ) : modalData?.status === 'Completed' ||
            modalData?.status === 'Rejected' ||
            modalData?.status === 'Cancelled' ? (
            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              sx={{ padding: '20px' }}
            >
              <Button onClick={handleClose} variant="contained">
                Close
              </Button>
            </Box>
          ) : null}
        </Box>
      </Modal>
    </>
  );
};
export default Dashboard;
