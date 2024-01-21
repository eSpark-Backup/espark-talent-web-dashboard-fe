'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';

import Input from '@/src/components/dashboard/input';
import { employeeTableDataHiringRequest } from '@/src/constants/data/tables/employee';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/tabs/empTabs';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppTable from '@/src/components/appTable/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('Hiring Request');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [empData, setEmpData] = useState(employeeTableDataHiringRequest);

  const fetchDataFake = async () => {
    return true;
  };

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleChange = (event, newValue) => {
    changeTab({
      isSingular: true,
      tabs: empTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      setData: setEmpData,
    });
  };

  useEffect(() => {
    const data = empTabs[value].data;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value]);

  const handleClickDelete = () => setIsOpen(true);

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
            marginBottom={4}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="h3">Hire a team member</Typography>
            <Link href={HIRING_FORM_DATA?.startHiringLink}>
              <Button
                style={{
                  background: '#029894',
                  width: '160px',
                  color: '#fff',
                  fontSize: '16px',
                  textTransform: 'math-auto',
                }}
              >
                {HIRING_FORM_DATA?.addnewHire}
              </Button>
            </Link>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                sx={{
                  '&.Mui-selected': {
                    outline: 'none',
                    background: 'transparent',
                  },
                }}
              >
                {empTabs?.map(({ label, prop, data }, i) => (
                  <Tab
                    disableRipple={true}
                    key={i}
                    label={`${label} (${data?.length})`}
                    sx={{
                      '& .MuiTabs-indicator': {
                        backgroundColor: 'gray',
                      },
                    }}
                    {...prop}
                  />
                ))}
              </Tabs>
            </Box>
            <Box my={4}>
              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
            </Box>
            {empTabs?.map(({ column }, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <Box
                    sx={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                  >
                    <AppTable
                      currentTab={currentTab}
                      column={column}
                      data={empData}
                      handleClickActionDelete={handleClickDelete}
                    />
                  </Box>
                )}
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
      <AppConfirmationMadal
        title={'Delete'}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
};
export default Dashboard;
