'use client';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../dashboard/input';
import Image from 'next/image';
import ClientView from './ClientView';

const AllClients = () => {
  const router = useRouter();
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    console.log({ event });
    setValue(newValue);
  };

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (name === '' && id === '') {
      setSearch(false);
    }
  }, [name, id]);

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
          sx={{ color: '#171717', fontSize: '30px', fontWeight: '600' }}
        >
          Clients
        </Typography>
        <Button
          sx={{
            backgroundColor: '#029894',
            width: '160px',
            color: '#FFF',
            textTransform: 'math-auto',
            '&:hover': {
              backgroundColor: '#029894',
              color: '#FFF',
            },
            marginTop: { xs: '25px', md: '0px' },
          }}
          onClick={() => router.push('/hr/dashboard/clients/add-client')}
        >
          Add client
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            variant="scrollable"
          >
            <Tab value="one" label="All" wrapped disableRipple={true} />
            <Tab value="two" label="Active clients" disableRipple={true} />
            <Tab value="three" label="Inactive clients" disableRipple={true} />
          </Tabs>
        </Box>
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
          <Grid item xs={12} md={6} lg={1}>
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
        {value === 'one' ? (
          <ClientView search={search} id={id} name={name} status={'All'} />
        ) : value === 'two' ? (
          <ClientView status={'Active'} id={id} name={name} search={search} />
        ) : (
          <ClientView id={id} name={name} status={'Inactive'} search={search} />
        )}
      </Box>
    </>
  );
};

export default AllClients;
