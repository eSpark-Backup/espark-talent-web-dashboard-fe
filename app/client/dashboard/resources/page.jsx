'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import ResourceCard from '@/src/components/resources/ResourceCard';
import { RESOURCE_DATA } from '@/src/constants/resources';
import Heading from '@/src/components/global/Heading';

const Resource = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '100px',
              width: '100%',
            }}
          >
            <Heading
              title={RESOURCE_DATA?.title}
              description={RESOURCE_DATA?.description}
              containerStyles={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
              isLoading={isLoading}
            />
            <ResourceCard data={RESOURCE_DATA?.items} isLoading={isLoading} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Resource;
