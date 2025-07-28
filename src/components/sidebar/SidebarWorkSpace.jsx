import { Box, Typography } from '@mui/material';

import SidebarProfileMenu from '@/src/components/sidebar/SidebarProfileMenu';
import WorkSpaceIcon from '@/src/components/sidebar/WorkSpaceIcon';

const SidebarWorkSpace = ({ title, image }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 1.9,
          pr: 2.1,
        }}
      >
        <Box
          sx={{
            width: '50px',
            height: 'auto',
            display: 'inline-flex',
            justifyContent: 'center',
          }}
        >
          <WorkSpaceIcon image={image} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '54%',
          }}
        >
          <Typography variant="body1" sx={{ color: '#595959' }}>
            {title}
          </Typography>
        </Box>
        <SidebarProfileMenu />
      </Box>
    </>
  );
};

export default SidebarWorkSpace;
