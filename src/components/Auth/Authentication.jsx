'use client';
import * as React from 'react';

import AuthForm from './AuthForm';
import {
  Auth_Background_Image,
  Auth_Fields,
  Auth_Signin,
  Trouble_Modal,
} from '@/src/constants/authConstant';
import { Box } from '@mui/material';
import HavingTroubleModal from '../modals/HavingTroubleModal';

export default function Authentication() {
  const [troubleModal, setTroubleModal] = React.useState(false);

  const handleOpenTroubleModal = () => setTroubleModal(true);
  const handleCloseTroubleModal = () => setTroubleModal(false);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Box
        sx={{
          width: '756px',
          height: '100vh',
          display: { xs: 'none', lg: 'flex' },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: { xs: 'none', lg: 'flex' },
            backgroundImage: `url(${Auth_Background_Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '95%',
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', lg: 'calc(100% - 650px)' },
        }}
      >
        <AuthForm
          uiData={Auth_Signin}
          fields={Auth_Fields}
          handleOpenTroubleModal={handleOpenTroubleModal}
        />
        <HavingTroubleModal
          data={Trouble_Modal}
          open={troubleModal}
          onClose={handleCloseTroubleModal}
        />
      </Box>
    </Box>
  );
}
