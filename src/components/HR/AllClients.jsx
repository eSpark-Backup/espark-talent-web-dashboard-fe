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
import { useSelector } from 'react-redux';
import { Toast } from '../Toast/Toast';

const AllClients = () => {
  const router = useRouter();
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
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
          return data || [];
        })
        .catch((error) => {
          Toast('error', error.message || 'Failed to get data');
          console.log({ error });
        });
    },
  });

  const handleSearch = () => {
    const filteredData = data?.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
    console.log('Search results:', filteredData);
    return filteredData;
  };
  const filteredData = handleSearch();
  console.log('test', data);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '30px',
          flexWrap: 'wrap',
          marginTop: '20px',
        }}
      >
        <Typography
          sx={{
            color: '#171717',
            fontSize: '30px',
            fontWeight: '600',
            mr: '12px',
            // mt: '20px',
          }}
        >
          Clients
        </Typography>
        {(role === 'super admin' ||
          (role !== 'super admin' && client_perms?.[0]?.write)) && (
          <Button
            sx={{
              backgroundColor: '#029894',
              width: '160px',
              color: '#FFF',
              textTransform: 'math-auto',
              fontSize: '16px',
              height: '40px',
              '&:hover': {
                backgroundColor: '#029894',
                color: '#FFF',
              },
              '@media (min-width: 200px) and (max-width: 600px)': {
                marginTop: '8px',
              },
              marginTop: { xs: '25px', sm: '5px', md: '0px' },
            }}
            onClick={() => router.push('/hr/dashboard/clients/add-client')}
          >
            {EMPLOYEE_DATA?.addClient}
          </Button>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          sx={{
            marginTop: '-5px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '60px',
            },
          }}
          spacing={3}
        >
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Client ID'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Client name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'name'}
            />
          </Grid>
          <Grid item xs={12} md={1} lg={0.5}>
            <Button
              onClick={handleSearch}
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
        {filteredData && filteredData.length > 0 && (
          <ClientView
            search={search}
            id={id}
            name={name}
            status={'All'}
            data={filteredData}
            isLoading={isLoading}
          />
        )}
      </Box>
    </>
  );
};

export default AllClients;
