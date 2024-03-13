'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import { POLICIES_DATA } from '@/src/constants/policies';
import PoliciesCard from '@/src/components/policies/policiesCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_POLICY } from '@/src/services/apiService/apiEndPoints';
import {
  fetchClientPoliciesRequestFailed,
  fetchClientPoliciesRequestSuccess,
} from '@/src/redux/slices/clientSlices/policiesSlice';
import { useDispatch } from 'react-redux';

const Policies = () => {
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['policiesQuery'],
    queryFn: async () => {
      // dispatch(fetchClientPoliciesRequest());
      return api
        .getData(`${CLIENT_POLICY}`)
        .then(({ data }) => {
          dispatch(fetchClientPoliciesRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(fetchClientPoliciesRequestFailed());
          console.log({ err });
        });
    },
  });
  return (
    <>
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
            title={POLICIES_DATA?.title}
            description={POLICIES_DATA?.description}
            containerStyles={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          />
          {isLoading ? (
            'Loading...'
          ) : (
            <PoliciesCard data={POLICIES_DATA?.items} />
          )}
        </Box>
      </Grid>
    </>
  );
};
export default Policies;
