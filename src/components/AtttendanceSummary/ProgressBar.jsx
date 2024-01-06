import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  width: '100%',
  transform: 'rotate(180deg)',
  '& > .MuiLinearProgress-bar': {
    transform: 'rotate(180deg)',
  },
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E6F4F4',
    // theme.palette.grey[theme.palette.mode === 'light' ? '#E6F4F4' : 40],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#068987' : '#308fe8',
  },
}));

export default function ProgressBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: 'auto',
      }}
    >
      <BorderLinearProgress variant="determinate" value={50} />
    </Box>
  );
}
