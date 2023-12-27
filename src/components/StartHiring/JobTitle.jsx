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

import { HIRING_FORM_DATA, JOBTITLE } from '@/src/constants/Hiring';
import RoleType from './RoleType';
import Image from 'next/image';

const JobTitle = ({ open, SelectOpen, SelectClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        paddingTop: '15px',
        '@media (min-width: 900px) and (max-width: 1400px)': {
          flexDirection: 'column',
          gap: '10px',
        },
        gap: { xs: '7px', sm: '7px', md: '0px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Typography>{HIRING_FORM_DATA?.jobTitle}</Typography>

        <FormControl>
          <InputLabel sx={{ color: '#888888' }}>
            {HIRING_FORM_DATA?.selectRole}
          </InputLabel>
          <Select
            label={HIRING_FORM_DATA?.selectJob}
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
            {JOBTITLE?.map((option) => (
              <MenuItem key={option?.value} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <RoleType open={open} SelectOpen={SelectOpen} SelectClose={SelectClose} />
    </Box>
  );
};

export default JobTitle;
