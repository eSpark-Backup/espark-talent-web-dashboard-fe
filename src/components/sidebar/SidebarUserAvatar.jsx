import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#e6f5f4',
      color: '#029E9C',
      fontSize: '12px',
      fontWeight: 400,
      width: '30px',
      height: '30px',
      ml: '-9px',
      mt: '6px',
      border: '1px solid #029E9C',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function SidebarUserAvatar({ userName }) {
  return (
    <Stack direction="row">
      <Avatar {...stringAvatar(userName)} />
    </Stack>
  );
}
