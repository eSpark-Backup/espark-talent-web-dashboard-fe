import React from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { LEAVE_TYPE, REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveType = () => {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          background: '#F6F6F6',
          display: 'flex',
          justifyContent: 'space-between',
                  alignItems: 'center',
          p:1
        }}
      >
        <Typography>{REQUESTVIEW_DATA.leaveType}</Typography>
        <Select
          value={'Sick Leave'}
          required={true}
          sx={{
            height: '50px',
            width: { xs: '100%', md: '600px' },
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
        >
          {LEAVE_TYPE?.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
export default LeaveType;
