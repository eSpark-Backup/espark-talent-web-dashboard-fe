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
import LeaveRequestModal from './LeaveRequestModal';
import LeaveViewModal from '@/app/client/dashboard/team/time-off/LeaveViewModal';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
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
              <Box display={'flex'} flexDirection={'column'}>
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 600,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                >
                  Leaves Requests
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
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: '400',
                    lineHeight: '17px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#595959',
                    marginTop: '50px',
                  }}
                  variant="caption"
                >
                  Balance
                </Typography>
              </Box>
              <Button
                sx={{ minWidth: '120px', marginBottom: '25px' }}
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
                    // height: { xs: '850px', md: '900px' },
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
                    color: '#595959',
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
        <LeaveViewModal
          modalData={modalData}
          handleClose={handleClose}
          isEmployee
        />
      </Modal>
    </>
  );
};
export default Dashboard;
