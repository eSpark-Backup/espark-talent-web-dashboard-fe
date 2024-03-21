'use client';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Input from '../dashboard/input';
import Image from 'next/image';
import EmployeeView from './EmployeeView';
import { useRouter } from 'next/navigation';
import EmployeeStatus from './ActiveEmployee';
import { employeeProfileData } from '@/src/constants/employeeProfile';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { useDispatch } from 'react-redux';
import {
  getEmpData,
  getEmpDataFailed,
  getEmpDataSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';

const AllEmployee = ({ fromClient, openModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [search, setSearch] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (name === '' && id === '' && designation === '') {
      setSearch(false);
    }
  }, [name, id, designation]);
  const { data, isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['employeeQuery'],
    queryFn: () => {
      dispatch(getEmpData());
      // console.log('Calling api');
      return api
        .getData(HR_EMPLOYEES)
        .then(({ data }) => {
          // console.log({ data });
          // console.log('API Success');
          dispatch(getEmpDataSuccess(data));
          // console.log('API Success1');
          return data;
        })
        .catch((error) => {
          // console.log('API Failed');
          dispatch(getEmpDataFailed());
          console.log({ error });
        });
    },
  });
  console.log({ data, isLoading });

  if (fromClient)
    return (
      <>
        <Box
          sx={{
            width: '100%',
            marginTop: '10px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            borderBottom: 'solid 1px #ccc',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            variant="scrollable"
          >
            <Tab value="one" label="All" wrapped />
            <Tab value="two" label="Active employees" />
            <Tab value="three" label="Terminated employees" />
          </Tabs>
          <Button
            onClick={openModal}
            variant="contained"
            sx={{
              my: {
                xs: '20px',
                md: 0,
                color: '#fff',
                background: '#029894',
                '&:hover': {
                  color: '#fff',
                  background: '#029894',
                },
              },
            }}
          >
            {employeeProfileData?.addEmployee}
          </Button>
        </Box>
        {value === 'one' ? (
          <EmployeeStatus
            search={search}
            id={id}
            name={name}
            designation={designation}
            status={'All'}
          />
        ) : value === 'two' ? (
          <EmployeeStatus
            status={'Active'}
            id={id}
            name={name}
            designation={designation}
            search={search}
          />
        ) : (
          <EmployeeStatus
            id={id}
            name={name}
            designation={designation}
            status={'Inactive'}
            search={search}
          />
        )}
      </>
    );
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
          {employeeProfileData?.employees}
        </Typography>
        {value === 'one' && (
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
            onClick={() => router.push('/hr/dashboard/employees/add-employee')}
          >
            {employeeProfileData?.addEmployee}
          </Button>
        )}
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
            <Tab value="two" label="Active employees" disableRipple={true} />
            <Tab
              value="three"
              label="Inactive employees"
              disableRipple={true}
            />
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
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Employee ID'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Employee name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'name'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={designation}
              width={'100%'}
              handleChange={(e) => setDesignation(e)}
              placeHolder={'Search designation'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'designation'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={company}
              width={'100%'}
              handleChange={(e) => setCompany(e)}
              placeHolder={'Search company'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'designation'}
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
          <EmployeeView
            search={search}
            id={id}
            name={name}
            designation={designation}
            status={'All'}
          />
        ) : value === 'two' ? (
          <EmployeeView
            status={'Active'}
            id={id}
            name={name}
            designation={designation}
            search={search}
          />
        ) : (
          <EmployeeView
            id={id}
            name={name}
            designation={designation}
            status={'Inactive'}
            search={search}
          />
        )}
      </Box>
    </>
  );
};

export default AllEmployee;
