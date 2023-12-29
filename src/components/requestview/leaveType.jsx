import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { LEAVE_TYPE, REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveType = ({ view }) => {
  const selectedValue = 'Sick Leave';

  const defaultOption = LEAVE_TYPE.find(
    (option) => option.value === selectedValue
  );
  return (
    <Box sx={{}}>
      <Box
        sx={{
          background: '#F6F6F6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
        }}
      >
        <Typography>
          {view ? (
            REQUESTVIEW_DATA?.leaveType
          ) : (
            <>
              {REQUESTVIEW_DATA?.leaveType}
              <span
                style={{
                  color: 'red',
                  fontSize: '25px',
                  marginLeft: '73px',
                    marginTop: '-25px',
                    display: "flex",
                    justifyContent: "flex-end",
                }}
              >
                *
              </span>
            </>
          )}
        </Typography>

        <Select
          value={view ? selectedValue : 'Select'} // Conditionally set the value
          required={true}
          disabled={view}
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
