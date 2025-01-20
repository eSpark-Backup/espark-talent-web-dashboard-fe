import React, { useEffect, forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

import WFHRequestForm from './WFHRequestForm';
import WFHRequestDataView from './WFHRequestDataView';

const WFHRequestModal = forwardRef(
  ({ createModal, modalData, handleClose }, ref) => {
    useEffect(() => {}, [modalData]);

    return (
      <Box
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
            {createModal ? (
              <div>Create WFH request</div>
            ) : (
              <div>WFH request view</div>
            )}
          </Typography>
        </Box>
        {createModal ? (
          <WFHRequestForm handleClose={handleClose} />
        ) : (
          <WFHRequestDataView
            modalData={modalData}
            handleClose={handleClose}
            isEmployee
          />
        )}
      </Box>
    );
  }
);

export default WFHRequestModal;
