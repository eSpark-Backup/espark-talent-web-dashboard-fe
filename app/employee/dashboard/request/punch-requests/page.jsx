'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Modal,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/AppCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import { checkInOutStatusTabs } from '@/src/data/tabs/check-in-out-tabs';
import { employeeCheckInOutRequestColumn } from '@/src/data/tables/check-in-out-requests-data';
import PunchRequestModal from './PunchRequestModal';
import { REQUEST_LEAVE } from '@/src/constants/requestview-modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EMP_PUNCH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/src/services/apiService';
import {
  deleteEmpPunchRequest,
  deleteEmpPunchRequestSuccess,
  deletePunchRequestDataFailed,
  fetchEmpPunchRequestData,
  getEmpPunchRequestDataFailed,
  getEmpPunchRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/punchRequestSlice';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import EmpPunchReqFilterFormModal from '@/src/components/filter-modal/EmpPunchReqFilterForm';
import { empPunchReqfilterForm } from '@/src/data/forms/emp-punch-req-modal-form';
import DashboardHeading from '@/src/components/dashboard/DashboardHeading';
import { Toast } from '@/src/utils/toast';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';
import { ellipsisWithTooltip } from '@/src/utils/tooltipEllipsis';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { empDetails } = useSelector((state) => state?.auth?.userData);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const { data } = useSelector((state) => state?.emp?.punchReq);
  const { isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => {
      dispatch(fetchEmpPunchRequestData());
      return api
        .getData(
          `${EMP_PUNCH_REQUEST}?workspace=${currentWorkSpace?.email || ''}`
        )
        .then(({ data }) => {
          dispatch(getEmpPunchRequestDataSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(getEmpPunchRequestDataFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const [checkInOutRequestDataState, setCheckInOutRequestDataState] = useState(
    []
  );
  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr?.map((item) => ({
        ...item,
        description: item?.description,
        actionTimeOffReqStatus: true,
        actionStatus: true,
        punch_time: dayjs(item?.punch_time, 'hh:mm A')?.format('hh:mm A'),
        date: dayjs(item?.date)?.format('DD-MMMM-YYYY'),
        action: item?.status === 'pending' ? ['Delete', 'View'] : ['View'],
      }));
      return tempData;
    }
    return [];
  };

  useEffect(() => {
    setCheckInOutRequestDataState(
      filterTableRowsWRTTab(reformData(data?.requests), { status: '' })
    );
  }, [data]);

  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openPunch, setOpenPunch] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);
  const handleClosePunch = () => setOpenPunch(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteEmpPunchRequest());
      return api.daleteData(`${EMP_PUNCH_REQUEST}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(deleteEmpPunchRequestSuccess(modalData?.id));
      Toast('success', 'Data deleted successfully');
      handleCloseDeleteModal();
      setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deletePunchRequestDataFailed());
      handleCloseDeleteModal();
    },
  });
  const refreshMutation = useMutation({
    mutationFn: async () => {
      dispatch(fetchEmpPunchRequestData());
      return api.getData(
        `${EMP_PUNCH_REQUEST}?workspace=${currentWorkSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      dispatch(
        getEmpPunchRequestDataSuccess(
          data || {
            requests: [],
            pending: 0,
            completed: 0,
            rejected: 0,
            all: 0,
          }
        )
      );
    },
    onError: (err) => {
      dispatch(getEmpPunchRequestDataFailed());
      Toast('error', err.message || 'Failed to fetch data');
    },
  });
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const handleClose = () => {
    setShowFilterModal(false);
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

  const handleClickActionView = (id, column, row) => {
    setViewClicked(true);
    setModalData({ ...row });
    setOpenPunch(true);
  };
  const handleClickActionDelete = (props) => {
    setModalData({ id: props });
    setIsOpenDeleteModal(true);
  };
  const handleOpenModal = () => {
    setModalData({});
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleConfirmDelete = () => {
    mutate(modalData.id);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: { xs: '20px', sm: '50px' },
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          <DashboardHeading
            title={'Punch requests'}
            dashboardDescription={REQUEST_LEAVE?.managePunchrequest}
          />
        </Box>

        {openModal && (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-aos="fade-down"
            disableScrollLock
            disableEnforceFocus
            disableRestoreFocus
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            <Box sx={{ xs: '0px', sm: '20px' }}>
              {isLoading ||
              !empDetails?.employee_name ||
              !empDetails?.employee_id ? (
                <Skeleton
                  variant="text"
                  sx={{ width: '30%', height: 30, mr: 1, mx: 'auto' }}
                />
              ) : (
                <Tooltip
                  title={
                    ellipsisWithTooltip(empDetails?.employee_name, 17)
                      ? empDetails?.employee_name
                      : ''
                  }
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '24px', sm: '28px', md: '30px' },
                      fontWeight: 400,
                      lineHeight: '36px',
                      letterSpacing: '0em',
                      color: '#595959',
                    }}
                    textAlign={'center'}
                  >
                    {`${empDetails?.employee_name?.slice(0, 17)}${ellipsisWithTooltip(empDetails?.employee_name, 17) ? '... -' : '-'}`}
                    <Box
                      component={'br'}
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    />
                    {`(${empDetails?.employee_id?.slice(0, 17)}${ellipsisWithTooltip(empDetails?.employee_id, 17) ? '...' : ''})`}
                  </Typography>
                </Tooltip>
              )}
            </Box>
            <Box
              sx={{
                marginTop: '20px',
                marginBottom: '30px',
                borderBottom: 'solid 1px #ccc',
              }}
            >
              <CustomTabPanel value={0} index={0} key={0}>
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Box sx={{ width: '800px' }}>
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
                      TabIndicatorProps={{
                        style: { backgroundColor: '#068987' },
                      }}
                    >
                      {checkInOutStatusTabs?.map(
                        ({ label, prop, background, color }, index) => {
                          return (
                            <Tab
                              key={index}
                              disableRipple={true}
                              sx={{
                                p: 0,
                                mr: index == 0 ? '20px' : '40px',
                              }}
                              label={
                                <Box display={'flex'} alignItems={'center'}>
                                  {isLoading ? (
                                    <Skeleton
                                      variant="text"
                                      sx={{
                                        width: 30,
                                        height: 40,
                                        mr: 1,
                                        ml: index == 0 ? -3 : 0,
                                      }}
                                    />
                                  ) : (
                                    <Box
                                      sx={{
                                        ml: index == 0 ? -3 : 0,
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
                                            status:
                                              label === 'All' ? '' : label,
                                          }
                                        ).length
                                      }
                                    </Box>
                                  )}
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color:
                                        label === currentReqStatusTab
                                          ? '#068987'
                                          : isLoading
                                            ? 'gray'
                                            : '#595959',
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
                  </Box>
                  <Box
                    maxWidth={'auto'}
                    display={'flex'}
                    alignItems={'center'}
                    sx={{
                      pb: 0.8,
                    }}
                  >
                    <Button
                      sx={{
                        marginX: '10px',
                        minWidth: '120px',
                        border: `1px solid #138A72`,
                        color: '#138A72',
                        background: refreshMutation.isPending && '#ccc',
                        '&:hover:': {
                          background: refreshMutation.isPending
                            ? '#ccc'
                            : '#fff',
                        },
                      }}
                      disableRipple
                      onClick={() => refreshMutation.mutate()}
                      startIcon={
                        !refreshMutation.isPending && (
                          <Image
                            width={20}
                            height={22}
                            alt="Refresh"
                            src={`/icons/Refresh.svg`}
                          />
                        )
                      }
                    >
                      {refreshMutation.isPending ? (
                        <CircularProgress size={26} sx={{ color: '#138A72' }} />
                      ) : (
                        REQUEST_LEAVE?.refresh
                      )}
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
                      {REQUEST_LEAVE?.filter}
                    </Button>
                    <Button
                      sx={{
                        marginX: '10px',
                        minWidth: '120px',
                        color: '#fff',
                        background: '#029894',
                        '&:hover': {
                          color: '#fff',
                          background: '#029894',
                        },
                      }}
                      onClick={handleOpenModal}
                    >
                      {REQUEST_LEAVE?.create}
                    </Button>
                  </Box>
                </Box>
                {showFilterModal && (
                  <EmpPunchReqFilterFormModal
                    open={showFilterModal}
                    onClose={handleClose}
                    clockinOut
                    filterForm={empPunchReqfilterForm}
                  />
                )}
              </CustomTabPanel>
            </Box>
            {renderNestedTable({
              minWidth: '1200px',
              currentReqStatusTabVal,
              currentReqStatusTab,
              column: employeeCheckInOutRequestColumn,
              data: checkInOutRequestDataState || [],
              viewClicked,
              handleClickActionView,
              handleClickActionDelete,
              isLoading,
            })}
          </div>
        </Box>
      </Grid>
      <Modal
        open={openPunch}
        onClose={handleClosePunch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-aos="fade-down"
        disableEnforceFocus
        disableRestoreFocus
        disableScrollLock
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PunchRequestModal
          modalData={modalData || {}}
          handleClose={handleClosePunch}
          handleConfirmDelete={handleConfirmDelete}
        />
      </Modal>
      <AppConfirmationMadal
        isOpen={isOpenDeleteModal}
        title={'Delete'}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isLoading={isPending}
      />
    </>
  );
};
export default Dashboard;
