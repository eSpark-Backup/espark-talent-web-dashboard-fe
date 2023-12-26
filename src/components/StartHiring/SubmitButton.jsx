import React from 'react';
import { Box, Button } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

const Submit = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '40px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{
            width: '88%',
            padding: '10px',
            '&:hover': {
              background: '#fff',
              color: 'teal',
              border: '1px solid teal',
            },
          }}
        >
          {HIRING_FORM_DATA?.submit}
        </Button>
      </Box>
    </>
  );
};
export default Submit;
