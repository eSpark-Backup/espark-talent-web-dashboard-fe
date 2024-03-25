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
          dispatch(getEmpPunchRequestDataSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getEmpPunchRequestDataFailed());
          console.log({ err });
        });
    },
  });
  console.log({ data, isLoading });
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
      console.log({ data });
      dispatch(deleteEmpPunchRequestSuccess(modalData?.id));
      handleCloseDeleteModal();
      setModalData({});
    },
    onError: (err) => {
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
            Punch request
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
              {REQUEST_LEAVE?.manageTimesheet}
            </Typography>
          </Box>
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
      <Grid container spacing={3}>
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
                {empDetails?.employee_name} - ({empDetails?.employee_id})
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
                        ({ label, prop, background, color, name }, index) => {
                          return (
                            <Tab
                              key={index}
                              disableRipple={true}
                              sx={{
                                mr: { xs: '10px', sm: '20px', md: '50px' },
                                p: 0,
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
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      sx={{
                        pt: { xs: '10px', md: 0 },
                        '@media (min-width: 900px) and (max-width: 950px)': {
                          pt: '15px',
                        },
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
            </Box>
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
