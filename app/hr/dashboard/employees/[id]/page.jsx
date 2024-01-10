'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import Profile from '@/src/components/employeeData/profile';
import AttendanceReport from '@/src/components/employeeData/attendanceReports';
import Assets from '@/src/components/employeeData/assets';
import EditEmployeeCredential from '@/src/components/employeeData/editEmployeeCredential';
import EditModal from '@/src/components/employeeData/editModal';
import Client from '@/src/components/employeeData/client';

const Page = () => {
  const [value, setValue] = useState('one');
  const [showEditModal, setEditModal] = useState(false);
  const [showEmergancyModal, setEmergencyModal] = useState(false);
  const [showCredentialModal, setCredentialModal] = useState(false);
  const [showEditProfilelModal, setEditProfileModal] = useState(false);

  const handleOpenModal = () => {
    setEditModal(true);

    console.log('jjj');
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
          xl={9}
          display={'flex'}
          flexDirection={'column'}
          gap={7}
        >
          <Box
            sx={{
              borderRadius: '5px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center', md: 'space-between' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '25px',
                gap: '15px',
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Image
                  src={'/images/dashboard/hr/employee.svg'}
                  width={100}
                  height={100}
                  alt="employee"
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

              <Box>
                <Typography sx={{ fontSize: '25px', fontWeight: 600 }}>
                  John Doe
                </Typography>
                <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
                  Employee ID:es-00020
                </Typography>
                <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
                  Web developer
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
                  sx={{ maxWidth: { xs: '100px', md: '200px' } }}
                >
                  {employeeProfileData?.downloadResume}
                </Button>
                <Button
                  sx={{
                    maxWidth: { xs: '100px', md: '200px' },
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
          </Box>

          {/* <Box display={'flex'}>
            <Box
              sx={{
                width: '100%',
                height: '430px',
                borderRadius: '5px',
                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                padding: '25px',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      paddingBottom: '15px',
                    }}
                  >
                    {employeeProfileData?.personalInformation}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    {employeeDataLabel.map((data, index) => (
                      <Typography
                        key={index}
                        sx={{ fontSize: '16px', fontWeight: 400 }}
                      >
                        {data.label}
                      </Typography>
                    ))}
                  </Box>
                  <Box>
                    {employeeData.map((data, index) => (
                      <Typography
                        key={index}
                        sx={{ fontSize: '16px', fontWeight: 400 }}
                      >
                        {data.value}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  background: '#fff',
                }}
              ></Box>
              <Image
                src={'/images/dashboard/hr/edit.svg'}
                width={35}
                height={35}
                alt="edit"
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '430px',
                borderRadius: '5px',
                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                padding: '25px',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      paddingBottom: '15px',
                    }}
                  >
                    {employeeProfileData?.emergencyContact}
                  </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Box
                    sx={{
                      borderRadius: '5px',
                      border: '1px solid #E4E4E4',
                      padding: '10px',
                    }}
                  >
                    <Box sx={{ borderBottom: '1px solid #E4E4E4' }}>
                      <Typography textAlign={'center'}>Primary</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        {emergencyContact.map((data, index) => (
                          <Typography
                            key={index}
                            sx={{ fontSize: '16px', fontWeight: 400 }}
                          >
                            {data.label}
                          </Typography>
                        ))}
                      </Box>
                      <Box>
                        {emergencyContactData.map((data, index) => (
                          <Typography
                            key={index}
                            sx={{ fontSize: '16px', fontWeight: 400 }}
                          >
                            {data.value}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: '5px',
                      border: '1px solid #E4E4E4',
                      padding: '10px',
                    }}
                  >
                    <Box sx={{ borderBottom: '1px solid #E4E4E4' }}>
                      <Typography textAlign={'center'}>Primary</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        {emergencyContact.map((data, index) => (
                          <Typography
                            key={index}
                            sx={{ fontSize: '16px', fontWeight: 400 }}
                          >
                            {data.label}
                          </Typography>
                        ))}
                      </Box>
                      <Box>
                        {emergencyContactData.map((data, index) => (
                          <Typography
                            key={index}
                            sx={{ fontSize: '16px', fontWeight: 400 }}
                          >
                            {data.value}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Image
                src={'/images/dashboard/hr/edit.svg'}
                width={35}
                height={35}
                alt="edit"
              />
            </Box>
          </Box> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
