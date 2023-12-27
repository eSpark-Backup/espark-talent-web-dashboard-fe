import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const PasswordSection = ({ User_Password }) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, my: 4 }}>
        <Typography variant="h6">{User_Password?.title}</Typography>
        {User_Password?.Fields?.map((item, index) => (
          <Box component={'div'} key={index}>
            <Typography sx={{ mb: 1 }}>{item?.label}</Typography>
            <TextField
              placeholder={item?.place}
              type={item?.type}
              variant="outlined"
              sx={{
                width: '300px',
                height: 'auto',
                '@media (max-width: 380px)': {
                  width: '100%',
                },
              }}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          sx={{
            width: '120px',
            height: '40px',
            '@media (max-width: 380px)': {
              width: '100%',
            },
          }}
        >
          {User_Password?.buttonText}
        </Button>
      </Box>
    </>
  );
};

export default PasswordSection;
