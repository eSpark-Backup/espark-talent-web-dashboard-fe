'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { contractHrSignedTabs } from '@/src/constants/data/tabs/contractSignedTabs';
import AppTable from '@/src/components/appTable/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import AddContractHrPortalModal from '@/src/components/contractHrportal/contractHr';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { handleTabChange } from '@/src/utils/handleTab';
import {
  getClientsCompanyContractRequest,
  getClientsCompanyContractRequestFailed,
  getClientsCompanyContractRequestSuccess,
  getOffShoreContractRequest,
  getOffShoreContractRequestFailed,
  getOffShoreContractRequestSuccess,
} from '@/src/redux/slices/hrSlices/contractSlice';
import { api } from '@/src/services/apiService';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  HR_COMPANY_CONTRACTS,
  HR_OFF_SHORE_CONTRACTS,
} from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';

const ContractSigned = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [nestedValue, setNestedValue] = useState(0);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const { companyContract, offShoreContract } = useSelector(
    (state) => state?.hr?.contracts
  );
  const [currentTab, setCurrentTab] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [search, setSearch] = useState('');
  // const [empData, setEmpData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const companyContractSignedQuery = useQuery({
    staleTime: 10000,
    queryKey: ['hr-company-contract-signed-query'],
    queryFn: async () => {
      dispatch(getClientsCompanyContractRequest());
      return api
        .getData(`${HR_COMPANY_CONTRACTS}?status=clients`)
        .then(({ data }) => {
          dispatch(getClientsCompanyContractRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(getClientsCompanyContractRequestFailed());
          console.log({ err });
        });
    },
  });
  const offShoreContractSignedQuery = useQuery({
    staleTime: 10000,
    queryKey: ['off-shore-contract-signed-query'],
    queryFn: async () => {
      dispatch(getOffShoreContractRequest());
      return api
        .getData(`${HR_OFF_SHORE_CONTRACTS}`)
        .then(({ data }) => {
          dispatch(getOffShoreContractRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          dispatch(getOffShoreContractRequestFailed());
          console.log({ err });
        });
    },
  });
  const companyContractSignedMutation = useMutation({
    mutationFn: async (status) => {
      dispatch(getClientsCompanyContractRequest());
      return api.getData(`${HR_COMPANY_CONTRACTS}?status=${status}`);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      dispatch(getClientsCompanyContractRequestSuccess(data || []));
    },
    onError: (err) => {
      dispatch(getClientsCompanyContractRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  // console.log(empData, setSearch);
  console.log({
    comp: companyContractSignedQuery.data,
    offShore: offShoreContractSignedQuery.data,
  });
  const handleChange = (event, newValue) => {
    handleTabChange(event, newValue, setCurrentTab, setValue, setNestedValue);
  };
  // useEffect(() => {
  //   const data = [...contractSignedOffshoreData];
  //   const timeoutId = setTimeout(() => {
  //     filterDataByKeyword(data, search || '', setEmpData);
  //     // setIsLoading(false);
  //   }, 500);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [search, value]);
  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
    if (newValue === 0) {
      companyContractSignedMutation.mutate('clients');
    } else {
      companyContractSignedMutation.mutate('employees');
    }
  };
  const handleClose = () => setIsOpen(false);
  const handleClickDelete = () => setIsOpen(true);
  const handleOpenContractModal = () => {
    setIsOpenContractModal(true);
  };
  const handleCloseContractModal = () => {
    setIsOpenContractModal(false);
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
                  {CONTRACT_SIGNED?.teamContract}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                justifyContent: { xs: 'center', md: 'space-between' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {contractHrSignedTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    {...prop}
                    disableRipple={true}
                    sx={{
                      textTransform: 'math-auto',
                      mr: '2px',
                    }}
                  />
                ))}
              </Tabs>
              {value === 1 && (
                <Button
                  onClick={handleOpenContractModal}
                  // variant="contained"
                  sx={{
                    width: '160px',
                    height: '40px',
                    my: { xs: '20px', md: 0 },
                    textTransform: 'math-auto',
                    fontSize: '16px',
                    backgroundColor: '#029894',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#029894',
                      color: '#fff',
                    },
                  }}
                >
                  {CONTRACT_SIGNED?.addContract}
                </Button>
              )}
            </Box>
            <Box my={2}>
              {contractHrSignedTabs?.map((tab, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  {companyContractSignedQuery?.isLoading ||
                  offShoreContractSignedQuery.isLoading ? (
                    <Box>Loading...</Box>
                  ) : (
                    <Box>
                      {value !== 1 && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: {
                              xs: 'center',
                              md: 'space-between',
                            },
                            flexDirection: { xs: 'column', md: 'row' },
                            borderBottom: 1,
                            borderColor: 'divider',
                            mb: '30px',
                          }}
                        >
                          <Tabs
                            value={nestedValue}
                            onChange={handleNestedChange}
                          >
                            {tab?.nested?.map((nestedTab, nestedIndex) => (
                              <Tab
                                label={nestedTab.label}
                                key={nestedIndex}
                                {...nestedTab.prop}
                                disableRipple={true}
                                sx={{ mr: '4px' }}
                              />
                            ))}
                          </Tabs>
                          {tab?.nested &&
                            tab.nested[nestedValue]?.columns &&
                            tab.nested[nestedValue]?.data && (
                              <Button
                                onClick={handleOpenContractModal}
                                variant="contained"
                                sx={{
                                  width: '160px',
                                  height: '40px',
                                  my: { xs: '20px', md: 0 },
                                  fontSize: '16px',
                                  textTransform: 'math-auto',
                                  backgroundColor: '#029894',
                                  color: '#fff',
                                  '&:hover': {
                                    backgroundColor: '#029894',
                                    color: '#fff',
                                  },
                                }}
                              >
                                {CONTRACT_SIGNED?.addContract}
                              </Button>
                            )}
                        </Box>
                      )}
                      <Box sx={{ maxWidth: '100%', overflow: 'auto' }}>
                        {tab?.nested &&
                          tab.nested[nestedValue]?.columns &&
                          tab.nested[nestedValue]?.data && (
                            <AppTable
                              currentTab={currentTab}
                              column={tab.nested[nestedValue].columns}
                              data={
                                value === 0
                                  ? companyContract.clients
                                  : // : JSON.parse(companyContract.employees)
                                    []
                              }
                              handleClickActionDelete={handleClickDelete}
                              noPagination
                              tableRowClass="app-table-row-contract"
                            />
                          )}
                        {value !== 0 && (
                          <AppTable
                            currentTab={currentTab}
                            column={tab?.columns}
                            data={offShoreContract || []}
                            handleClickActionDelete={handleClickDelete}
                            noPagination
                            tableRowClass="app-table-row-contract"
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <AddContractHrPortalModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
        contractType={nestedValue === 0 ? 'clients' : 'employees'}
        endPoint={value === 0 ? HR_COMPANY_CONTRACTS : HR_OFF_SHORE_CONTRACTS}
        currentTab={value}
      />
    </>
  );
};
export default ContractSigned;
