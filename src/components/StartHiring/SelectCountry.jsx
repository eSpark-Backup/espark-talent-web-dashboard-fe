import React from 'react';
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
import Image from 'next/image';
import FlagIcon from '@/src/constants/Flag';

const CountryDropdown = ({ open, SelectOpen, SelectClose }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          paddingTop: '25px',
          gap: { xs: '9px', md: '20px' },
          '@media (min-width: 960px) and (max-width: 1400px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: { xs: '100%', md: '300px' },
            '@media (min-width: 960px) and (max-width: 1400px)': {
              width: '100%',
            },
          }}
        >
          <Typography>{HIRING_FORM_DATA?.country}</Typography>

          <Select
            sx={{ height: '53px' }}
            IconComponent={() => (
              <InputAdornment
                sx={{
                  marginRight: '10px',
                }}
              >
                {open ? (
                  <Image
                    src="/images/hiring/icon-down.svg"
                    width={20}
                    height={20}
                    alt="ArrowDown"
                  />
                ) : (
                  <Image
                    src="/images/hiring/rightarrow.png"
                    width={20}
                    height={20}
                    alt="ArrowRight"
                  />
                )}
              </InputAdornment>
            )}
            onOpen={SelectOpen}
            onClose={SelectClose}
          >
            {COUNTRY_OPTIONS?.map((option) => (
              <MenuItem key={option?.value} value={option?.label}>
                <FlagIcon countryCode={option?.value} />
                {option?.label}
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
