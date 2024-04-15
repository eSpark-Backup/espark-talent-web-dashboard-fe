'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import { checkInOutStatusTabs } from '@/src/constants/data/tabs/checkInOutTabs';
import { employeeCheckInOutRequestColumn } from '@/src/constants/data/tables/checkInOutRequestsData';
import PunchRequestModal from './PunchRequestModal';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
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
// import FilterFormModal from '@/src/components/FilterModal/filterForm';
// import { filterStatusForm } from '@/src/constants/data/forms/filter-form';
import EmpPunchReqFilterFormModal from '@/src/components/FilterModal/empPunchReqFilterForm';
import { empPunchReqfilterForm } from '@/src/constants/data/forms/emp-punch-req-modal-form';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { workSpace, empDetails } = useSelector(
    (state) => state?.auth?.userData
  );
  const { data } = useSelector((state) => state?.emp?.punchReq);
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryFn: () => {
      dispatch(fetchEmpPunchRequestData());
      return api
        .getData(`${EMP_PUNCH_REQUEST}/?workspace=${workSpace?.email || ''}`)
        .then(({ data }) => {
          dispatch(getEmpPunchRequestDataSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getEmpPunchRequestDataFailed());
          console.log({ err });
        });
    },
  });
  const [checkInOutRequestDataState, setCheckInOutRequestDataState] = useState(
    []
  );
  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr.map((item) => ({
        ...item,
        description: item?.description,
        actionTimeOffReqStatus: true,
        actionStatus: true,
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
  const handleClosePunch = () => setOpenPunch(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteEmpPunchRequest());
      return api.daleteData(`${EMP_PUNCH_REQUEST}/?id=${id}`);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data deleted successfully');
      console.log({ data });
      dispatch(deleteEmpPunchRequestSuccess(modalData?.id));
      handleCloseDeleteModal();
      setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deletePunchRequestDataFailed());
      handleCloseDeleteModal();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const refreshMutation = useMutation({
    mutationFn: async (args) => {
      console.log({ args });
      dispatch(fetchEmpPunchRequestData());
      return api.getData(
        `${EMP_PUNCH_REQUEST}?workspace=${workSpace?.email || ''}`
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
      console.log({ err });
      console.log({ err: err.message, name: err.name, stack: err.stack });
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

  const handleClickActionView = (props) => {
    const { item, row } = props;
    setModalData({ item, ...row });
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
  if (isLoading) return 'Loading...';
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
            title={'Punch request'}
            dashboardDescription={REQUEST_LEAVE?.manageTimesheet}
          />
        </Box>

        {openModal && (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-aos="fade-down"
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
                {`${empDetails?.employee_name} -`}{' '}
                <Box
                  component={'br'}
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                />{' '}
                ({empDetails?.employee_id})
              </Typography>
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
                    maxWidth: '1480px',
                    overflowX: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
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
                    >
                      {checkInOutStatusTabs?.map(
                        ({ label, prop, background, color, name }, index) => {
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
                                      // filterTableRowsWRTTab(
                                      //   checkInOutRequestDataState,
                                      //   {
                                      //     status: label === 'All' ? '' : label,
                                      //   }
                                      // ).length
                                      data?.[name]
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
                        border: '1px solid #138A72',
                        color: '#138A72',
                        '&:hover:': {
                          background: '#fff',
                        },
                      }}
                      onClick={() => refreshMutation.mutate()}
                      startIcon={
                        <Image
                          width={20}
                          height={22}
                          alt="Refresh"
                          src={`/icons/Refresh.svg`}
                        />
                      }
                    >
                      {REQUEST_LEAVE?.refresh}
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
                    open={handleOpenFilterModal}
                    onClose={handleClose}
                    clockinOut
                    filterForm={empPunchReqfilterForm}
                  />
                )}
              </CustomTabPanel>
            </Box>
            {renderNestedTable({
              currentReqStatusTabVal,
              currentReqStatusTab,
              column: employeeCheckInOutRequestColumn,
              data: checkInOutRequestDataState,
              // data: data?.requests,
              handleClickActionView,
              handleClickActionDelete,
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
      <AppConfirmationMadal
        isOpen={isOpenDeleteModal}
        title={'Delete'}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
      />
    </>
  );
};
export default Dashboard;
