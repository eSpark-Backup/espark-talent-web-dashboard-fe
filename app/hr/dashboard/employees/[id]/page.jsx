'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import Profile from '@/src/components/employeeData/profile';
import AttendanceReport from '@/src/components/employeeData/attendanceReports';
import Assets from '@/src/components/employeeData/assets';
import EditEmployeeCredential from '@/src/components/employeeData/editEmployeeCredential';
import EditModal from '@/src/components/employeeData/editModal';
import Client from '@/src/components/employeeData/client';
import { getEmployeeData } from '@/src/utils/employeeProfile';

const Page = () => {
  const [value, setValue] = useState('one');
  const [showEditModal, setEditModal] = useState(false);
  const [showEmergancyModal, setEmergencyModal] = useState(false);
  const [showCredentialModal, setCredentialModal] = useState(false);
  const [showEditProfilelModal, setEditProfileModal] = useState(false);

  const pathname = usePathname();
  const employeeId = pathname.split('/').pop();
  const findemployeeId = employeeId[employeeId.length - 1];
  const employeeData = getEmployeeData(findemployeeId);
  const handleOpenModal = () => {
    setEditModal(true);
  };
  const handleCredentialModal = () => {
    setCredentialModal(true);
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
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              src={'/images/dashboard/Left.svg'}
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
                <Typography sx={{ fontSize: '25px', fontWeight: 500 }}>
                  {employeeData ? employeeData.name : 'Employee not found'}
                </Typography>
                <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                  Employee ID:{' '}
                  {employeeData
                    ? employeeData.employeeId
                    : 'Employee not found'}
                </Typography>
                <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                  {employeeData ? employeeData.role : 'Employee not found'}
                </Typography>
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
                  sx={{ maxWidth: { xs: '300px', md: '200px' } }}
                >
                  {employeeProfileData?.downloadResume}
                </Button>
                <Button
                  sx={{
                    maxWidth: { xs: '300px', md: '200px' },
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
                marginBottom: '40px',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                variant="scrollable"
              >
                <Tab value="one" label="Profile" wrapped />
                <Tab value="two" label="Client" />
                <Tab value="three" label="Attendance reports" />
                <Tab value="four" label="Assets" />
              </Tabs>
            </Box>

            {value === 'one' ? (
              <Profile
                handleOpenModal={handleOpenModal}
                showEditModal={showEditModal}
                handleCloseModal={handleCloseModal}
                handleEmergencyModal={handleEmergencyModal}
                showEmergancyModal={showEmergancyModal}
                handleEditProfileModal={handleEditProfileModal}
                showEditProfilelModal={showEditProfilelModal}
              />
            ) : value === 'two' ? (
              <Client />
            ) : value === 'three' ? (
              <AttendanceReport />
            ) : (
              <Assets />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
