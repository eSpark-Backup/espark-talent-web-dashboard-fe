import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const ResourceCard = ({ data }) => {
  return (
    <Grid container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: '12px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {data?.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Link href="/">
              <Box
                sx={{
                  height: { xs: '350px', md: '300px' },
                  borderRadius: '10px',
                  background: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '18px',
                  border: '1px solid #E4E4E4',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '440px',
                    gap: '30px',
                    paddingTop: '30px',
                  }}
                >
                  <Box>
                    <Image
                      src={item?.image}
                      width={70}
                      height={70}
                      alt="search"
                    />
                  </Box>
                  <Typography variant="h3">{item?.title}</Typography>
                  <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {item?.description}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
};
export default ResourceCard;
