'use client';
import React, { useState } from 'react';
import { Grid, Typography, Tabs, Tab, Button } from '@mui/material';
import { Box } from '@mui/system';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { clientProfileTabs } from '@/src/constants/data/tabs/hr/client-profile';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { renderTable } from './renderComponents';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useRouter } from 'next/navigation';
import HiringRequestModal from './HiringRequestModal';
import AddContractModal from './AddContractModal';
import UploadInvoiceModal from './UploadInvoiceModal';
import AddEmployeeModal from './AddEmployeeModal';

const AddEmployee = () => {
  const router = useRouter();
  const [isOpenHiringRequestModal, setIsOpenHiringRequestModal] =
    useState(false);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const [isOpenUploadInvoiceModal, setIsOpenUploadInvoiceModal] =
    useState(false);
  const [isOpenAddClientModal, setIsOpenAddClientModal] = useState(false);
  // const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentTab, setCurrentTab] = useState({
    label: 'Hire & onboard',
    val: 0,
    nested: {
      label: 'Hiring Request',
      val: 0,
    },
  });
  const [currentTabTable, setCurrentTabTable] = useState({
    data: clientProfileTabs[0].nestedTabs[0].data,
    column: clientProfileTabs[0].nestedTabs[0].column,
  });
  const handleChangeCurrentTab = (event, newValue) => {
    const current = clientProfileTabs[newValue];
    const { label, nestedTabs, data, column } = current;
    setCurrentTab((ps) => {
      return {
        ...ps,
        label,
        val: newValue,
        nested: {
          label: nestedTabs[0]?.label,
          val: 0,
        },
      };
    });
    if (data?.length) {
      // console.log({data})
      const filteredData = filterTableRowsWRTTab(data, {
        paymentStatus: nestedTabs[0].label,
      });
      setCurrentTabTable({
        data: filteredData,
        column,
      });
    } else if (nestedTabs[0].data?.length) {
      setCurrentTabTable({
        data: nestedTabs[0].data,
        column: nestedTabs[0].column,
      });
    } else {
      setCurrentTabTable({
        data: [],
        column: [],
      });
    }
  };
  const handleChangeNestedTab = (event, newValue, data, rest) => {
    const current = data[newValue];
    const { label } = current;
    // console.log({current,data})
    setCurrentTab((ps) => {
      return {
        ...ps,
        nested: {
          label,
          val: newValue,
        },
      };
    });
    if (current?.data?.length) {
      setCurrentTabTable({
        data: current?.data,
        column: current?.column,
      });
    } else if (rest.data?.length) {
      const filteredData = filterTableRowsWRTTab(rest.data, {
        paymentStatus: current?.label,
      });
      setCurrentTabTable({
        data: filteredData,
        column: rest.column,
      });
    } else {
      setCurrentTabTable({
        data: [],
        column: [],
      });
    }
  };
  const handleOpenHiringRequestModal = () => {
    setIsOpenHiringRequestModal(true);
  };
  const handleCloseHiringRequestModal = () => {
    setIsOpenHiringRequestModal(false);
  };
  const handleOpenContractModal = () => {
    setIsOpenContractModal(true);
  };
  const handleCloseContractModal = () => {
    setIsOpenContractModal(false);
  };
  const handleOpenUploadInvoiceModal = () => {
    setIsOpenUploadInvoiceModal(true);
  };
  const handleCloseUploadInvoiceModal = () => {
    setIsOpenUploadInvoiceModal(false);
  };
  const handleOpenAddClientModal = () => {
    setIsOpenAddClientModal(true);
  };
  const handleCloseAddClientModal = () => {
    setIsOpenAddClientModal(false);
  };
  return (
    <>
      <Box>
        <Breadcrumb root="clients" title="Clients /" currentPage="Profile" />
        <Box mb={'40px'}>
          <Typography
            sx={{
              color: '#171717',
              fontSize: '30px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
            }}
          >
            Profile
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            borderRadius: '5px',
            background: '#FFF',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            position: 'relative',
            p: { xs: '10px', md: '18px 25px' },
          }}
        >
          <Grid
            item
            xs={12}
            lg={4}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="/icons/Employee.svg"
                sx={{
                  width: { xs: '70px', md: '100px' },
                  height: { xs: '70px', md: '100px' },
                }}
              />
              <Box
                component="img"
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                }}
                src="/icons/EditIcon.svg"
                width={35}
                height={35}
              />
            </Box>
            <Box
              sx={{
                ml: { xs: '0px', md: '40px' },
              }}
              display={'flex'}
              flexDirection={'column'}
            >
              <Typography
                sx={{
                  color: '#171717',
                  fontSize: '25px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: 'normal',
                  mb: { xs: '10px', md: '15px' },
                }}
              >
                John Doe
              </Typography>
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: { xs: '13px', md: '14px', xl: '16px' },
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                eSpark Consulting Group
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={8}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              mt: { xs: '15px', lg: '0px' },
            }}
          >
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ mb: { xs: '0', md: '25px' } }}
                  >
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Client ID:
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      es-00020
                    </Typography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Marital status:
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Single
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ mb: { xs: '0', md: '25px' } }}
                  >
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Gender:
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Male
                    </Typography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Phone:
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      090078601
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ mb: { xs: '0', md: '25px' } }}
                  >
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Email:
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      doejohn@321.com
                    </Typography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      Birth date:
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '13px', md: '14px', xl: '16px' },
                        width: { xs: '200px', md: 'auto' },
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: { xs: '1.5', md: 'normal' },
                      }}
                    >
                      26 Jan,2023
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Box
            component="img"
            sx={{
              position: 'absolute',
              top: { xs: '5px', xl: '15px' },
              right: { xs: '5px', xl: '54px' },
              cursor: 'pointer',
            }}
            src="/icons/EditIcon.svg"
            width={35}
            height={35}
            onClick={() => router.push(`/hr/dashboard/clients/edit-profile`)}
          />
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ borderBottom: 1, borderColor: 'divider', mt: '40px' }}
          >
            <Tabs
              value={currentTab.val}
              onChange={handleChangeCurrentTab}
              aria-label="basic tabs example"
              variant="scrollable"
            >
              {clientProfileTabs?.map(({ label, prop }, index) => (
                <Tab
                  key={index}
                  label={`${label}`}
                  {...prop}
                  disableRipple={true}
                />
              ))}
            </Tabs>
          </Box>
          {currentTab?.label !== 'Employees' && (
            <Box
              sx={{
                marginTop: '10px',
                marginBottom: '20px',
                borderBottom:
                  currentTab.label !== 'Leave Balance' && 'solid 1px #ccc',
              }}
            >
              {clientProfileTabs?.map(({ nestedTabs, ...rest }, index) => (
                <CustomTabPanel
                  value={currentTab.val}
                  index={index}
                  key={index}
                >
                  <Box
                    // display={'flex'}
                    // justifyContent={'space-between'}
                    // alignItems={'center'}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', md: 'center' },
                      flexDirection: { xs: 'column', md: 'row' },
                    }}
                  >
                    <Tabs
                      variant="scrollable"
                      value={currentTab.nested.val}
                      onChange={(ev, newVal) =>
                        handleChangeNestedTab(ev, newVal, nestedTabs, rest)
                      }
                      aria-label="basic tabs example"
                    >
                      {nestedTabs?.map(({ label, prop }, nestedIndex) => (
                        <Tab
                          key={nestedIndex}
                          label={`${label}`}
                          {...prop}
                          disableRipple={true}
                        />
                      ))}
                    </Tabs>
                    {currentTab.label === 'Hire & onboard' ? (
                      <Button
                        onClick={handleOpenHiringRequestModal}
                        variant="contained"
                        sx={{
                          my: { xs: '20px', md: 0 },
                        }}
                      >
                        Add new request
                      </Button>
                    ) : currentTab.label === 'Contract signed' ? (
                      <Button
                        onClick={handleOpenContractModal}
                        variant="contained"
                        sx={{
                          my: { xs: '20px', md: 0 },
                        }}
                      >
                        Add contract
                      </Button>
                    ) : currentTab.label === 'Employee invoices' ? (
                      <Button
                        onClick={handleOpenUploadInvoiceModal}
                        variant="contained"
                        sx={{
                          my: { xs: '20px', md: 0 },
                        }}
                      >
                        Upload invoice
                      </Button>
                    ) : (
                      <Button
                        onClick={handleOpenUploadInvoiceModal}
                        variant="contained"
                        sx={{
                          my: { xs: '20px', md: 0 },
                        }}
                      >
                        Upload invoice
                      </Button>
                    )}
                  </Box>
                </CustomTabPanel>
              ))}
            </Box>
          )}
          {renderTable({
            currentTab: currentTab.label,
            data: currentTabTable.data,
            column: currentTabTable.column,
            openModal: handleOpenAddClientModal,
          })}
        </Box>
      </Box>
      <HiringRequestModal
        open={isOpenHiringRequestModal}
        onClose={handleCloseHiringRequestModal}
      />
      <AddContractModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
      />
      <UploadInvoiceModal
        title="Employee invoice form"
        open={isOpenUploadInvoiceModal}
        onClose={handleCloseUploadInvoiceModal}
      />
      <AddEmployeeModal
        title="Employee invoice form"
        open={isOpenAddClientModal}
        onClose={handleCloseAddClientModal}
      />
    </>
  );
};

export default AddEmployee;
