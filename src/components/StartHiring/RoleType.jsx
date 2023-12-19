import React, { useState } from 'react';
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
import { HIRING_FORM_DATA, ROLE_TYPE } from '@/src/constants/Hiring';

const RoleType = ({ open, SelectOpen, SelectClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
          gap:"12px"
      }}
    >
      <Typography>{HIRING_FORM_DATA.roleTitle}</Typography>
      {/* <Autocomplete
        options={ROLE_TYPE}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
                {...params}
            placeholder={HIRING_FORM_DATA.selectRole}
            variant="outlined"
            fullWidth
            sx={{
              width: { xs: '100%', md: '300px' },
              '@media (min-width: 960px) and (max-width: 1200px)': {
                width: '100%',
              },
            }}
                InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{
                      marginRight: '10px',
                    }}
                  >
                    {open ? (
                      <img src="/images/hiring/icon-down.svg" alt="ArrowDown" />
                    ) : (
                      <img
                        src="/images/hiring/rightarrow.png"
                        alt="ArrowRight"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              onFocus={SelectOpen}
              onBlur={SelectClose}
        
          />
        )}
      /> */}
        <FormControl>
      <InputLabel  sx={{ color: '#888888' }}>{HIRING_FORM_DATA.selectRole}</InputLabel>
        <Select
          label={HIRING_FORM_DATA.selectRole}
           required={true}
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
          
        {ROLE_TYPE.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </Select>
      
        </FormControl>
    </Box>
  );
};
export default RoleType;
