'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';

import Input from '@/src/components/dashboard/input';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/tabs/empTabs';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppTable from '@/src/components/appTableNew/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { api } from '@/src/services/apiService';
import {
  CLIENT_HIRING_PROGRESS,
  CLIENT_INTERVIEW_SCHEDULE,
  CLIENT_ONBOARDING,
} from '@/src/services/apiService/apiEndPoints';
import {
  deleteClientHiringRequest,
  deleteClientHiringRequestFailed,
  deleteClientHiringRequestSuccess,
  fetchClientHiringRequestsFailed,
  fetchClientHiringRequestsSuccess,
  fetchClientInterviewSchedulesFailed,
  fetchClientInterviewSchedulesSuccess,
  fetchClientOnboardingFailed,
  fetchClientOnboardingSuccess,
} from '@/src/redux/slices/clientSlices/hiringProgressSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('Hiring Request');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.client?.hiringProgress);

  const [hiringRequestDataState, setHiringRequestDataState] = useState([]);
  const [interviewScheduledDataState, setInterviewScheduledDataState] =
    useState([]);
  const [onBoardingDataState, setOnBoardingDataState] = useState([]);

  const hiringRequestQuery = useQuery({
    staleTime: 10000,
    queryKey: 'hiringRequests',
    queryFn: async () => {
      return await api
        .getData(`${CLIENT_HIRING_PROGRESS}`)
        .then(({ data }) => {
          dispatch(fetchClientHiringRequestsSuccess(data));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  const interviewScheduledQuery = useQuery({
    staleTime: 10000,
    queryKey: 'interviewSchedules',
    queryFn: async () => {
      return await api
        .getData(`${CLIENT_INTERVIEW_SCHEDULE}`)
        .then(({ data }) => {
          console.log({ interviewSchedules: data });
          dispatch(fetchClientInterviewSchedulesSuccess(data || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  const onBoardingQuery = useQuery({
    staleTime: 10000,
    queryKey: 'onBoarding',
    queryFn: async () => {
      return await api
        .getData(`${CLIENT_ONBOARDING}`)
        .then(({ data }) => {
          dispatch(fetchClientOnboardingSuccess(data || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  useEffect(() => {
    if (hiringRequestQuery.isError) {
      dispatch(fetchClientHiringRequestsFailed());
    }
    if (interviewScheduledQuery.isError) {
      dispatch(fetchClientInterviewSchedulesFailed());
    }
    if (onBoardingQuery.isError) {
      dispatch(fetchClientOnboardingFailed());
    }
  }, [
    hiringRequestQuery.isError,
    interviewScheduledQuery.isError,
    onBoardingQuery.isError,
  ]);

  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr.map((item) => ({
        ...item,
        salary_range: `${item.salary_range?.minimum} $ - ${item.salary_range?.maximum} $`,
        action: ['Delete'],
      }));
      return tempData;
    }
    return [];
  };
  useEffect(() => {
    if (data?.hiringRequests?.length) {
      console.log({ newTableData: reformData(data?.hiringRequests) });
      setHiringRequestDataState(
        filterTableRowsWRTTab(reformData(data?.hiringRequests), {
          status: '',
        })
      );
    }
    if (data?.interviewSchedule?.length) {
      setInterviewScheduledDataState(
        filterTableRowsWRTTab(reformData(data?.interviewSchedule), {
          status: '',
        })
      );
    }
    if (data?.onBoarding) {
      setOnBoardingDataState(
        filterTableRowsWRTTab(reformData(data?.onBoarding), {
          status: '',
        })
      );
    }
  }, [data?.hiringRequests, data?.interviewSchedule, data?.onBoarding]);
  const handleClose = () => setIsOpen(false);

  const handleChange = (event, newValue) => {
    changeTab({
      isSingular: true,
      tabs: empTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
    });
  };

  useEffect(() => {
    const tempData =
      value === 0
        ? reformData(data.hiringRequests)
        : value === 1
          ? reformData(data.interviewSchedule)
          : reformData(data.onBoarding);
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(
        tempData,
        search || '',
        value === 0
          ? setHiringRequestDataState
          : value === 1
            ? setInterviewScheduledDataState
            : setOnBoardingDataState
      );
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value, data]);

  const handleClickDelete = (props) => {
    setModalData({ id: props });
    setIsOpen(true);
  };
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteClientHiringRequest());
      return api.daleteData(`${CLIENT_HIRING_PROGRESS}/?id=${id}`);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data deleted successfully');
      console.log({ data });
      dispatch(deleteClientHiringRequestSuccess(modalData?.id));
      handleClose();
      setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deleteClientHiringRequestFailed());
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleConfirmDelete = () => {
    mutate(modalData.id);
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
          <Box
            marginBottom={4}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="h3">Hire a team member</Typography>
            <Link href={HIRING_FORM_DATA?.startHiringLink}>
              <Button
                sx={{
                  background: '#029894',
                  width: { xs: '120px', md: '160px' },
                  color: '#fff',
                  fontSize: '16px',
                  textTransform: 'math-auto',
                  '&:hover': {
                    background: '#029894',
                    color: '#fff',
                  },
                }}
              >
                {HIRING_FORM_DATA?.addnewHire}
              </Button>
            </Link>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                sx={{
                  '&.Mui-selected': {
                    outline: 'none',
                    background: 'transparent',
                  },
                }}
              >
                {empTabs?.map(({ label, prop }, i) => (
                  <Tab
                    disableRipple={true}
                    key={i}
                    label={`${label}`}
                    sx={{
                      '& .MuiTabs-indicator': {
                        backgroundColor: 'gray',
                      },
                    }}
                    {...prop}
                  />
                ))}
              </Tabs>
            </Box>
            <Box my={4}>
              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
            </Box>
            {empTabs?.map(({ column }, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <Box
                    sx={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                  >
                    <AppTable
                      currentTab={currentTab}
                      column={column}
                      data={
                        value === 0
                          ? hiringRequestDataState
                          : value === 1
                            ? interviewScheduledDataState
                            : onBoardingDataState
                      }
                      handleClickActionDelete={handleClickDelete}
                      options={
                        currentTab === 'Interview Schedule' && [
                          { label: 'Short listed' },
                          { label: 'Pending' },
                          { label: 'Rejected' },
                        ]
                      }
                    />
                  </Box>
                )}
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
      <AppConfirmationMadal
        title={'Delete'}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};
export default Dashboard;
