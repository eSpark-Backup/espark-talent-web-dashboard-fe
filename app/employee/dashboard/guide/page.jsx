'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import { GUIDE_DATA } from '@/src/constants/guide';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';

import { useDispatch } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';
import { EMP_GUIDE } from '@/src/services/apiService/apiEndPoints';
import {
  fetchEmpGuidesDataRequestFailed,
  fetchEmpGuidesDataRequestSuccess,
} from '@/src/redux/slices/employeeSlices/empGuidesSlice';
import Heading from '@/src/components/global/Heading';
import GuideCard from '@/src/components/guides/GuideCard';

const Guide = () => {
  const { guide, description } = GUIDE_DATA;
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['guideQuery'],
    queryFn: async () => {
      return api
        .getData(`${EMP_GUIDE}`)
        .then(({ data }) => {
          dispatch(fetchEmpGuidesDataRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(fetchEmpGuidesDataRequestFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  if (!data && !isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          sx={{
            fontSize: '30px',
            fontFamily: 'sans-serif',
          }}
        >
          Guide data is not available
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '10px',
          gap: '80px',
          width: '100%',
        }}
      >
        <Heading
          title={guide}
          description={description}
          isLoading={isLoading}
          containerStyles={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'center' },
          }}
        />
        <GuideCard guideData={data || []} isLoading={isLoading} />
      </Box>
    </Grid>
  );
};
export default Guide;
