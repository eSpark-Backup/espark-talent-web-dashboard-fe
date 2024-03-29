'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { contractSignedTabs } from '@/src/constants/data/tabs/contractSignedTabs';
import AppTable from '@/src/components/appTable/AppTable';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  CLIENT_COMPANY_CONTRACT,
  CLIENT_EMPLOYEE_CONTRACT,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchClientEmpContractRequest,
  fetchClientEmpContractRequestFailed,
  fetchClientEmpContractRequestSuccess,
  fetchClientCompanyContractRequest,
  fetchClientCompanyContractRequestFailed,
  fetchClientCompanyContractRequestSuccess,
} from '@/src/redux/slices/clientSlices/contratSignedSlice';
import { Toast } from '@/src/components/Toast/Toast';

const ContractSigned = () => {
  const { data, isLoading } = useSelector((state) => state?.client?.contract);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Hiring Request');

  const companyContractSignedQuery = useQuery({
    staleTime: 10000,
    queryKey: ['company-contract-signed-query'],
    queryFn: async () => {
      dispatch(fetchClientCompanyContractRequest());
      return api
        .getData(`${CLIENT_COMPANY_CONTRACT}`)
        .then(({ data }) => {
          dispatch(fetchClientCompanyContractRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchClientCompanyContractRequestFailed());
          console.log({ err });
        });
    },
  });
  const empContractSignedQuery = useQuery({
    staleTime: 10000,
    queryKey: ['employee-contract-signed-query'],
    queryFn: async () => {
      dispatch(fetchClientEmpContractRequest());
      return api
        .getData(`${CLIENT_EMPLOYEE_CONTRACT}`)
        .then(({ data }) => {
          dispatch(fetchClientEmpContractRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchClientEmpContractRequestFailed());
          console.log({ err });
        });
    },
  });

  console.log({ empContractSignedQuery, companyContractSignedQuery });
  const handleChange = (event, newValue) => {
    let tab = event?.target?.innerText.split(' ');
    if (tab.length > 1) {
      tab = tab.slice(0, -1).join(' ');
    } else {
      tab = tab.join(' ');
    }
    setCurrentTab(tab);

    setValue(newValue);
  };

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            width: '100%',
          }}
        >
          <Box
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
                    color: '#595959',
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
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {contractSignedTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    {...prop}
                    disableRipple={true}
                    sx={{
                      textTransform: 'math-auto',
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box my={4}>
              {contractSignedTabs?.map((tab, i) => (
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
                        column={tab?.columns}
                        data={value === 0 ? data?.company : data?.employee}
                        tableRowClass="app-table-row-contract"
                      />
                    </Box>
                  )}
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default ContractSigned;
