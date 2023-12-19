import React from 'react';
import {
  Autocomplete,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { HIRING_FORM_DATA, SALARY_TYPE } from '@/src/constants/Hiring';
const EmployementTerm = ({ open, SelectOpen, SelectClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Typography>{HIRING_FORM_DATA.employementTerm}</Typography>
      {/* <Autocomplete
        options={SALARY_TYPE}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={HIRING_FORM_DATA.selectterms}
            variant="outlined"
            fullWidth
            sx={{
              width: { xs: '100%', md: '300px' },
              '@media (min-width: 960px) and (max-width: 1200px)': {
                width: '100%',
              },
            }}
          />
        )}
      /> */}
      <FormControl>
        <InputLabel  sx={{ color: '#888888' }}>{HIRING_FORM_DATA.selectterms}</InputLabel>
        <Select
          required={true}
          label={HIRING_FORM_DATA.selectterms}
          sx={{
            height: '50px',
            width: { xs: '100%', md: '300px' },
            '@media (min-width: 960px) and (max-width: 1200px)': {
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
          {SALARY_TYPE.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default EmployementTerm;
