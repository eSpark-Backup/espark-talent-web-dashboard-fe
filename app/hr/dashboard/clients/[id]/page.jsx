'use client';
import React, { useState } from 'react';
import { Typography, Tabs, Tab, Button } from '@mui/material';
import { Box } from '@mui/system';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { clientProfileTabs } from '@/src/constants/data/tabs/hr/client-profile';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { renderTable } from './renderComponents';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useParams } from 'next/navigation';
import HiringRequestModal from './HiringRequestModal';
import AddContractModal from './AddContractModal';
import UploadInvoiceModal from './UploadInvoiceModal';
import AddEmployeeModal from './AddEmployeeModal';
import AddInterviewModal from './AddInterviewModal';
import AddOnboardModal from './AddOnboardModal';

import { CLIENTPROFILE } from '@/src/constants/ClientProfile';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_GET_CLIENT_PROFILE } from '@/src/services/apiService/apiEndPoints';
import {
  getCurrentClientData,
  getCurrentClientDataFailed,
  getCurrentClientDataSuccess,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { useDispatch } from 'react-redux';
import ClientProfileData from './ClientProfileData';

const AddEmployee = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 1000,
    queryKey: ['hr-client-info-query'],
    queryFn: () => {
      dispatch(getCurrentClientData());
      console.log('Calling api');
      return api
        .getData(`${HR_GET_CLIENT_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          // console.log({ data });
          // console.log('API Success');
          dispatch(getCurrentClientDataSuccess(data));
          // console.log('API Success1');
          return data;
        })
        .catch((error) => {
          // console.log('API Failed');
          dispatch(getCurrentClientDataFailed());
          console.log({ error });
        });
    },
  });
  const [isOpenHiringRequestModal, setIsOpenHiringRequestModal] =
    useState(false);
  const [isOpenAddInterviewModal, setIsOpenAddInterviewModal] = useState(false);
  const [isOpenAddOnboardModal, setIsOpenAddOnboardModal] = useState(false);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [isOpenUploadInvoiceModal, setIsOpenUploadInvoiceModal] =
    useState(false);
  const [isOpenAddClientModal, setIsOpenAddClientModal] = useState(false);
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
  const handleOpenModal = () => {
    setEditModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
  };
  const handleOpenHiringRequestModal = () => {
    setIsOpenHiringRequestModal(true);
  };
  const handleCloseHiringRequestModal = () => {
    setIsOpenHiringRequestModal(false);
  };
  const handleOpenAddInterviewModal = () => {
    setIsOpenAddInterviewModal(true);
  };
  const handleCloseAddInterviewModal = () => {
    setIsOpenAddInterviewModal(false);
  };
  const handleOpenAddOnboardModal = () => {
    setIsOpenAddOnboardModal(true);
  };
  const handleCloseAddOnboardModal = () => {
    setIsOpenAddOnboardModal(false);
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
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
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
            {CLIENTPROFILE?.profile}
          </Typography>
        </Box>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <ClientProfileData
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              showEditModal={showEditModal}
            />
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
                      currentTab?.label !== 'Leave Balance' && 'solid 1px #ccc',
                  }}
                >
                  {clientProfileTabs?.map(({ nestedTabs, ...rest }, index) => (
                    <CustomTabPanel
                      value={currentTab.val}
                      index={index}
                      key={index}
                    >
                      <Box
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
                        {currentTab?.label === 'Hire & onboard' ? (
                          <>
                            {currentTab?.nested.val === 0 ? (
                              <Button
                                onClick={handleOpenHiringRequestModal}
                                variant="contained"
                                sx={{
                                  my: { xs: '20px', md: 0 },
                                  textTransform: 'math-auto',
                                  color: '#fff',
                                  background: '#029894',
                                  '&:hover': {
                                    color: '#fff',
                                    background: '#029894',
                                  },
                                }}
                              >
                                {CLIENTPROFILE?.addNewRequest}
                              </Button>
                            ) : currentTab?.nested.val === 1 ? (
                              <Button
                                onClick={handleOpenAddInterviewModal}
                                variant="contained"
                                sx={{
                                  my: { xs: '20px', md: 0 },
                                  textTransform: 'math-auto',
                                  color: '#fff',
                                  background: '#029894',
                                  '&:hover': {
                                    color: '#fff',
                                    background: '#029894',
                                  },
                                }}
                              >
                                {CLIENTPROFILE?.setNewInterview}
                              </Button>
                            ) : (
                              <Button
                                onClick={handleOpenAddOnboardModal}
                                variant="contained"
                                sx={{
                                  my: { xs: '20px', md: 0 },
                                  color: '#fff',
                                  background: '#029894',
                                  '&:hover': {
                                    color: '#fff',
                                    background: '#029894',
                                  },
                                }}
                              >
                                {CLIENTPROFILE?.addOnboard}
                              </Button>
                            )}
                          </>
                        ) : currentTab?.label === 'Contract signed' ? (
                          <Button
                            onClick={handleOpenContractModal}
                            variant="contained"
                            sx={{
                              my: { xs: '20px', md: 0 },
                              color: '#fff',
                              background: '#029894',
                              '&:hover': {
                                color: '#fff',
                                background: '#029894',
                              },
                            }}
                          >
                            {CLIENTPROFILE?.addContract}
                          </Button>
                        ) : currentTab?.label === 'Employee invoices' ||
                          currentTab?.label === 'Other invoices' ? (
                          currentTab?.nested.val === 0 ? (
                            <Button
                              onClick={handleOpenUploadInvoiceModal}
                              variant="contained"
                              sx={{
                                my: { xs: '20px', md: 0 },
                                color: '#fff',
                                background: '#029894',
                                '&:hover': {
                                  color: '#fff',
                                  background: '#029894',
                                },
                              }}
                            >
                              {CLIENTPROFILE?.uploadVoice}
                            </Button>
                          ) : null
                        ) : null}
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
                isOpen: isOpen,
                handleOpen,
                handleClose,
              })}
            </Box>
          </>
        )}
      </Box>
      <HiringRequestModal
        open={isOpenHiringRequestModal}
        onClose={handleCloseHiringRequestModal}
      />
      <AddInterviewModal
        open={isOpenAddInterviewModal}
        onClose={handleCloseAddInterviewModal}
      />
      <AddOnboardModal
        open={isOpenAddOnboardModal}
        onClose={handleCloseAddOnboardModal}
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
