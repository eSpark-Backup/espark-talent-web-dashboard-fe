'use client';
import { Button, Grid, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useState } from 'react';
import Image from 'next/image';

import AppTable from '@/src/components/appTableNew/AppTable';
import { invoicePageColumn } from '@/src/constants/data/tables/hr/invoicesPageData';
import Input from '@/src/components/dashboard/input';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  HR_GET_CLIENT_PROFILE,
  HR_INVOICES,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { getInvoicesData } from '@/src/redux/slices/hrSlices/invoices';
import {
  getCurrentClientData,
  getCurrentClientDataFailed,
  getCurrentClientDataSuccess,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { useRouter } from 'next/navigation';
import { Toast } from '@/src/components/Toast/Toast';

const Page = () => {
  const router = useRouter();
  const { data } = useSelector((state) => state.hr.invoices);
  const [id, setId] = useState('');
  const [designation, setDesignation] = useState();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['hr-invoices-query'],
    queryFn: async () => {
      // dispatch(fetchClientPoliciesRequest());
      return api
        .getData(`${HR_INVOICES}`)
        .then(({ data }) => {
          // console.log({ data });
          const tempData =
            data?.map((item) => ({
              ...item,
              emp_inv_link: 'Link',
              oth_inv_link: 'Link',
            })) || [];
          dispatch(getInvoicesData(tempData));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          // dispatch(fetchClientPoliciesRequestFailed());
          console.log({ err });
        });
    },
  });
  const clientInfoMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(getCurrentClientData());
      console.log({ mutationID: id });
      return api.getData(`${HR_GET_CLIENT_PROFILE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      console.log({ selectedClient, data });
      dispatch(getCurrentClientDataSuccess(data));
      router.push(`/hr/dashboard/clients/${selectedClient}`);
      return data;
    },
    onError: (err) => {
      dispatch(getCurrentClientDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleClickLink = (row) => {
    setSelectedClient(row?.id);
    clientInfoMutation.mutate(row?.id);
  };

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3">Invoices</Typography>
          <Grid
            container
            sx={{
              marginTop: '20px',
              [theme.breakpoints.down('md')]: {
                paddingLeft: '0px',
              },
              [theme.breakpoints.up('md')]: {
                paddingLeft: '20px',
              },
            }}
            spacing={3}
          >
            <Grid item xs={12} md={6} lg={3}>
              <Input
                value={id}
                width={'100%'}
                handleChange={(e) => setId(e)}
                placeHolder={'Client name'}
                prefixIcon={'/icons/searchIconWhite.svg'}
                name={'id'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppDropdown
                selectedItem={designation}
                setSelectedItem={setDesignation}
                lg={12}
                type="select"
                placeHolder={'Select status'}
                data={[
                  {
                    label: 'Active',
                  },
                  {
                    label: 'Inactive',
                  },
                ]}
                isLoadingList={isLoadingList}
                setIsLoadingList={setIsLoadingList}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={1}>
              <Button
                style={{
                  backgroundColor: '#029894',
                  color: '#FFF',
                  height: '40px',
                  width: '100%',
                }}
              >
                <Image
                  width={24}
                  height={24}
                  alt="Refresh"
                  src={`/icons/searchIconWhite.svg`}
                />
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
              my: '20px',
            }}
          >
            <AppTable
              hanldeInvLinkClick={handleClickLink}
              column={invoicePageColumn}
              data={data}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Page;
