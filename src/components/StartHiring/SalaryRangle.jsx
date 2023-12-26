import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const SalaryRange = () => {
  const textField = [0, 1];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Typography>{HIRING_FORM_DATA.salaryRange}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {textField.map((index, arrayIndex) => (
          <React.Fragment key={index}>
            <TextField
              required={true}
              sx={{
                width: { xs: '50%', md: '130px' },
                '@media (min-width: 960px) and (max-width: 1200px)': {
                  width: '50%',
                },
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                  {
                    display: 'none',
                  },
              }}
              variant="outlined"
              type="number"
              placeholder={'0$'}
              InputProps={{
                '& input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                // endAdornment: (
                //   <InputAdornment position="start">
                //     <Typography variant="body1">$</Typography>
                //   </InputAdornment>
                //     ),
              }}
            />
            {arrayIndex < textField.length - 1 && (
              <Typography
                variant="body1"
                sx={{
                  marginTop: '10px',
                }}
              >
                _
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};
export default SalaryRange;
