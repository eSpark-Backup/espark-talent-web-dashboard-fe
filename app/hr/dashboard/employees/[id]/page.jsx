'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import Profile from '@/src/components/employeeData/profile';
import AttendanceReport from '@/src/components/employeeData/attendanceReports';
import EditEmployeeCredential from '@/src/components/employeeData/editEmployeeCredential';
import EditModal from '@/src/components/employeeData/editModal';
// import { getEmployeeData } from '@/src/utils/employeeProfile';
import Client from '@/src/components/employeeData/client';
import Assets from '@/src/components/employeeData/assets';
import AssetForm from '@/src/components/employeeData/assetModal';
// import { allEmployees } from '@/src/constants/AllEmployee';
import TimeAndLeaves from '@/src/components/employeeData/timeAndLeaves';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterAttendanceForm } from '@/src/constants/data/forms/filter-form';
import { useQuery } from '@tanstack/react-query';
import { HR_GET_EMP_PROFILE } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentEmpData,
  getCurrentEmpDataFailed,
  getCurrentEmpDataSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';

const Page = () => {
  const dispatch = useDispatch();
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const [value, setValue] = useState('one');
  const [showEditModal, setEditModal] = useState(false);
  const [showEmergencyModal, setEmergencyModal] = useState(false);
  const [showCredentialModal, setCredentialModal] = useState(false);
  const [showEditProfilelModal, setEditProfileModal] = useState(false);
  const [showAssetModal, setAssetModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  // const [isOpenContractModal, setIsOpenContractModal] = useState(false);

  const params = useParams();
  const { isLoading } = useQuery({
    staleTime: 1000,
    queryKey: ['employee-profile'],
    queryFn: async () => {
      dispatch(getCurrentEmpData());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          dispatch(getCurrentEmpDataSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getCurrentEmpDataFailed());
          console.log({ err });
        });
    },
  });

  // const employeeData = getEmployeeData(id, allEmployees);
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
  const handleEmergencyModal = () => {
    setEmergencyModal(true);
  };
  const handleEditProfileModal = () => {
    setEditProfileModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
    setCredentialModal(false);
    setEmergencyModal(false);
    setEditProfileModal(false);
    setAssetModal(false);
  };
  const handleClose = () => {
    setShowFilterModal(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const handleOpenContractModal = () => {
  //   setIsOpenContractModal(true);
  // };
  // const handleCloseContractModal = () => {
  //   setIsOpenContractModal(false);
  // }; may be use in future

  return (
    <>
      {
        isLoading ? (
          'Loading'
        ) : (
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
                />
                <Link href={`/hr/dashboard/employees`}>
                  <Typography> {employeeProfileData?.employees} /</Typography>
                </Link>
                <Typography
                  sx={{
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
                    gap: { xs: '10px', sm: '0px', md: '35px' },
                    alignItems: 'center',
                    '@media (min-width: 280px) and (max-width: 450px)': {
                      flexDirection: 'column',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Box
                      sx={{
                        width: { xs: '150px', md: '100px' },
                        height: { xs: '150px', md: '100px' },
                      }}
                      src="/images/dashboard/employee.svg"
                      component={'img'}
                    />
                    <Image
                      src={'/images/dashboard/hr/edit.svg'}
                      width={35}
                      height={35}
                      alt="edit"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                      onClick={handleOpenModal}
                    />
                    {showEditModal && (
                      <EditModal
                        handleOpenModal={handleOpenModal}
                        onClose={handleCloseModal}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      '@media (min-width: 280px) and (max-width: 450px)': {
                        marginLeft: '40px',
                      },
                    }}
                  >
                    <>
                      <Typography sx={{ fontSize: '25px', fontWeight: 500 }}>
                        {currentEmployee?.employee_name}
                      </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                        {currentEmployee?.employee_id}
                      </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                        {currentEmployee?.job_title}
                      </Typography>
                    </>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '30px',
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        maxWidth: {
                          xs: '100%',
                          md: '200px',
                          color: '#fff',
                          background: '#029894',
                          '&:hover': {
                            color: '#fff',
                            background: '#029894',
                          },
                        },
                      }}
                    >
                      {employeeProfileData?.downloadResume}
                    </Button>
                    <Button
                      sx={{
                        maxWidth: { xs: '100%', md: '200px' },
                        borderRadius: '5px',
                        border: '1px solid #029894',
                      }}
                      onClick={handleCredentialModal}
                    >
                      {employeeProfileData?.editCredentials}
                    </Button>
                  </Box>
                </Box>
              </Box>
              {showCredentialModal && (
                <EditEmployeeCredential
                  open={handleCredentialModal}
                  onClose={handleCloseModal}
                />
              )}
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    marginBottom:
                      value === employeeProfileData?.valueTwo ||
                      value === employeeProfileData?.valuethree ||
                      value === 'five'
                        ? '0px'
                        : '40px',
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'space-between' },
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Box>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="wrapped label tabs example"
                      variant="scrollable"
                    >
                      <Tab
                        value={employeeProfileData?.valueOne}
                        label={employeeProfileData?.profile}
                        wrapped
                        disableRipple={true}
                      />
                      <Tab
                        value={employeeProfileData?.valueTwo}
                        label={employeeProfileData?.client}
                        disableRipple={true}
                      />
                      <Tab
                        value={employeeProfileData?.valuethree}
                        label={employeeProfileData?.attendanceReports}
                        disableRipple={true}
                      />
                      <Tab
                        value={employeeProfileData?.valueFour}
                        label="Assets"
                        disableRipple={true}
                      />
                      <Tab
                        value={'five'}
                        label="Time & leaves"
                        disableRipple={true}
                      />
                    </Tabs>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: { xs: '20px', md: '0px' },
                    }}
                  >
                    {value === employeeProfileData?.valuethree && (
                      <Box
                        sx={{
                          display: 'flex',
                          marginBottom: '10px',
                        }}
                      >
                        <Button
                          sx={{
                            marginX: '10px',
                            minWidth: '120px',
                            display: 'flex',
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
                          {employeeProfileData?.refreshBtn}
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
                      />
                    )}
                    {value === employeeProfileData?.valueFour && (
                      <>
                        <Button
                          sx={{
                            minWidth: '160px',
                            background: '#029894',
                            display: 'flex',
                            color: '#fff',
                            textTransform: 'math-auto',
                            marginBottom: '10px',
                            '&:hover': {
                              background: '#029894',
                            },
                          }}
                          onClick={handleAssetModal}
                        >
                          {employeeProfileData?.addAsset}
                        </Button>
                        {showAssetModal && (
                          <AssetForm
                            open={handleAssetModal}
                            onClose={handleCloseModal}
                            data={currentEmployee}
                          />
                        )}
                      </>
                    )}
                    {/* {value === 'six' && ( 
                    <>
                      <Button
                        sx={{
                          minWidth: '160px',
                          background: '#029894',
                          display: 'flex',
                          color: '#fff',
                          textTransform: 'math-auto',
                          marginBottom: '10px',
                          '&:hover': {
                            background: '#029894',
                          },
                        }}
                        onClick={handleOpenContractModal}
                      >
                        Add Contract
                      </Button>
                    </>
                  )} */}{' '}
                    {/* maybe use in future */}
                  </Box>
                </Box>
                {value === employeeProfileData?.valueOne ? (
                  <Profile
                    handleOpenModal={handleOpenModal}
                    showEditModal={showEditModal}
                    handleCloseModal={handleCloseModal}
                    handleEmergencyModal={handleEmergencyModal}
                    showEmergencyModal={showEmergencyModal}
                    handleEditProfileModal={handleEditProfileModal}
                    showEditProfilelModal={showEditProfilelModal}
                    data={currentEmployee}
                  />
                ) : value === employeeProfileData?.valueTwo ? (
                  <Client />
                ) : value === employeeProfileData?.valuethree ? (
                  <AttendanceReport employeeData={currentEmployee} />
                ) : value === 'five' ? (
                  <TimeAndLeaves />
                ) : (
                  //       : value === 'six' ? (
                  // <Contract />
                  //       ) :                    {/* maybe use in future */}

                  <Assets />
                )}
              </Box>
            </Grid>
          </Grid>
        )
        // : (
        //   <Typography
        //     sx={{
        //       fontSize: '16px',
        //       fontWeight: 600,
        //       textAlign: 'center',
        //       marginTop: '200px',
        //     }}
        //   >
        //     {employeeProfileData?.noidFound}
        //   </Typography>
        // )
      }
      {/* <AddContractModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
      /> */}
    </>
  );
};

export default Page;
