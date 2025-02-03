'use client';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { employeeRequestsTabs } from '@/src/constants/data/tabs/requestTabs';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterWFHForm } from '@/src/constants/data/forms/filter-form';

import Skeleton from '@mui/material/Skeleton';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/components/Toast/Toast';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import WFHReqFilterFormModal from '@/src/components/FilterModal/WFHReqFilterFormModal';
import WFHRequestTable from './WFHRequestTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchEmpWfhRequestData,
  getEmpWfhRequestDataFailed,
  getEmpWfhRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/wfhRequestSlice';
import { EMP_WFH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';

const WFHRequestTablesTabs = ({
  handleOpen,
  handleOpenModal,
  handleOpenCreatedModal,
  handleClickView,
  handleClickDelete,
  viewClicked,
}) => {
  const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state?.emp?.wfhReq);
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const [leaveRequestDataState, setLeaveRequestDataState] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
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
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const commonRowStyle = {
    display: 'flex',
    gap: '40px',
  };

  const refreshMutation = useMutation({
    mutationFn: async () => {
      dispatch(fetchEmpWfhRequestData());
      return api.getData(`${EMP_WFH_REQUEST}`);
    },
    onSuccess: ({ data }) => {
      const tempData = {
        ...data,
        requests: data?.requests?.length
          ? data?.requests?.map((item) => ({
              ...item,
              start_date: dayjs(item?.start_date)?.format('MMMM D, YYYY'),
            }))
          : [],
      };
      dispatch(getEmpWfhRequestDataSuccess(tempData));
      return data;
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      dispatch(getEmpWfhRequestDataFailed());
    },
  });

  const { isLoading: wfhLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['emp_wfhr'],
    queryFn: async () => {
      return api
        .getData(`${EMP_WFH_REQUEST}`)
        .then(({ data }) => {
          dispatch(getEmpWfhRequestDataSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getEmpWfhRequestDataFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          marginTop: '20px',
          marginBottom: '30px',
          borderBottom: 'solid 1px #ccc',
          width: '100%',
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
            }}
          >
            <Box
              sx={{
                width: '800px',
              }}
            >
              <Tabs
                variant="scrollable"
                value={currentReqStatusTabVal}
                onChange={(ev, newVal) =>
                  handleChangeCurrReqStatusTab(ev, newVal, employeeRequestsTabs)
                }
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
              >
                {employeeRequestsTabs?.map(
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
                            {wfhLoading ? (
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
                                  filterTableRowsWRTTab(leaveRequestDataState, {
                                    status: label === 'All' ? '' : label,
                                  }).length
                                }
                              </Box>
                            )}
                            <Typography
                              variant="body1"
                              sx={{
                                color:
                                  label === currentReqStatusTab
                                    ? '#068987'
                                    : wfhLoading
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
              gap={1.5}
              alignItems={'center'}
              sx={{
                pb: 0.8,
              }}
            >
              <Button
                disableRipple
                sx={{
                  mt: { xs: '0', md: 0 },
                  minWidth: '120px',
                  border: '1px solid #138A72',
                  color: '#138A72',
                  '&:hover:': {
                    background: '#fff',
                  },
                }}
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
                    onClick={handleOpenFilterModal}
                  />
                }
              >
                {REQUEST_LEAVE?.filter}
              </Button>
              <Button
                sx={{
                  minWidth: { xs: '100px', md: '120px' },
                  color: '#fff',
                  background: '#029894',
                  '&:hover': {
                    color: '#fff',
                    background: '#029894',
                  },
                }}
                variant="contained"
                onClick={handleOpenCreatedModal}
              >
                {REQUEST_LEAVE?.create}
              </Button>
            </Box>
          </Box>
          {showFilterModal && (
            <WFHReqFilterFormModal
              open={showFilterModal}
              onClose={handleClose}
              filterForm={filterWFHForm}
            />
          )}
        </CustomTabPanel>
      </Box>
      <WFHRequestTable
        minWidth={'1200px'}
        tabVal={currentReqStatusTabVal}
        tab={currentReqStatusTab}
        handleOpen={handleOpen}
        handleOpenModal={handleOpenModal}
        handleClickView={handleClickView}
        viewClicked={viewClicked}
        handleClickDelete={handleClickDelete}
        leaveRequestDataState={leaveRequestDataState || []}
        setLeaveRequestDataState={setLeaveRequestDataState}
        commonRowStyle={commonRowStyle}
      />
    </Box>
  );
};

export default WFHRequestTablesTabs;
