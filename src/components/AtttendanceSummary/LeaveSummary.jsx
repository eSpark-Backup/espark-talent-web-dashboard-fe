import React from 'react';
import { Box, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';

const LeaveSummary = () => {
  return (
    <>
      <Box
        sx={{
          height: '430px',
          borderRadius: '10px',
          background: '#FFF',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 2.5,
            height: '70px',
            borderRadius: '10px 10px 0px 0px',
            borderBottom: '1px solid #E4E4E4',
            background: '#FFF',
          }}
        >
          <Typography variant="h5">Leave summary</Typography>
        </Box>
        <Box
          sx={{
            px: { xs: 3, sm: 3, lg: 3 },
            py: 3,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              borderRadius: '5px',
              px: 1,
              py: 3,
              border: '1px solid #E4E4E4',
              background: '#FFF',
              //   height: '100px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box sx={{ Width: '100%' }}>
              <Typography variant="h6" color="text.secondary">
                Casual leaves
              </Typography>
              <Typography variant="body1" color="text.secondary">
                (LRT-00001)
              </Typography>
            </Box>
            <Box sx={{ width: '70%' }}>
              <ProgressBar />
              <Typography variant="body2" color="text.secondary">
                30%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              borderRadius: '5px',
              px: 1,
              py: 3,
              border: '1px solid #E4E4E4',
              background: '#FFF',
              //   height: '100px',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            }}
          >
            <Box sx={{ Width: '100%' }}>
              <Typography variant="h6" color="text.secondary">
                Casual leaves
              </Typography>
              <Typography variant="body1" color="text.secondary">
                (LRT-00001)
              </Typography>
            </Box>
            <Box sx={{ width: '70%' }}>
              <ProgressBar />
              <Typography variant="body2" color="text.secondary">
                30%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LeaveSummary;
