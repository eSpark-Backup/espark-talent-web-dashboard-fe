import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  emergencyContact,
  emergencyContactData,
  employeeData,
  employeeDataLabel,
  employeeProfileData,
} from '@/src/constants/employeeProfile';
import Image from 'next/image';
import EditEmergencyModal from './emergencyEditModal';
import EditPersonalModal from './editPersonalData';

const Profile = ({
  showEditProfilelModal,
  handleCloseModal,
  handleEmergencyModal,
  showEmergancyModal,
  handleEditProfileModal,
}) => {
  return (
    <Box
      display={'flex'}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        gap: '60px',
      }}
    >
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
                  sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: 400 }}
                >
                  {data.label}
                </Typography>
              ))}
            </Box>
            <Box>
              {employeeData.map((data, index) => (
                <Typography
                  key={index}
                  sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: 400 }}
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
          onClick={handleEditProfileModal}
        />
        {showEditProfilelModal && (
          <EditPersonalModal
            handleEditProfileModal={handleEditProfileModal}
            onClose={handleCloseModal}
          />
        )}
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
          onClick={handleEmergencyModal}
        />
        {showEmergancyModal && (
          <EditEmergencyModal
            handleEmergencyModal={handleEmergencyModal}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </Box>
  );
};
export default Profile;
