'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/tabs/empTabs';
import AppTable from '@/src/components/appTable/AppTable';
import { contractSignedEmployeeTabs } from '@/src/constants/data/tabs/contractSignedTabs';
import { useQuery } from '@tanstack/react-query';
import {
  EMP_COMPANY_CONTRACT,
  EMP_OFFSHORE_CONTRACT,
} from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmpClientContractSuccess,
  fetchEmpContracts,
  fetchEmpContractsFailed,
  fetchEmpCompanyContractsSuccess,
} from '@/src/redux/slices/employeeSlices/contractSlice';
import { api } from '@/src/services/apiService';

const ContractSigned = () => {
  const dispatch = useDispatch();
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { contracts, isLoading } = useSelector((state) => state?.emp?.contract);
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Hiring Request');

  const companyContracts = useQuery({
    queryFn: () => {
      dispatch(fetchEmpContracts());
      return api
        .getData(EMP_COMPANY_CONTRACT)
        .then(({ data }) => {
          dispatch(fetchEmpCompanyContractsSuccess({ company: data }));
          return data;
        })
        .catch((error) => {
          console.log({ error });
          dispatch(fetchEmpContractsFailed());
        });
    },
  });
  const clientContracts = useQuery({
    queryFn: () => {
      return api
        .getData(
          `${EMP_OFFSHORE_CONTRACT}/?workspace=${workSpace?.email || ''}`
        )
        .then(({ data }) => {
          dispatch(fetchEmpClientContractSuccess({ offShores: data }));
          return data;
        })
        .catch((error) => {
          console.log({ error });
          dispatch(fetchEmpContractsFailed());
        });
    },
  });

  console.log({ companyContracts, clientContracts });

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     try {
  //       await fetchDataFake();
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDataAsync();
  // }, []);
  // console.log(empData, setSearch);
  const handleChange = (event, newValue) => {
    console.log({ newValue });
    changeTab({
      isSingular: true,
      tabs: empTabs,
      event,
      newValue,
      setCurrentTab,
      setValue,
    });
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
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {contractSignedEmployeeTabs?.map(({ label, prop }, i) => (
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
              {contractSignedEmployeeTabs?.map((tab, i) => (
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
                        data={
                          value === 0
                            ? contracts?.company || []
                            : contracts?.offShores || []
                        }
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
