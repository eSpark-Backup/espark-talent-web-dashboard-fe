'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import { POLICIES_DATA } from '@/src/constants/policies';
import PoliciesCard from '@/src/components/policies/policiesCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { EMP_POLICIES } from '@/src/services/apiService/apiEndPoints';
import { useDispatch } from 'react-redux';
import {
  fetchEmpPoliciesDataRequest,
  fetchEmpPoliciesDataRequestFailed,
  fetchEmpPoliciesDataRequestSuccess,
} from '@/src/redux/slices/employeeSlices/empPoliciesSlice';

const Policies = () => {
  const dispatch = useDispatch();
  const filteredItems = POLICIES_DATA?.items.filter(
    (item) => item.id !== 4 && item.id !== 5
  );

  const clientPoliciesQuery = useQuery({
    staleTime: 10000,
    queryKey: ['policiesQuery'],
    queryFn: async () => {
      dispatch(fetchEmpPoliciesDataRequest());
      return api
        .getData(`${EMP_POLICIES}`)
        .then(({ data }) => {
          dispatch(fetchEmpPoliciesDataRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(fetchEmpPoliciesDataRequestFailed());
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
          <PoliciesCard data={filteredItems} />
          {/* <PoliciesCard data={POLICIES_DATA?.items} /> */}
        </Box>
      </Grid>
    </>
  );
};
export default Policies;
