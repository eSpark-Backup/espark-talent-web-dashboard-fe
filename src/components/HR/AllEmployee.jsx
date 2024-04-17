'use client';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Input from '../dashboard/input';
import Image from 'next/image';
import EmployeeView from './EmployeeView';
import { useRouter } from 'next/navigation';
import { employeeProfileData } from '@/src/constants/employeeProfile';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpData,
  getEmpDataFailed,
  getEmpDataSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '../Toast/Toast';
import EmployeeStatus from './ActiveEmployee';

const AllEmployee = ({ fromClient, openModal }) => {
  const dispatch = useDispatch();
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
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
    if (name === '' && id === '' && designation === '' && company === '') {
      setSearch(false);
    }
  }, [name, id, designation, company]);

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
          return data || [];
        })
        .catch((error) => {
          Toast('error', error.message || 'Failed to get data');
          // console.log('API Failed');
          dispatch(getEmpDataFailed());
          // console.log({ error });
        });
    },
  });
  console.log({ data, isLoading });
  const handleSearch = () => {
    const filteredData = data?.filter((item) => {
      const nameMatch =
        name === '' || item.name.toLowerCase().includes(name.toLowerCase());
      const designationMatch =
        designation === '' ||
        item.designation.toLowerCase().includes(designation.toLowerCase());
      const companyMatch =
        company === '' ||
        item.company.toLowerCase().includes(company.toLowerCase());
      return nameMatch && designationMatch && companyMatch;
    });
    console.log('Search results:', filteredData);
    return filteredData;
  };
  const filteredData = handleSearch();
  console.log('test', data);

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
        {filteredData && filteredData.length > 0 && (
          <>
            {value === 'one' ? (
              <EmployeeStatus
                search={search}
                id={id}
                name={name}
                designation={designation}
                status={'All'}
                isLoading={isLoading}
              />
            ) : value === 'two' ? (
              <EmployeeStatus
                status={'Active'}
                id={id}
                name={name}
                designation={designation}
                search={search}
                isLoading={isLoading}
              />
            ) : (
              <EmployeeStatus
                id={id}
                name={name}
                designation={designation}
                status={'Inactive'}
                search={search}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </>
    );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px',
          flexWrap: 'wrap',
          paddingBottom: '40px',
        }}
      >
        <Typography
          sx={{
            color: '#171717',
            fontSize: '30px',
            fontWeight: '600',
            marginLeft: '-10px',
          }}
        >
          {employeeProfileData?.employees}
        </Typography>
        {value === 'one' && (
          <>
            {(role === 'super_admin' ||
              (role !== 'super_admin' && employee_perms?.[0]?.write)) && (
              <Button
                sx={{
                  backgroundColor: '#029894',
                  width: '160px',
                  color: '#FFF',
                  marginRight: '30px',
                  textTransform: 'math-auto',
                  '&:hover': {
                    backgroundColor: '#029894',
                    color: '#FFF',
                  },
                  marginTop: { xs: '25px', md: '0px' },
                }}
                onClick={() =>
                  router.push('/hr/dashboard/employees/add-employee')
                }
              >
                {employeeProfileData?.addEmployee}
              </Button>
            )}
          </>
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
            <Tab
              value="one"
              label="All"
              wrapped
              disableRipple={true}
              sx={{ mr: '20px', textTransform: 'math-auto' }}
            />
            <Tab
              value="two"
              label="Active employees"
              disableRipple={true}
              sx={{ mr: '20px', textTransform: 'math-auto' }}
            />
            <Tab
              value="three"
              label="Inactive employees"
              disableRipple={true}
              sx={{ mr: '20px', textTransform: 'math-auto' }}
            />
          </Tabs>
        </Box>
        <Grid
          container
          sx={{
            marginBottom: '5px',
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
              // onClick={() => setSearch(true)}
              onClick={handleSearch}
              sx={{
                backgroundColor: '#029894',
                color: '#FFF',
                height: '40px',
                width: { xs: '100%', md: '50%' },
                '&:hover': {
                  backgroundColor: '#029894',
                  color: '#FFF',
                },
              }}
            >
              <Image
                width={24}
                height={24}
                alt="Refresh"
                src={`/icons/searchIconWhite.svg`}
              />
              {/* <Box
                component={'img'}
                sx={{
                  height: '100px',
                  width: '100px',
                  background: '#fff',
                  borderRadius: '50%',
                  padding: '5px',
                }}
                alt="Employee"
                src={data?.[0]?.image_path}
              /> */}
            </Button>
          </Grid>
        </Grid>
        {filteredData && filteredData.length > 0 && (
          <>
            {value === 'one' ? (
              <EmployeeView
                search={search}
                id={id}
                name={name}
                designation={designation}
                status={'All'}
                data={filteredData}
                isLoading={isLoading}
              />
            ) : value === 'two' ? (
              <EmployeeView
                status={'Active'}
                id={id}
                name={name}
                designation={designation}
                search={search}
                data={filteredData}
                isLoading={isLoading}
              />
            ) : (
              <EmployeeView
                id={id}
                name={name}
                designation={designation}
                status={'Inactive'}
                search={search}
                data={filteredData}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default AllEmployee;
