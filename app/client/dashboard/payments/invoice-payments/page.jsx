'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { paymentStatusTabs } from '@/src/constants/data/tabs/paymentTabs';
import {
  invoicePaymentColumn,
  invoicePaymentData,
  otherPaymentColumn,
  otherPaymentData,
} from '@/src/constants/data/tables/paymentData';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import AppTable from '@/src/components/appTable/AppTable';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOthPay, setIsLoadingOthPay] = useState(true);
  const [search, setSearch] = useState('');
  const [searchOthPay, setSearchOthPay] = useState('');
  const [invPayData, setInvPayData] = useState(
    filterTableRowsWRTTab(invoicePaymentData, { paymentStatus: currentTab })
  );
  const [othPayData, setOthPayData] = useState(
    filterTableRowsWRTTab(invoicePaymentData, { paymentStatus: currentTab })
  );

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

  useEffect(() => {
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
  useEffect(() => {
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
                variant="scrollable"
              >
                {paymentStatusTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    disableRipple={true}
                    {...prop}
                    sx={{
                      display: 'flex',
                      gap: '15px',
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            <Box my={4}>
              <Typography
                sx={{ fontSize: '20px', fontWeight: 400, marginBottom: '20px' }}
              >
                Employee invoices
              </Typography>

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
                  <Box
                    sx={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                  >
                    <AppTable column={invoicePaymentColumn} data={invPayData} />
                  </Box>
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
            <Typography sx={{ fontSize: '20px', fontWeight: 400 }}>
              Other Payments
            </Typography>
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
              <Box
                sx={{
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <AppTable column={otherPaymentColumn} data={othPayData} />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
