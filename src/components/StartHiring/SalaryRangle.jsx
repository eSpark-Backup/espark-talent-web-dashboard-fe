import React, { Fragment } from 'react';
import { Box, TextField, Typography } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

const SalaryRange = () => {
  const numberOfFields = HIRING_FORM_DATA?.numberOfFields;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Typography>{HIRING_FORM_DATA?.salaryRange}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {Array.from({ length: numberOfFields }, (_, index) => (
          <Fragment key={index}>
            <TextField
              required={true}
              sx={{
                width: { xs: '50%', md: '136px' },
                border: 'solid 0px #ccc',
                height: '46px',
                borderRadius: '5px',
                '@media (min-width: 960px) and (max-width: 1200px)': {
                  width: '50%',
                },
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                  {
                    display: 'none',
                  },
                '&:focus': {
                  borderColor: 'teal',
                  border: '0px solid',
                },
                '& fieldset': {
                  height: '49px',
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
                style: {
                  '& input:placeholder': {
                    marginTop: '-10px', // Adjust the margin-top value as needed
                  },
                },
              }}
            />
            {index < numberOfFields - 1 && (
              <Typography
                variant="body1"
                sx={{
                  marginTop: '10px',
                }}
              >
                _
              </Typography>
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
export default SalaryRange;
