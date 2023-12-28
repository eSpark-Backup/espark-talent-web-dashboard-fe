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
import Image from 'next/image';
import FlagIcon from '@/src/constants/Flag';

const CountryDropdown = ({ SelectOpen, SelectClose }) => {
  const [selectedValue, setSelectedValue] = useState(COUNTRY_OPTIONS[2].label);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          marginTop: '10px',
          gap: { xs: '9px', md: '0px' },
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
          <Typography sx={{ marginLeft: '4px' }}>
            {HIRING_FORM_DATA?.country}
          </Typography>

          <Select
            sx={{
              height: '45px',
              border: 'solid 1px #ccc',
              '&:focus': {
                borderColor: 'teal',
              },
            }}
            value={selectedValue}
            onChange={(event) => setSelectedValue(event.target.value)}
            IconComponent={() => (
              <InputAdornment
                sx={{
                  marginRight: '10px',
                }}
              >
                <Image
                  src={'/icons/Dropdown.svg'}
                  width={18}
                  height={18}
                  alt="Dropdown"
                />
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
