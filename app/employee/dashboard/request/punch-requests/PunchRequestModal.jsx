'use client';
import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

import PunchRequestDataView from './PunchRequestFormView';
import PunchRequestForm from './PunchRequestForm';
import dayjs from 'dayjs';

const PunchRequestModal = forwardRef(
  ({ createModal, modalData, handleClose, handleConfirmDelete }, ref) => {
    return (
      <Box
        tabIndex={-1}
        ref={ref}
        sx={{
          mx: 'auto',
          bgcolor: '#fff',
          maxWidth: '1480px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '82%',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{ width: '100%', borderBottom: '1px solid #E4E4E4', p: 2, px: 3 }}
        >
          <Typography
            sx={{
              textAlign: { xs: 'center', sm: 'start' },
              fontSize: { xs: '23px', sm: '25px' },
              fontWeight: '600',
            }}
          >
            {createModal ? 'Create punch request' : 'Punch request view'}
          </Typography>
        </Box>
        {createModal ? (
          <PunchRequestForm handleClose={handleClose} />
        ) : (
          <PunchRequestDataView
            modalData={{
              ...modalData,
              status: '',
              date: dayjs(modalData?.date)?.format('MMMM D, YYYY'),
            }}
            handleClose={handleClose}
            handleConfirmDelete={handleConfirmDelete}
            isEmployee
          />
        )}
      </Box>
    );
  }
);

PunchRequestModal.displayName = 'PunchRequestModal';
export default PunchRequestModal;
