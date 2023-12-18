import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ image, text, link }) => {
  const pathname = usePathname();
  return (
    <>
      <Box
        sx={{
          mx: 'auto',
          p: 1.4,
          mb: 3,
          gap: 2,
          width: '95%',
          display: 'flex',
          borderRight: `${link == pathname ? '2px solid #068987' : null}`,
          borderRadius: '2px',
          backgroundColor: `${link == pathname ? '#E6F5F4' : null}`,
          '&:active': {
            // backgroundColor: 'red',
            // borderRight: '2px solid #E6F5F4',
          },
        }}
      >
        <Image src={image} alt="icon" width={20} height={20} />
        <Typography sx={{ width: '100%', height: '100%' }}>
          <Link style={{ width: '100%' }} href={link}>
            {text}
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default SidebarLink;
