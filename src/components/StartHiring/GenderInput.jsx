import React from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { GENDER_OPTION, HIRING_FORM_DATA } from '@/src/constants/Hiring';

import EmployementTerm from './EmployementTerm';

const GenderInput = ({ open, SelectOpen, SelectClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        paddingTop: '25px',
        '@media (min-width: 900px) and (max-width: 1400px)': {
          flexDirection: 'column',
          gap: '10px',
        },
        gap: { xs: '9px', md: '0px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Typography>{HIRING_FORM_DATA.gender}</Typography>

        <FormControl>
          <InputLabel sx={{ color: '#888888' }}>
            {HIRING_FORM_DATA.selectGender}
          </InputLabel>
          <Select
            label={HIRING_FORM_DATA.selectGender}
            required={true}
            sx={{
              height: '50px',
              width: { xs: '100%', md: '300px' },
              '@media (min-width: 900px) and (max-width: 1400px)': {
                width: '100%',
              },
            }}
            IconComponent={() => (
              <InputAdornment
                sx={{
                  marginRight: '10px',
                }}
              >
                {open ? (
                  <img src="/images/hiring/icon-down.svg" alt="ArrowDown" />
                ) : (
                  <img src="/images/hiring/rightarrow.png" alt="ArrowRight" />
                )}
              </InputAdornment>
            )}
            onOpen={SelectOpen}
            onClose={SelectClose}
          >
            {GENDER_OPTION.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <EmployementTerm
        open={open}
        SelectOpen={SelectOpen}
        SelectClose={SelectClose}
      />
    </Box>
  );
};
export default GenderInput;
