import React, { useState } from 'react';
import {
  Grid,
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
    <Grid
      container
      sx={{
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
      }}
      gap={'10px'}
    >
      <Grid item xs={12} lg={6}>
        <Typography sx={{ marginLeft: '4px', mb: '10px' }}>
          {HIRING_FORM_DATA?.country}
        </Typography>

        <Select
          sx={{
            '&:focus': {
              borderColor: 'teal',
            },
            width: '100%',
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
      </Grid>
      <SalaryRange />
    </Grid>
  );
};
export default CountryDropdown;
