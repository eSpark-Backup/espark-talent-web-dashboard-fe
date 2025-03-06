'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

// import { GUIDE_DATA } from '@/src/constants/guide';
// import { useQuery } from '@tanstack/react-query';
// import { api } from '@/src/services/apiService';

// import { useDispatch } from 'react-redux';
// import { Toast } from '@/src/components/Toast/Toast';
// import {
//     fetchClientGuidesRequestFailed,
//     fetchClientGuidesRequestSuccess,
// } from '@/src/redux/slices/clientSlices/guidesSlice';
// import { CLIENT_GUIDE } from '@/src/services/apiService/apiEndPoints';
// import GuideCard from '@/src/components/guides/GuideCard';
import Heading from '@/src/components/global/Heading';
import GuideCard from '@/src/components/guides/GuideCard';

const Guide = () => {
  const dummy_data = [
    {
      id: 1,
      guide_name: 'Dashboard Guide',
      description: 'Description added by HR will be reflected here.',
      language: 'English',
    },
    {
      id: 2,
      guide_name: 'Dashboard Guide',
      description: 'Description added by HR will be reflected here.',
      language: 'Arabic',
    },
    {
      id: 3,
      guide_name: 'Dashboard Guide',
      description: 'Description added by HR will be reflected here.',
      language: 'English',
    },
    {
      id: 4,
      guide_name: 'Dashboard Guide',
      description: 'Description added by HR will be reflected here.',
      language: 'Arabic',
    },
    {
      id: 5,
      guide_name: 'Dashboard Guide',
      description: 'Description added by HR will be reflected here.',
      language: 'Arabic',
    },
    {
      id: 6,
      guide_name: 'Dashboard Guide',
      description: 'Description added by HR will be reflected here.',
      language: 'English',
    },
  ];

  // const dispatch = useDispatch();
  // const { isLoading, data } = useQuery({
  //   staleTime: 10000,
  //   refetchOnWindowFocus: false,
  //   queryKey: ['guideQuery'],
  //   queryFn: async () => {
  //     return api
  //       .getData(`${CLIENT_GUIDE}`)
  //       .then(({ data }) => {
  //         // dispatch(fetchClientGuidesRequestSuccess(data || []));
  //         return data;
  //       })
  //       .catch((err) => {
  //         // dispatch(fetchClientGuidesRequestFailed());
  //         Toast('error', err.message || 'Failed to get data');
  //       });
  //   },
  // });

  // if (!data && !isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  //       <Typography
  //         sx={{
  //           fontSize: '30px',
  //           fontFamily: 'sans-serif',
  //         }}
  //       >
  //         Guide data is not available
  //       </Typography>
  //     </Box>
  //   );
  // }

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
          title={'Guides'}
          description={
            'You will find all the guide related to your company below.'
          }
          // isLoading={isLoading}
          containerStyles={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'center' },
          }}
        />
        <GuideCard
          guideData={dummy_data || []}
          // isLoading={isLoading}
        />
      </Box>
    </Grid>
  );
};
export default Guide;
