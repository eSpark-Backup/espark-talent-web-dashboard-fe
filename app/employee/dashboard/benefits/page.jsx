'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';
import AppTable from '@/src/components/appTableNew/AppTable';
import { useQuery } from '@tanstack/react-query';
import { EMP_BENEFITS } from '@/src/services/apiService/apiEndPoints';
import {
  fetchEmpBenefits,
  fetchEmpBenefitsFailed,
  fetchEmpBenefitsSuccess,
} from '@/src/redux/slices/employeeSlices/benefitsSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/components/Toast/Toast';

import { useDispatch } from 'react-redux';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { BenefitsColumn } from '@/src/data/tables/benefits';
import dayjs from 'dayjs';

const Benefits = () => {
  const dispatch = useDispatch();
  const { data: benefits, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['fetch-emp-benefits'],
    queryFn: () => {
      dispatch(fetchEmpBenefits());
      return api
        .getData(EMP_BENEFITS)
        .then(({ data }) => {
          const newData =
            data === '' || !data.length
              ? []
              : data?.map((item) => ({
                  ...item,
                  issue_date: dayjs(item?.issue_date)?.format('D-MMMM-YYYY'),
                }));
          dispatch(fetchEmpBenefitsSuccess(newData));
          return newData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchEmpBenefitsFailed());
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
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading
              title={'Benefits'}
              dashboardDescription={' Visualise team details & manage members.'}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box my={4}>
              <Box
                sx={{
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <AppTable
                  isLoading={isLoading}
                  column={BenefitsColumn}
                  data={benefits}
                  tableRowClass="app-table-row-benefit"
                  minWidth={'700px'}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Benefits;
