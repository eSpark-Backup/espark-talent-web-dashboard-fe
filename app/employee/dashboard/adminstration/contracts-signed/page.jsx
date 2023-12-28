'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { a11yProps, changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/tabs/empTabs';
import {
  contractSignedColumn,
  contractSignedData,
} from '@/src/constants/data/tables/contractSigned';

const ContractSigned = () => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Hiring Request');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [empData, setEmpData] = useState(contractSignedData);


  const fetchDataFake = async () => {
    return true;
  };

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
    const data = [...contractSignedData];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
  };

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
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant="h3">Contract signed</Typography>
              <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                  variant="caption"
                >
                  Visualise team details & manage members
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {[{ label: 'Active contracts', prop: a11yProps(0) }]?.map(
                  ({ label, prop }, i) => (
                    <Tab key={i} label={`${label}`} {...prop} />
                  )
                )}
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
            {empTabs?.map((_, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <AppTable
                    currentTab={currentTab}
                    column={contractSignedColumn}
                    data={empData}
                  />
                )}
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default ContractSigned;
