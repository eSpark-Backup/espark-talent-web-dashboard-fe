'use client';
import { Button, Grid, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../dashboard/input';
import Image from 'next/image';
import ClientView from './ClientView';
import { EMPLOYEE_DATA } from '@/src/constants/AllEmployee';
import { HR_GET_CLIENTS } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useQuery } from '@tanstack/react-query';

const AllClients = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    if (name === '' && id === '') {
      setSearch(false);
    }
  }, [name, id]);
  const { data, isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['clientsQuery'],
    queryFn: () => {
      return api
        .getData(HR_GET_CLIENTS)
        .then(({ data }) => {
          console.log({ data });
          // console.log('API Success');
          // dispatch(getEmpDataSuccess(data));
          // console.log('API Success1');
          return data || [];
        })
        .catch((error) => {
          // console.log('API Failed');
          // dispatch(getEmpDataFailed());
          console.log({ error });
        });
    },
  });
  console.log({ data, isLoading });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '30px',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{
            color: '#171717',
            fontSize: '30px',
            fontWeight: '600',
            mr: '12px',
          }}
        >
          Clients
        </Typography>
        <Button
          sx={{
            backgroundColor: '#029894',
            width: '160px',
            color: '#FFF',
            textTransform: 'math-auto',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#029894',
              color: '#FFF',
            },
            marginTop: { xs: '25px', md: '0px' },
          }}
          onClick={() => router.push('/hr/dashboard/clients/add-client')}
        >
          {EMPLOYEE_DATA?.addClient}
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          sx={{
            marginTop: '20px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '60px',
            },
          }}
          spacing={3}
        >
          <Grid item xs={12} md={6} lg={2.5}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Client ID'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Client name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'name'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={0.5}>
            <Button
              onClick={() => setSearch(true)}
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
        <ClientView
          search={search}
          id={id}
          name={name}
          status={'All'}
          data={data}
          isLoading={isLoading}
        />
        {/* {value === 'one' ? (
          <ClientView search={search} id={id} name={name} status={'All'} />
        ) : value === 'two' ? (
          <ClientView status={'Active'} id={id} name={name} search={search} />
        ) : (
          <ClientView id={id} name={name} status={'Inactive'} search={search} />
        )} */}
      </Box>
    </>
  );
};

export default AllClients;
