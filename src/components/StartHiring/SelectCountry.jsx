import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import { COUNTRY_OPTIONS } from '@/src/constants/countryCode';
import SalaryRange from './SalaryRangle';

const CountryDropdown = ({open,SelectOpen,SelectClose}) => {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          paddingTop:"25px",
          '@media (min-width: 960px) and (max-width: 1200px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
              gap:"12px",
            width: { xs: '100%', md: '300px' },
            '@media (min-width: 960px) and (max-width: 1200px)': {
              width: '100%',
            },
          }}
        >
          <Typography>{HIRING_FORM_DATA.country}</Typography>
           
          <Select
            sx={{ height: '50px' }}
            IconComponent={() => (
                <InputAdornment sx={{
                  marginRight:"10px"
                }}>
                  {open ?
                    (
                      <img src="/images/hiring/icon-down.svg" alt="ArrowDown" />
                    ) : (
                  
                      <img src="/images/hiring/rightarrow.png" alt="ArrowRight" />
                    )}
                </InputAdornment>
            )}
            onOpen={SelectOpen}
            onClose={SelectClose}
          >
            {COUNTRY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </Select>
          
        </Box>
        <SalaryRange />
      </Box>
    </>
  );
};
export default CountryDropdown;
