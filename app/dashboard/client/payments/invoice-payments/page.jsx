'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { paymentStatusTabs } from '@/src/constants/data/paymentTabs';
import {
  invoicePaymentColumn,
  invoicePaymentData,
  otherPaymentColumn,
  otherPaymentData,
} from '@/src/constants/data/paymentData';
import { filterTableRowsWRTTab } from '@/src/utils/table';

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState('Pending');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingOthPay, setIsLoadingOthPay] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [searchOthPay, setSearchOthPay] = React.useState('');
  const [invPayData, setInvPayData] = React.useState(
    filterTableRowsWRTTab(invoicePaymentData, { paymentStatus: currentTab })
  );
  const [othPayData, setOthPayData] = React.useState(
    filterTableRowsWRTTab(invoicePaymentData, { paymentStatus: currentTab })
  );

  const fetchDataFake = async () => {
    return true;
  };

  React.useEffect(() => {
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
      // isSingular: true,
      tabs: paymentStatusTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      setData: setInvPayData,
      teamMembersData: invoicePaymentData,
      filterTableRowsWRTTab,
      filterBy: 'paymentStatus',
    });
  };

  React.useEffect(() => {
    const data = [
      ...filterTableRowsWRTTab(invoicePaymentData, {
        paymentStatus: currentTab,
      }),
    ];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setInvPayData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value, currentTab]);
  React.useEffect(() => {
    const data = [...filterTableRowsWRTTab(otherPaymentData)];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, searchOthPay || '', setOthPayData);
      setIsLoadingOthPay(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchOthPay]);

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
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="h3">Invoice payments</Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {paymentStatusTabs?.map(({ label, prop }, i) => (
                  <Tab key={i} label={`${label}`} {...prop} />
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
            {paymentStatusTabs?.map((_, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <AppTable column={invoicePaymentColumn} data={invPayData} />
                )}
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
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
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="h3">Other payments</Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box my={4}>
              <Input
                setIsLoading={setIsLoadingOthPay}
                handleChange={setSearchOthPay}
                value={searchOthPay}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
            </Box>
            {isLoadingOthPay ? (
              <Box>Loading...</Box>
            ) : (
              <AppTable column={otherPaymentColumn} data={othPayData} />
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
