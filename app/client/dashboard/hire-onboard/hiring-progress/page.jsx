'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Input from '@/src/components/dashboard/input';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/data/tabs/emp-tabs';
import { HIRING_FORM_DATA } from '@/src/constants/hiring';
import AppTable from '@/src/components/appTableNew/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { api } from '@/src/services/apiService';
import {
  CLIENT_HIRING_PROGRESS,
  CLIENT_INTERVIEW_SCHEDULE,
  CLIENT_ONBOARDING,
  DOWNLOAD_CLIENT_JOB_DESCRIPTION,
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Toast } from '@/src/components/Toast/Toast';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { genderType } from '@/src/utils/genderType';
import { formatSalary } from '@/src/utils/salaryFormat';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('Hiring Request');
  const [search, setSearch] = useState('');
  const [modalData, setModalData] = useState({});
  const { c_email } = useSelector((state) => state?.client?.home?.data);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.client?.hiringProgress);
  const [hiringRequestDataState, setHiringRequestDataState] = useState([]);
  const [interviewScheduledDataState, setInterviewScheduledDataState] =
    useState([]);
  const [onBoardingDataState, setOnBoardingDataState] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const activePrams = searchParams.get('param');
  const clientQuery = useQueryClient();

  const { data: hiringRequestQuery } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hiringRequests', c_email],
    queryFn: async () => {
      try {
        const response = await api.getData(`${CLIENT_HIRING_PROGRESS}`);
        const tempData =
          response.data === ''
            ? []
            : response.data?.map((item) => ({
                ...item,
                hiring_start_date: dayjs(item?.hiring_start_date)?.format(
                  'DD-MMMM-YYYY'
                ),
                hiring_end_date: dayjs(item?.hiring_end_date)?.format(
                  'DD-MMMM-YYYY'
                ),
              }));

        dispatch(fetchClientHiringRequestsSuccess(tempData));
        return tempData;
      } catch (err) {
        Toast('error', err.message || 'Failed to get data');
        return [];
      }
    },
    enabled: !!c_email,
  });

  const returnStatusVal = (val) => {
    if (val === 'pending') return 'Pending';
    else if (val === 'rejected') return 'Rejected';
    else if (val === 'hold') return 'Hold';
    else if (val === 'short_list') return 'Short listed';
  };

  const interviewScheduledQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['interviewSchedules', c_email],
    queryFn: async () => {
      try {
        const response = await api.getData(`${CLIENT_INTERVIEW_SCHEDULE}`);
        const tempData =
          response.data === ''
            ? []
            : response.data?.map((item) => ({
                ...item,
                status: returnStatusVal(item?.status),
                dropdownStatus: true,
                interview_date_time: dayjs(item?.interview_date_time)?.format(
                  'DD-MMMM-YYYY hh:mm A'
                ),
              }));

        dispatch(fetchClientInterviewSchedulesSuccess(tempData));
        return tempData; // ✅ Ensure data is returned
      } catch (err) {
        Toast('error', err.message || 'Failed to get data');
        return []; // ✅ Return an empty array in case of error
      }
    },
    enabled: !!c_email,
  });

  const onBoardingQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['onBoarding', c_email],
    queryFn: async () => {
      try {
        const response = await api.getData(`${CLIENT_ONBOARDING}`);
        const tempData =
          response.data === ''
            ? []
            : response.data?.map((item) => ({
                ...item,
                notice_period:
                  item?.notice_period > 0
                    ? `${item?.notice_period} ${item?.notice_period === 1 ? 'day' : 'days'}`
                    : '-',
                joining_date: dayjs(item?.joining_date)?.format('DD-MMMM-YYYY'),
              }));

        dispatch(fetchClientOnboardingSuccess(tempData));
        return tempData; // ✅ Ensure data is returned
      } catch (err) {
        Toast('error', err.message || 'Failed to get data');
        return []; // ✅ Return an empty array in case of error
      }
    },
    enabled: !!c_email, // ✅ Run query only if c_email is available
  });

  useEffect(() => {
    if (hiringRequestQuery?.isError) {
      dispatch(fetchClientHiringRequestsFailed());
    }
    if (interviewScheduledQuery?.isError) {
      dispatch(fetchClientInterviewSchedulesFailed());
    }
    if (onBoardingQuery?.isError) {
      dispatch(fetchClientOnboardingFailed());
    }
  }, [
    hiringRequestQuery?.isError,
    interviewScheduledQuery?.isError,
    onBoardingQuery?.isError,
  ]);

  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr?.map((item) => {
        // const symbol = item?.salary_currency
        //   ? item?.salary_currency?.split(' ')[0]
        //   : item?.salary_range?.currency?.split(' ')[0];
        return {
          ...item,
          salary_range: `${formatSalary(item?.salary_range?.minimum, '')} - ${formatSalary(item.salary_range?.maximum, item?.salary_currency)}`,
          salary: `${formatSalary(item?.salary, item?.salary_currency) || ''}`,
          currency: item?.salary_range?.currency || item?.salary_currency || '',
          gender: genderType(item?.gender),
          action: ['Delete'],
          jobDescription: 'Download',
        };
      });
      return tempData;
    }
    return [];
  };
  useEffect(() => {
    if (data?.hiringRequests?.length) {
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
    if (search) {
      const tempData =
        value === 0
          ? reformData(data?.hiringRequests)
          : value === 1
            ? reformData(data?.interviewSchedule)
            : reformData(data?.onBoarding);
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
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      if (value === 0) {
        setHiringRequestDataState(
          filterTableRowsWRTTab(reformData(data?.hiringRequests), {
            status: '',
          })
        );
      } else if (value === 1) {
        setInterviewScheduledDataState(
          filterTableRowsWRTTab(reformData(data?.interviewSchedule), {
            status: '',
          })
        );
      } else {
        setOnBoardingDataState(
          filterTableRowsWRTTab(reformData(data?.onBoarding), {
            status: '',
          })
        );
      }
    }
  }, [search, value, data]);

  const handleClickDelete = (props) => {
    setModalData({ id: props });
    setIsOpen(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteClientHiringRequest());
      return api.daleteData(`${CLIENT_HIRING_PROGRESS}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(deleteClientHiringRequestSuccess(modalData?.id));
      Toast('success', 'Data deleted successfully');
      handleClose();
      setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deleteClientHiringRequestFailed());
      handleClose();
    },
  });
  const handleConfirmDelete = () => {
    mutate(modalData.id);
  };

  const updateInterviewScheduleStatus = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(
        `${CLIENT_INTERVIEW_SCHEDULE}?id=${data?.id}`,
        data?.status
      );
    },
    onSuccess: () => {
      clientQuery?.invalidateQueries(['interviewSchedules']);
      Toast('success', 'Status updated successfully');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });

  const returnVal = (val) => {
    if (val === 'Pending') return 'pending';
    else if (val === 'Short listed') return 'short_list';
    else if (val === 'Rejected') return 'rejected';
    else if (val === 'Hold') return 'hold';
  };

  const updateInterviewStatus = (data, newVal) => {
    const tempData = {
      id: data?.id,
      status: { status: returnVal(newVal) },
    };
    updateInterviewScheduleStatus.mutate(tempData);
  };

  useEffect(() => {
    if (activePrams === 'hiring_request') {
      setValue(0);
    }
    if (activePrams === 'interview_schedule') {
      setValue(1);
    }
    if (activePrams === 'onboarding') {
      setValue(2);
    }

    setCurrentTab(activePrams);
  }, [activePrams]);

  const resolveURL = (id) => {
    return `${DOWNLOAD_CLIENT_JOB_DESCRIPTION}?id=${id}`;
  };

  const downloadContractMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(resolveURL(id));
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'job_description.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });

  const downloadContract = (id) => {
    downloadContractMutation.mutate(id);
  };

  const reverseArrayOrder = (array) => {
    return array?.slice()?.reverse();
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
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', sm: 'space-between' },
              alignItems: 'center',
              pb: { xs: 2, sm: 1 },
            }}
          >
            <DashboardHeading title={`Hire a team member`} />
            <Button
              onClick={() =>
                router?.push(`${HIRING_FORM_DATA?.startHiringLink || '#'}`)
              }
              sx={{
                background: '#029894',
                width: { xs: '100%', sm: '160px' },
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
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
                sx={{
                  '&.Mui-selected': {
                    outline: 'none',
                    background: 'transparent',
                  },
                  '&.MuiTabs-indicator': {
                    backgroundColor: '#068987',
                  },
                }}
              >
                {empTabs?.map(({ label, prop }, i) => (
                  <Tab
                    disableRipple={true}
                    key={i}
                    label={`${label}`}
                    sx={{
                      mr: '30px',
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                    {...prop}
                  />
                ))}
              </Tabs>
            </Box>
            <Box my={4}>
              <Input
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
                tooltip="Enter the relevant field type and easily filter the relevant data to search"
              />
            </Box>
            {empTabs?.map(({ column }, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    handleClickDownload={downloadContract}
                    minWidth={'1250px'}
                    currentTab={currentTab}
                    column={column}
                    data={
                      value === 0
                        ? hiringRequestDataState
                        : value === 1
                          ? interviewScheduledDataState
                          : reverseArrayOrder(onBoardingDataState)
                    }
                    handleClickActionDelete={handleClickDelete}
                    options={
                      currentTab === 'Interview' && [
                        { label: 'Short listed' },
                        { label: 'Pending' },
                        { label: 'Rejected' },
                        { label: 'Hold' },
                      ]
                    }
                    updateStatus={updateInterviewStatus}
                    isLoading={
                      value === 0
                        ? hiringRequestQuery?.isLoading
                        : value === 1
                          ? interviewScheduledQuery?.isLoading
                          : onBoardingQuery.isLoading
                    }
                  />
                </Box>
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
        isLoading={isPending}
      />
    </>
  );
};

export default Dashboard;
