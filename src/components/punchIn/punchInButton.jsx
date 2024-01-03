import React from 'react';
import { Box, Button } from '@mui/material';

const PunchRequestButton = ({ onClose, closeBtn, cancelBtn, saveBtn }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '80px',
        }}
      >
        {cancelBtn && (
          <Button
            sx={{
              border: '1px solid #029894',
              background: '#FFF',
              width: { xs: '80px', md: '120px' },
              borderRadius: '5px',
            }}
            onClick={onClose}
          >
            {cancelBtn}
          </Button>
        )}
        {saveBtn && (
          <Button
            variant="contained"
            sx={{ width: { xs: '80px', md: '120px' }, borderRadius: '5px' }}
          >
            {saveBtn}
          </Button>
        )}
        {closeBtn && (
          <Button
            sx={{
              border: '1px solid #029894',
              background: '#FFF',
              width: { xs: '80px', md: '120px' },
              borderRadius: '5px',
            }}
            onClick={onClose}
          >
            {closeBtn}
          </Button>
        )}
      </Box>
    </>
  );
};
export default PunchRequestButton;
