import * as React from 'react';

import Box from '@mui/material/Box';
import Image from 'next/image';
import { Button, TextField, Typography } from '@mui/material';

export default function ProfileSection({ Profile_Edit_Section, User_Detail }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">{Profile_Edit_Section?.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Image
            src={Profile_Edit_Section?.profileAvatar}
            width={50}
            height={50}
            alt={Profile_Edit_Section?.alt}
          />
          <Button
            sx={{ width: '160px', height: '40px' }}
            variant="contained"
            startIcon={
              <Image
                src={Profile_Edit_Section?.buttonIcon}
                width={24}
                height={24}
                alt={'upload'}
              />
            }
          >
            {Profile_Edit_Section?.buttonText}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, my: 3 }}>
        <Typography variant="h6">{User_Detail?.title}</Typography>
        {User_Detail?.Fields?.map((item, index) => (
          <Box component={'div'} key={index}>
            <Typography sx={{ mb: 1 }}>{item?.label}</Typography>
            <TextField
              placeholder={item?.place}
              type={item?.type}
              variant="outlined"
              sx={{
                width: '300px',
                height: 'auto',
                '@media (max-width: 380px)': {
                  width: '100%',
                },
              }}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          sx={{
            width: '120px',
            height: '40px',
            '@media (max-width: 380px)': {
              width: '100%',
            },
          }}
        >
          {User_Detail?.buttonText}
        </Button>
      </Box>
    </Box>
  );
}
