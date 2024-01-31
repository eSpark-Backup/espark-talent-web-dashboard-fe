'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { contractSignedOffshoreData } from '@/src/constants/data/tables/contractSigned';
import { contractHrSignedTabs } from '@/src/constants/data/tabs/contractSignedTabs';
import AppTable from '@/src/components/appTable/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import AddContractHrPortalModal from '@/src/components/contractHrportal/contractHr';

const ContractSigned = () => {
  const [value, setValue] = useState(0);
  const [nestedValue, setNestedValue] = useState(0);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [empData, setEmpData] = useState();
  const [isOpen, setIsOpen] = useState(false);
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
  console.log(empData, setSearch);
  const handleChange = (event, newValue) => {
    let tab = event?.target?.innerText.split(' ');
    if (tab.length > 1) {
      tab = tab.slice(0, -1).join(' ');
    } else {
      tab = tab.join(' ');
    }
    setCurrentTab(tab);
    setValue(newValue);
    setNestedValue(newValue);
  };
  useEffect(() => {
    const data = [...contractSignedOffshoreData];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value]);
  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
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
                  Visualise team details & manage members
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
                    }}
                  />
                ))}
              </Tabs>
              {value === 1 && (
                <Button
                  onClick={handleOpenContractModal}
                  variant="contained"
                  sx={{
                    width: '160px',
                    height: '40px',
                    my: { xs: '20px', md: 0 },
                    textTransform: 'math-auto',
                  }}
                >
                  Add contract
                </Button>
              )}
            </Box>
            <Box my={4}>
              {contractHrSignedTabs?.map((tab, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  {isLoading ? (
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
                              />
                            ))}
                          </Tabs>
                          {nestedValue !== undefined &&
                            tab?.nested?.[nestedValue]?.columns &&
                            tab?.nested?.[nestedValue]?.data && (
                              <Button
                                onClick={handleOpenContractModal}
                                variant="contained"
                                sx={{
                                  width: '160px',
                                  height: '40px',
                                  my: { xs: '20px', md: 0 },
                                  textTransform: 'math-auto',
                                }}
                              >
                                Add contract
                              </Button>
                            )}
                        </Box>
                      )}
                      <Box sx={{ maxWidth: '100%', overflow: 'auto' }}>
                        {nestedValue !== undefined &&
                          tab?.nested?.[nestedValue]?.columns &&
                          tab?.nested?.[nestedValue]?.data && (
                            <AppTable
                              currentTab={currentTab}
                              column={tab.nested[nestedValue].columns}
                              data={tab.nested[nestedValue].data}
                              handleClickActionDelete={handleClickDelete}
                              noPagination
                            />
                          )}
                        {value !== 0 && (
                          <AppTable
                            currentTab={currentTab}
                            column={tab?.columns}
                            data={tab?.data}
                            handleClickActionDelete={handleClickDelete}
                            noPagination
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
        title={'Delete'}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <AddContractHrPortalModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
      />
    </>
  );
};
export default ContractSigned;
