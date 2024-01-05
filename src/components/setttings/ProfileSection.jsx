import * as React from 'react';

import Box from '@mui/material/Box';
import Image from 'next/image';
import { Button, TextField, Typography } from '@mui/material';

export default function ProfileSection({ Profile_Edit_Section, User_Detail }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: '#171717', fontWeight: '400' }}
        >
          {Profile_Edit_Section?.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Image
            src={Profile_Edit_Section?.profileAvatar}
            width={50}
            height={50}
            alt={Profile_Edit_Section?.alt}
          />
          <Button
            sx={{
              width: '165px',
              height: '40px',
              fontSize: '16px',
              fontWeight: 500,
            }}
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
        <Typography
          variant="body2"
          sx={{ color: '#171717', fontWeight: '400' }}
        >
          {User_Detail?.title}
        </Typography>
        {User_Detail?.Fields?.map((item, index) => (
          <Box component={'div'} key={index}>
            <Typography
              variant="body1"
              sx={{ mb: 1, color: '#595959', fontWeight: '600' }}
            >
              {item?.label}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2.5,
                alignItems: 'center',
                width: '100%',
                '@media (max-width: 562px)': {
                  flexDirection: 'column',
                  alignItems: 'start',
                },
              }}
            >
              <Box
                sx={{
                  width: 'auto',
                  height: '40px',
                  '@media (max-width: 562px)': {
                    width: '100%',
                  },
                }}
              >
                <TextField
                  placeholder={item?.place}
                  type={item?.type}
                  variant="outlined"
                  sx={{
                    width: '300px',
                    height: 'auto',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#666',
                    '@media (max-width: 562px)': {
                      width: '100%',
                    },
                  }}
                />
              </Box>
              {item?.label !== 'Email' ? (
                <Box
                  sx={{
                    width: 'auto',
                    '@media (max-width: 562px)': {
                      width: '100%',
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: '16px',
                      fontWeight: 500,
                      backgroundColor: '#888',
                      width: '120px',
                      height: '40px',
                      '@media (max-width: 380px)': {
                        width: '100%',
                      },
                      '&:hover': {
                        backgroundColor: '#888',
                      },
                    }}
                  >
                    {User_Detail?.buttonText}
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
