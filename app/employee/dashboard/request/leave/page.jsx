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
import LeaveRequestModal from './LeaveRequestModal';
import LeaveViewModal from '@/app/client/dashboard/team/time-off/LeaveViewModal';

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
                  <LeaveRequestModal handleClose={handleCloseModal} />
                  
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LeaveViewModal modalData={modalData} handleClose={handleClose} isEmployee />
      </Modal>
    </>
  );
};
export default Dashboard;
