import { employeeProfileData } from '@/src/constants/employee-profile';
import EditEmergencyModal from '@/src/components/employee-data/EmergencyEditModal';
import EditPersonalModal from '@/src/components/employee-data/EditPersonalData';
import PersonalInformation from '@/src/components/employee-data/PersonalInformation';
import EmergencyContact from '@/src/components/employee-data/EmergencyContact';
import { Stack } from '@mui/system';
import OfficialInformation from '@/src/components/employee-data/OfficialInformation';
import EditOfficialModal from '@/src/components/employee-data/EditOfficialData';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = ({
  handleCloseModal,
  handleEditProfileModal,
  handleEmergencyModal,
  showEditProfilelModal,
  showEmergencyModal,
  handleEditOfficialModal,
  showEditOfficialModal,
  data,
  isLoading,
}) => {
  const { employee_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const { role } = useSelector((state) => state?.auth?.userData) || {};

  return (
    <Box sx={{ flexGrow: 1, mt: '40px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6} xl={4}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: { xs: '13px', sm: '20px' },
              '@media(min-width:320px) and (max-width: 500px)': {
                paddingY: '13px',
                paddingX: '10px',
              },
              '@media(max-width:319px)': {
                paddingY: '12px',
                paddingX: '10px',
              },
            }}
          >
            {isLoading ? (
              <Stack
                sx={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component={'img'}
                  src="/icons/no-record-found.svg"
                  width={'auto'}
                  height={'auto'}
                  alt="arrow"
                />
              </Stack>
            ) : (
              <Box sx={{ width: '100%', height: 'auto', position: 'relative' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '17px', sm: '20px' },
                      fontWeight: 600,
                      '@media (max-width: 499px)': {
                        textAlign: 'center',
                      },
                      '@media(max-width:319px)': {
                        fontSize: '15px',
                      },
                    }}
                  >
                    {employeeProfileData?.personalDetails}
                  </Typography>

                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.[0].write)) && (
                    <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                      <Box
                        component={'img'}
                        src={'/images/dashboard/hr/edit.svg'}
                        alt="edit"
                        onClick={handleEditProfileModal}
                        sx={{
                          width: { xs: 25, sm: 30, md: 35 },
                          height: { xs: 25, sm: 30, md: 35 },
                          cursor: 'pointer',
                          '@media(max-width:319px)': {
                            width: 22,
                            height: 22,
                          },
                        }}
                      />
                    </Box>
                  )}
                  {showEditProfilelModal && (
                    <EditPersonalModal
                      showEditProfilelModal={showEditProfilelModal}
                      onClose={handleCloseModal}
                      data={data}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    mt: { xs: 0, sm: 2 },
                    display: 'flex',
                    flexDirection: 'column',
                    pt: { xs: 2, sm: 0 },
                  }}
                >
                  <PersonalInformation data={data} />
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={4}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: { xs: '13px', sm: '20px' },
              '@media(min-width:320px) and (max-width: 500px)': {
                paddingY: '13px',
                paddingX: '10px',
              },
              '@media(max-width:319px)': {
                paddingY: '12px',
                paddingX: '10px',
              },
            }}
          >
            {isLoading ? (
              <Stack
                sx={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component={'img'}
                  src="/icons/no-record-found.svg"
                  width={'auto'}
                  height={'auto'}
                  alt="arrow"
                />
              </Stack>
            ) : (
              <Box sx={{ width: '100%', height: 'auto', position: 'relative' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '17px', sm: '20px' },
                      fontWeight: 600,
                      '@media (max-width: 499px)': {
                        textAlign: 'center',
                      },
                      '@media(max-width:319px)': {
                        fontSize: '15px',
                      },
                    }}
                  >
                    {employeeProfileData?.officialDetails}
                  </Typography>

                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.[0].write)) && (
                    <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                      <Box
                        component={'img'}
                        src={'/images/dashboard/hr/edit.svg'}
                        alt="edit"
                        onClick={handleEditOfficialModal}
                        sx={{
                          width: { xs: 25, sm: 30, md: 35 },
                          height: { xs: 25, sm: 30, md: 35 },
                          cursor: 'pointer',
                          '@media(max-width:319px)': {
                            width: 22,
                            height: 22,
                          },
                        }}
                      />
                    </Box>
                  )}
                  {showEditOfficialModal && (
                    <EditOfficialModal
                      showEditOfficialModal={showEditOfficialModal}
                      onClose={handleCloseModal}
                      data={data}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    mt: { xs: 0, sm: 2 },
                    display: 'flex',
                    flexDirection: 'column',
                    pt: { xs: 2, sm: 0 },
                  }}
                >
                  <OfficialInformation data={data} />
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={4}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              padding: '20px',
            }}
          >
            {isLoading ? (
              <Stack
                sx={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component={'img'}
                  src="/icons/no-record-found.svg"
                  width={'auto'}
                  height={'auto'}
                  alt="arrow"
                />
              </Stack>
            ) : (
              <Box sx={{ width: '100%', position: 'relative' }}>
                <Box
                  sx={{
                    ml: { xs: 2.5, lg: 3, xl: 4.5 },
                    '@media (max-width: 499px)': { ml: 0 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '17px', sm: '20px' },
                      fontWeight: 600,
                      '@media (max-width: 499px)': {
                        textAlign: 'center',
                      },
                      '@media(max-width:319px)': {
                        fontSize: '15px',
                      },
                    }}
                  >
                    {employeeProfileData?.emergencyContact}
                  </Typography>
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.[0].write)) && (
                    <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                      <Box
                        component={'img'}
                        src={'/images/dashboard/hr/edit.svg'}
                        width={35}
                        height={35}
                        alt="edit"
                        onClick={handleEmergencyModal}
                        sx={{
                          width: { xs: 25, sm: 30, md: 35 },
                          height: { xs: 25, sm: 30, md: 35 },
                          cursor: 'pointer',
                          '@media(max-width:319px)': {
                            width: 22,
                            height: 22,
                          },
                        }}
                      />
                    </Box>
                  )}
                  {showEmergencyModal && (
                    <EditEmergencyModal
                      showEmergencyModal={showEmergencyModal}
                      onClose={handleCloseModal}
                      data={data}
                    />
                  )}
                </Box>
                <EmergencyContact data={data} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
