'use client';

import { Grid, Box, Typography } from '@mui/material';

import { GUIDE_DATA } from '@/src/constants/guide';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';

import { useDispatch } from 'react-redux';
import { Toast } from '@/src/utils/toast';
import {
  fetchClientGuidesRequestFailed,
  fetchClientGuidesRequestSuccess,
} from '@/src/redux/slices/clientSlices/guidesSlice';
import { CLIENT_GUIDE } from '@/src/services/apiService/apiEndPoints';
import Heading from '@/src/components/global/Heading';
import GuideCard from '@/src/components/guides/GuideCard';

const Page = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['guideQuery'],
    queryFn: async () => {
      return api
        .getData(`${CLIENT_GUIDE}`)
        .then(({ data }) => {
          dispatch(fetchClientGuidesRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(fetchClientGuidesRequestFailed());
          Toast('error', err?.message || 'Failed to get data');
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
          title={GUIDE_DATA?.guide}
          description={GUIDE_DATA?.companyGuide}
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
export default Page;
