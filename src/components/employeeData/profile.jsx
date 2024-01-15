import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import EditEmergencyModal from './emergencyEditModal';
import EditPersonalModal from './editPersonalData';
import PersonalInformation from './personalInformation';
import EmergencyContact from './emergencyContact';

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
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '20px',
          '@media (min-width: 280px) and (max-width: 350px)': {
            padding: '10px',
          },
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {employeeProfileData?.personalInformation}
            </Typography>
            <Image
              src={'/images/dashboard/hr/edit.svg'}
              width={35}
              height={35}
              alt="edit"
              onClick={handleEditProfileModal}
              style={{
                marginBottom: '15px',
              }}
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
              display: 'flex',
            }}
          >
            <PersonalInformation />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                '@media (min-width: 900px) and (max-width: 920px)': {
                  display: 'none',
                },
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '36px',
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {employeeProfileData?.emergencyContact}
            </Typography>
            <Image
              src={'/images/dashboard/hr/edit.svg'}
              width={35}
              height={35}
              alt="edit"
              onClick={handleEmergencyModal}
              style={{
                marginBottom: '15px',
              }}
            />
            {showEmergancyModal && (
              <EditEmergencyModal
                handleEmergencyModal={handleEmergencyModal}
                onClose={handleCloseModal}
              />
            )}
          </Box>
          <EmergencyContact />
        </Box>
      </Box>
    </Box>
  );
};
export default Profile;
