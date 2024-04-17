'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';

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
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_INVOICE_PAYMENTS } from '@/src/services/apiService/apiEndPoints';
import {
  fetchPaidInvoicePaymentsRequest,
  fetchPaidInvoicePaymentsRequestFailed,
  fetchPaidInvoicePaymentsRequestSuccess,
  fetchPendingInvoicePaymentsRequest,
  fetchPendingInvoicePaymentsRequestFailed,
  fetchPendingInvoicePaymentsRequestSuccess,
  fetchProcessingInvoicePaymentsRequest,
  fetchProcessingInvoicePaymentsRequestFailed,
  fetchProcessingInvoicePaymentsRequestSuccess,
} from '@/src/redux/slices/clientSlices/invoicePaymentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const { data } = useSelector((state) => state?.client?.invoicePayments);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOthPay, setIsLoadingOthPay] = useState(true);
  const [search, setSearch] = useState('');
  const [searchOthPay, setSearchOthPay] = useState('');

  const pendingInvoice = useQuery({
    staleTime: 10000,
    queryKey: ['pendingInvoicePayments'],
    queryFn: async () => {
      dispatch(fetchPendingInvoicePaymentsRequest());
      return api
        .getData(`${CLIENT_INVOICE_PAYMENTS}/?payment_status="Pending`)
        .then(({ data }) => {
          dispatch(fetchPendingInvoicePaymentsRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchPendingInvoicePaymentsRequestFailed());
          console.log({ err });
        });
    },
  });
  const processingInvoice = useQuery({
    staleTime: 10000,
    queryKey: ['processingInvoicePayments'],
    queryFn: async () => {
      dispatch(fetchProcessingInvoicePaymentsRequest());
      return api
        .getData(`${CLIENT_INVOICE_PAYMENTS}/?payment_status="Processing`)
        .then(({ data }) => {
          dispatch(fetchProcessingInvoicePaymentsRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchProcessingInvoicePaymentsRequestFailed());
          console.log({ err });
        });
    },
  });
  console.log({ isLoading, isLoadingOthPay });
  const paidInvoice = useQuery({
    staleTime: 10000,
    queryKey: ['paidInvoicePayments'],
    queryFn: async () => {
      dispatch(fetchPaidInvoicePaymentsRequest());
      return api
        .getData(`${CLIENT_INVOICE_PAYMENTS}/?payment_status="Paid`)
        .then(({ data }) => {
          dispatch(fetchPaidInvoicePaymentsRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchPaidInvoicePaymentsRequestFailed());
          console.log({ err });
        });
    },
  });

  console.log({ paidInvoice, pendingInvoice, processingInvoice });

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
      filterDataByKeyword(data, search || '');
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value, currentTab]);
  useEffect(() => {
    const data = [...filterTableRowsWRTTab(otherPaymentData)];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, searchOthPay || '');
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
            <Typography variant="h3" marginBottom={5}>
              Invoice payments
            </Typography>
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
                    sx={{ mr: '20px', color: '#595959' }}
                  />
                ))}
              </Tabs>
            </Box>

            <Box my={4}>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={'200px'}
                  height={30}
                  sx={{ background: '#F6F6F6', fontSize: '2.5rem' }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 400,
                    marginBottom: '20px',
                    color: '#171717',
                  }}
                >
                  Employee invoices
                </Typography>
              )}

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
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={invoicePaymentColumn}
                    data={
                      value === 0
                        ? data?.panding
                        : value === 1
                          ? data?.processing
                          : data?.paid
                    }
                  />
                </Box>
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
      <br />
      <hr />
      <br />
      <br />
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
            {isLoading ? (
              <Skeleton
                variant="text"
                width={'200px'}
                height={30}
                sx={{
                  background: '#F6F6F6',
                  fontSize: '2.5rem',
                  marginTop: '20px',
                }}
              />
            ) : (
              <Typography
                sx={{ fontSize: '20px', fontWeight: 400, color: '#171717' }}
              >
                Other Payments
              </Typography>
            )}
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
            <Box
              sx={{
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              <AppTable column={otherPaymentColumn} data={data?.pending} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
