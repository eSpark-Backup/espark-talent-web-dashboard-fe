'use client';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import Profile from '@/src/components/employeeData/profile';
import AttendanceReport from '@/src/components/employeeData/attendanceReports';
import EditEmployeeCredential from '@/src/components/employeeData/editEmployeeCredential';
import EditModal from '@/src/components/employeeData/editModal';
import Client from '@/src/components/employeeData/client';
import Assets from '@/src/components/employeeData/assets';
import AssetForm from '@/src/components/employeeData/assetModal';
import TimeAndLeaves from '@/src/components/employeeData/timeAndLeaves';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterAttendanceForm } from '@/src/constants/data/forms/filter-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DOWNLOAD_EMP_RESUME,
  HR_GET_EMP_ATTENDENCE,
  HR_GET_EMP_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAttendanceRequestSuccess,
  getCurrentEmpData,
  getCurrentEmpDataFailed,
  getCurrentEmpDataSuccess,
  removeCurrentEmployee,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '@/src/components/Toast/Toast';
import ProfileEditSkeleton from '@/src/components/HR/ProfileEditSkeleton';
import { useRouter } from 'next/navigation';
import { getTimeSheet } from '@/src/utils/getTimeSheet';
import Benefits from '@/src/components/employeeData/benefits';
import Letters from '@/src/components/employeeData/letters';
import Salary from '@/src/components/employeeData/salary';
import Requests from '@/src/components/employeeData/requests';
import BenefitForm from '@/src/components/employeeData/benefitModal';
import LetterForm from '@/src/components/employeeData/letterModal';
import SalaryForm from '@/src/components/employeeData/salaryModal';
import AppCustomMonthYearPicker from '@/src/components/dashboard/appCustomMonthYearPicker';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { currentEmployee } =
    useSelector((state) => state?.hr?.employees) || {};
  const [value, setValue] = useState('one');
  const [showEditModal, setEditModal] = useState(false);
  const [showEmergencyModal, setEmergencyModal] = useState(false);
  const [showCredentialModal, setCredentialModal] = useState(false);
  const [showEditProfilelModal, setEditProfileModal] = useState(false);
  const [showEditOfficialModal, setEditOfficialModal] = useState(false);
  const [showAssetModal, setAssetModal] = useState(false);
  const [showLetterModal, setLetterModal] = useState(false);
  const [showBenefitModal, setBenefitModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [timeTracking, setTimeTracking] = useState({
    month: months[date.getMonth()],
    year: date.getFullYear(),
  });
  const params = useParams();
  const searchParams = useSearchParams();
  const param = searchParams.get('param');

  const { isLoading } = useQuery({
    staleTime: 1000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-profile', params?.id],
    queryFn: async () => {
      dispatch(getCurrentEmpData());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params?.id}`)
        .then(({ data }) => {
          dispatch(getCurrentEmpDataSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getCurrentEmpDataFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  const handleOpenModal = () => {
    setEditModal(true);
  };
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const handleCredentialModal = () => {
    setCredentialModal(true);
  };
  const handleAssetModal = () => {
    setAssetModal(true);
  };
  const handleLetterModal = () => {
    setLetterModal(true);
  };
  const handleBenefitModal = () => {
    setBenefitModal(true);
  };
  const handleEmergencyModal = () => {
    setEmergencyModal(true);
  };
  const handleEditProfileModal = () => {
    setEditProfileModal(true);
  };
  const handleEditOfficialModal = () => {
    setEditOfficialModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
    setCredentialModal(false);
    setEmergencyModal(false);
    setEditProfileModal(false);
    setEditOfficialModal(false);
    setAssetModal(false);
    setLetterModal(false);
    setBenefitModal(false);
  };
  const handleClose = () => {
    setShowFilterModal(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (param === 'wfh_request') {
      const params = new URLSearchParams(searchParams?.toString());
      params?.delete('param');

      router?.replace(`${pathname}?${params?.toString()}`);
    }
  };

  const dispatchFunction = (
    data,
    attendanceStatus,
    checkInRange,
    checkOutRange
  ) => {
    const tempData = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const newEle = Object.entries(element);
      tempData.push({
        client: newEle[0][0],
        emp_data: {
          time_sheet: getTimeSheet(
            newEle[0][1]?.time_sheet?.record,
            attendanceStatus,
            checkInRange,
            checkOutRange
          ),
          employee_details: {
            ...newEle[0][1]?.employee_details,
            expect_check_in: newEle[0][1]?.time_sheet?.expect_check_in,
            expect_check_out: newEle[0][1]?.time_sheet?.expect_check_out,
          },
        },
      });
    }
    dispatch(getAttendanceRequestSuccess(tempData));
  };

  const resetMutation = useMutation({
    mutationFn: async () => {
      return api.getData(
        `${HR_GET_EMP_ATTENDENCE}?e_email=${currentEmployee?.email}`
      );
    },
    onSuccess: ({ data }) => {
      dispatchFunction?.(data);
      queryClient.invalidateQueries(['hr-employee-attendence']);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to get data');
    },
  });
  const downloadResumeMutation = useMutation({
    mutationFn: async () => {
      return api.downloadFile(
        `${DOWNLOAD_EMP_RESUME}?id=${currentEmployee?.id}`
      );
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });
  const handleRefresh = () => {
    resetMutation.mutate();
  };

  const handleDownloadResume = () => {
    downloadResumeMutation.mutate();
  };

  useEffect(() => {
    if (param === 'wfh_request') {
      setValue('nine');
    }
  }, []);

  // Re-render logic when `value` changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src={'/images/dashboard/left.svg'}
              width={30}
              height={30}
              alt="left"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                router.back();
                dispatch(removeCurrentEmployee());
              }}
            />
            <Link href={`/hr/dashboard/employees`}>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '14px',
                  fontWeight: '400',
                }}
              >
                {employeeProfileData?.employees} /
              </Typography>
            </Link>
            <Typography
              sx={{
                color: '#595959',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              {employeeProfileData?.profile}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '-30px', paddingBottom: '40px' }}>
            <Typography
              sx={{
                color: '#171717',
                fontSize: '30px',
                fontWeight: '600',
                marginTop: '10PX',
              }}
            >
              {employeeProfileData?.profile}
            </Typography>
          </Box>
          {isLoading ? (
            <ProfileEditSkeleton />
          ) : (
            <Box
              sx={{
                borderRadius: '5px',
                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                marginBottom: '40px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', md: 'row' },
                  padding: '25px',
                  gap: { xs: '10px', sm: '10px', md: '35px' },
                  alignItems: 'center',
                  '@media (min-width: 280px) and (max-width: 450px)': {
                    flexDirection: 'column',
                  },
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Box sx={{ width: '100px', height: '100px' }}>
                    <Avatar
                      src={currentEmployee?.image_path}
                      sx={{
                        width: { xs: '100px', md: '100px' },
                        height: { xs: '100px', md: '100px' },
                        borderRadius: '50%',
                        objectFit: 'cover',
                        mx: 'auto',
                      }}
                    />
                  </Box>
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.write)) && (
                    <Image
                      src={'/images/dashboard/hr/edit.svg'}
                      width={35}
                      height={35}
                      alt="edit"
                      style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                      onClick={handleOpenModal}
                    />
                  )}
                  {showEditModal && (
                    <EditModal
                      open={showEditModal}
                      onClose={handleCloseModal}
                    />
                  )}
                </Box>
                {currentEmployee?.first_name ? (
                  <Box
                    sx={{
                      textAlign: { xs: 'center', md: 'start' },
                    }}
                  >
                    <>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: '18px',
                            sm: '20px',
                            md: '23px',
                            lg: '25px',
                          },
                          fontWeight: 500,
                          // textTransform: 'capitalize',
                          color: '#171717',
                        }}
                      >
                        {currentEmployee?.first_name}{' '}
                        {currentEmployee?.last_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '13px', sm: '14px', md: '16px' },
                          fontWeight: 500,
                          color: '#595959',
                        }}
                      >
                        {`Employee ID: `}
                        <span style={{ fontWeight: 600 }}>
                          {currentEmployee?.employee_id}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '13px', sm: '14px', md: '16px' },
                          fontWeight: 500,
                          textTransform: 'capitalize',
                          color: '#595959',
                        }}
                      >
                        {currentEmployee?.job_title}
                      </Typography>
                    </>
                  </Box>
                ) : (
                  <Stack
                    spacing={1}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xs: 'center', md: 'start' },
                    }}
                  >
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={160} height={20} />
                    <Skeleton variant="text" width={130} height={20} />
                  </Stack>
                )}
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    px: { xs: '20px', md: '30px' },
                    pt: { xs: '0', md: '30px' },
                    pb: { xs: '30px', md: '30px' },
                    alignItems: 'center',
                  }}
                >
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.download)) && (
                    <Button
                      variant="contained"
                      sx={{
                        width: '200px',
                        textTransform: 'math-auto',
                        maxWidth: {
                          xs: '100%',
                          md: '200px',
                          color: '#fff',
                          background: downloadResumeMutation?.isPending
                            ? '#ccc'
                            : '#029894',
                          '&:hover': {
                            color: '#fff',
                            background: downloadResumeMutation?.isPending
                              ? '#ccc'
                              : '#029894',
                          },
                        },
                      }}
                      onClick={handleDownloadResume}
                    >
                      {downloadResumeMutation?.isPending ? (
                        <CircularProgress size={26} color="secondary" />
                      ) : (
                        employeeProfileData?.downloadResume
                      )}
                    </Button>
                  )}
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.write)) && (
                    <Button
                      sx={{
                        width: '200px',
                        maxWidth: { xs: '100%', md: '200px' },
                        borderRadius: '5px',
                        border: '1px solid #029894',
                        textTransform: 'math-auto',
                      }}
                      onClick={handleCredentialModal}
                    >
                      {employeeProfileData?.editCredentials}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {showCredentialModal && (
            <EditEmployeeCredential
              open={showCredentialModal}
              onClose={handleCloseModal}
            />
          )}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'space-between' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Box
                  sx={{
                    width: {
                      md:
                        value === employeeProfileData?.valuethree
                          ? 'calc(100% - 260px)'
                          : value === employeeProfileData?.valueFour &&
                              employee_perms?.write
                            ? 'calc(100% - 140px)'
                            : value === employeeProfileData?.valueSix &&
                                employee_perms?.write
                              ? 'calc(100% - 140px)'
                              : value === employeeProfileData?.valueSeven &&
                                  employee_perms?.write
                                ? 'calc(100% - 140px)'
                                : value === employeeProfileData?.valueEight &&
                                    employee_perms?.write
                                  ? 'calc(100% - 393px)'
                                  : '100%',
                    },
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    variant="scrollable"
                    TabIndicatorProps={{
                      style: { backgroundColor: '#068987' },
                    }}
                  >
                    <Tab
                      value={employeeProfileData?.valueOne}
                      label={employeeProfileData?.profile}
                      wrapped
                      disableRipple={true}
                      sx={{
                        marginRight: '15px',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueTwo}
                      label={employeeProfileData?.client}
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valuethree}
                      label={employeeProfileData?.attendanceReports}
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        textTransform: 'math-auto',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueFour}
                      label="Assets"
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueFive}
                      label="Time & leaves"
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        textTransform: 'math-auto',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueSix}
                      label="Benefits"
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        textTransform: 'math-auto',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueSeven}
                      label="Letters"
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        textTransform: 'math-auto',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueEight}
                      label="Salary"
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        textTransform: 'math-auto',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                    <Tab
                      value={employeeProfileData?.valueNine}
                      label="Requests"
                      disableRipple={true}
                      sx={{
                        marginRight: '20px',
                        textTransform: 'math-auto',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                  </Tabs>
                </Box>

                {value ===
                  employeeProfileData[
                    `value${currentValue !== 'three' ? currentValue?.charAt(0)?.toUpperCase() + currentValue?.slice(1) : currentValue}`
                  ] && (
                  <Box
                    sx={{
                      width: 'auto',
                      display: 'flex',
                      borderBottom:
                        currentValue === 'one' ||
                        currentValue === 'two' ||
                        currentValue === 'five' ||
                        currentValue === 'nine'
                          ? 0
                          : 1,
                      borderColor: 'divider',
                    }}
                  >
                    {value === employeeProfileData?.valuethree && (
                      <Box
                        sx={{
                          display: 'flex',
                          marginY: { xs: '10px', md: '4px' },
                        }}
                      >
                        <Button
                          disableRipple
                          sx={{
                            marginX: '10px',
                            minWidth: '120px',
                            display: 'flex',
                            border: '1px solid #138A72',
                            color: '#138A72',
                            backgroundColor: '#fff',
                            '&:hover:': {
                              background: '#fff',
                            },
                          }}
                          startIcon={
                            !resetMutation.isPending && (
                              <Image
                                width={20}
                                height={22}
                                alt="Refresh"
                                src={`/icons/Refresh.svg`}
                              />
                            )
                          }
                          onClick={handleRefresh}
                        >
                          {resetMutation.isPending ? (
                            <CircularProgress
                              size={26}
                              sx={{ color: '#138A72' }}
                            />
                          ) : (
                            employeeProfileData?.refreshBtn
                          )}
                        </Button>
                        <Button
                          sx={{
                            minWidth: '120px',
                            background: '#138A72',
                            display: 'flex',
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
                          {employeeProfileData?.filterBtn}
                        </Button>
                      </Box>
                    )}

                    {showFilterModal && (
                      <FilterFormModal
                        open={handleOpenFilterModal}
                        onClose={handleClose}
                        attendanceStatus
                        filterForm={filterAttendanceForm}
                        url={`${HR_GET_EMP_ATTENDENCE}?e_email=${currentEmployee?.email}`}
                        dispatchFunction={dispatchFunction}
                      />
                    )}
                    {value === employeeProfileData?.valueFour && (
                      <>
                        {(role === 'super_admin' ||
                          (role !== 'super_admin' &&
                            employee_perms?.write)) && (
                          <Button
                            sx={{
                              minWidth: '160px',
                              background: '#029894',
                              display: 'flex',
                              color: '#fff',
                              textTransform: 'math-auto',
                              marginY: { xs: '10px', md: '4px' },
                              '&:hover': {
                                background: '#029894',
                              },
                            }}
                            onClick={handleAssetModal}
                          >
                            {employeeProfileData?.addAsset}
                          </Button>
                        )}
                        {showAssetModal && (
                          <AssetForm
                            open={showAssetModal}
                            onClose={handleCloseModal}
                            empData={currentEmployee}
                          />
                        )}
                      </>
                    )}

                    {value === employeeProfileData?.valueSix && (
                      <>
                        {(role === 'super_admin' ||
                          (role !== 'super_admin' &&
                            employee_perms?.write)) && (
                          <Button
                            sx={{
                              minWidth: '160px',
                              maxWidth: '160px',
                              width: '160px',
                              height: '42px',
                              background: '#029894',
                              display: 'flex',
                              color: '#fff',
                              textTransform: 'math-auto',
                              marginY: { xs: '10px', md: '3px' },
                              '&:hover': {
                                background: '#029894',
                              },
                            }}
                            onClick={handleBenefitModal}
                          >
                            {employeeProfileData?.addBenefit}
                          </Button>
                        )}
                        {showBenefitModal && (
                          <BenefitForm
                            open={showBenefitModal}
                            onClose={handleCloseModal}
                            empData={currentEmployee}
                          />
                        )}
                      </>
                    )}

                    {value === employeeProfileData?.valueSeven && (
                      <>
                        {(role === 'super_admin' ||
                          (role !== 'super_admin' &&
                            employee_perms?.write)) && (
                          <Button
                            sx={{
                              minWidth: '160px',
                              maxWidth: '160px',
                              width: '160px',
                              height: '42px',
                              background: '#029894',
                              display: 'flex',
                              color: '#fff',
                              textTransform: 'math-auto',
                              marginY: { xs: '10px', md: '3px' },
                              '&:hover': {
                                background: '#029894',
                              },
                            }}
                            onClick={handleLetterModal}
                          >
                            {employeeProfileData?.addLetter}
                          </Button>
                        )}
                        {showLetterModal && (
                          <LetterForm
                            open={showLetterModal}
                            onClose={handleCloseModal}
                            empData={currentEmployee}
                          />
                        )}
                      </>
                    )}

                    {value === employeeProfileData?.valueEight && (
                      <>
                        {(role === 'super_admin' ||
                          (role !== 'super_admin' &&
                            employee_perms?.write)) && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: { xs: 'start', sm: 'center' },
                              justifyContent: 'space-between',
                              gap: 1.5,
                              flexDirection: { xs: 'column', sm: 'row' },
                              marginY: { xs: '10px', md: '0' },
                              pb: { xs: '0', md: '5px' },
                            }}
                          >
                            <Box sx={{ order: { xs: 1, sm: 0 } }}>
                              <AppCustomMonthYearPicker
                                timeTracking={timeTracking}
                                setTimeTracking={setTimeTracking}
                              />
                            </Box>
                            <Button
                              sx={{
                                order: { xs: 0, sm: 1 },
                                minWidth: { xs: '100%', sm: '160px' },
                                maxWidth: '160px',
                                width: '160px',
                                height: '42px',
                                background: '#029894',
                                display: 'flex',
                                color: '#fff',
                                textTransform: 'math-auto',
                                '&:hover': {
                                  background: '#029894',
                                },
                              }}
                              onClick={handleLetterModal}
                            >
                              {employeeProfileData?.addSalary}
                            </Button>
                          </Box>
                        )}
                        {showLetterModal && (
                          <SalaryForm
                            open={showLetterModal}
                            onClose={handleCloseModal}
                            empData={currentEmployee}
                          />
                        )}
                      </>
                    )}

                    {value === employeeProfileData?.valueNine && null}
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              {value === employeeProfileData?.valueOne ? (
                <Profile
                  isLoading={isLoading}
                  handleOpenModal={handleOpenModal}
                  showEditModal={showEditModal}
                  handleCloseModal={handleCloseModal}
                  handleEmergencyModal={handleEmergencyModal}
                  showEmergencyModal={showEmergencyModal}
                  handleEditProfileModal={handleEditProfileModal}
                  showEditProfilelModal={showEditProfilelModal}
                  handleEditOfficialModal={handleEditOfficialModal}
                  showEditOfficialModal={showEditOfficialModal}
                  data={currentEmployee}
                />
              ) : value === employeeProfileData?.valueTwo ? (
                <>
                  <Client />
                </>
              ) : value === employeeProfileData?.valuethree ? (
                <AttendanceReport employeeData={currentEmployee || {}} />
              ) : value === employeeProfileData?.valueFive ? (
                <TimeAndLeaves />
              ) : value === employeeProfileData?.valueFour ? (
                <Assets />
              ) : value === employeeProfileData?.valueSix ? (
                <Benefits />
              ) : value === employeeProfileData?.valueSeven ? (
                <Letters />
              ) : value === employeeProfileData?.valueEight ? (
                <Salary timeTracking={timeTracking} />
              ) : value === employeeProfileData?.valueNine ? (
                <Requests empData={currentEmployee} />
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
