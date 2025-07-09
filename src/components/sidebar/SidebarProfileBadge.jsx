import * as React from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

const DotBadge = ({ icon, color }) => {
  return (
    <Box sx={{ color: 'action.active' }}>
      <Badge
        sx={{ '& .MuiBadge-badge': { backgroundColor: `${color}` } }}
        variant="dot"
      >
        {icon}
      </Badge>
    </Box>
  );
};

export default DotBadge;
