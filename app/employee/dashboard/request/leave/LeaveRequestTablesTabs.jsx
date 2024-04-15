import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { employeeRequestsTabs } from '@/src/constants/data/tabs/requestTabs';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaveRequestTable from './LeaveRequestTable';
// import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterLeaveForm } from '@/src/constants/data/forms/filter-form';
import LeaveReqFilterFormModal from '@/src/components/FilterModal/leaveReqFilterForm';
import {
  fetchEmpLeaveRequestData,
  getEmpLeaveRequestDataFailed,
  getEmpLeaveRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';
import { useMutation } from '@tanstack/react-query';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';

const LeaveRequestTablesTabs = ({
  handleOpen,
  handleOpenModal,
  handleClickView,
  handleClickDelete,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state?.emp?.leaveReq);
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleClose = () => {
    setShowFilterModal(false);
    // setOpen(false);
  };

  const reformData = (dataObj) => {
    const arrayfiedData = Object.entries(dataObj);
    const refinedData = [];
    for (let i = 0; i < arrayfiedData.length; i++) {
      const element = arrayfiedData[i];
      if (i > 0) {
        refinedData.push({
          leave_type: element[0],
          pending: +element[1].total - +element[1].balance,
          available: +element[1].total - +element[1].balance,
          ...element[1],
        });
      }
    }
    return refinedData;
  };
  const refreshMutation = useMutation({
    mutationFn: async () => {
      dispatch(fetchEmpLeaveRequestData());
      return api.getData(
        `${EMP_LEAVE_REQUEST}/?workspace=${workSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      dispatch(
        getEmpLeaveRequestDataSuccess({
          ...data,
          balance: reformData(data?.balance),
        })
      );
      return data;
    },
    onError: (err) => {
      dispatch(getEmpLeaveRequestDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleChangeCurrReqStatusTab = (event, newValue, data) => {
    let tab = event?.target?.innerText;
    if (tab.includes('\n\n')) {
      tab = tab.split('\n\n')[1];
    } else if (!isNaN(+tab)) {
      tab = data[newValue]?.label;
    }
    setcurrentReqStatusTab(tab);
    setcurrentReqStatusTabVal(newValue);
  };
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };

  if (isLoading) return <Typography sx={{ mt: 3 }}>Loading...</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          marginTop: '20px',
          marginBottom: '30px',
          borderBottom: 'solid 1px #ccc',
        }}
      >
        <CustomTabPanel value={0} index={0} key={0}>
          <Box
            sx={{
              maxWidth: '1480px',
              overflowX: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                width: '800px',
              }}
            >
              <Tabs
                variant="scrollable"
                value={currentReqStatusTabVal}
                onChange={(ev, newVal) =>
                  handleChangeCurrReqStatusTab(ev, newVal, employeeRequestsTabs)
                }
                aria-label="basic tabs example"
              >
                {employeeRequestsTabs?.map(
                  ({ label, prop, background, color, name }, index) => {
                    return (
                      <Tab
                        key={index}
                        disableRipple={true}
                        sx={{
                          p: 0,
                          mr: index == 0 ? '20px' : '40px',
                        }}
                        label={
                          <Box display={'flex'} alignItems={'center'}>
                            <Box
                              sx={{
                                ml: index == 0 ? -3 : 0,
                                width: 30,
                                height: 30,
                                background,
                                borderRadius: '5px',
                                marginRight: '10px',
                                color,
                                fontSize: '14px',
                                fontWeight: 600,
                                lineHeight: '19px',
                                letterSpacing: '0em',
                                textAlign: 'left',
                              }}
                              display={'flex'}
                              justifyContent={'center'}
                              alignItems={'center'}
                            >
                              {
                                // filterTableRowsWRTTab(
                                //   employeeLeaveRequestsData,
                                //   {
                                //     status: label === 'All' ? '' : label,
                                //   }
                                // ).length
                                data?.[name]
                              }
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                color: label === currentReqStatusTab && color,
                              }}
                            >
                              {label}
                            </Typography>
                          </Box>
                        }
                        {...prop}
                      />
                    );
                  }
                )}
              </Tabs>
            </Box>
            <Box
              maxWidth={'auto'}
              display={'flex'}
              alignItems={'center'}
              sx={{
                pb: 0.8,
              }}
            >
              <Button
                sx={{
                  marginX: '10px',
                  minWidth: '120px',
                  border: '1px solid #138A72',
                  color: '#138A72',
                  '&:hover:': {
                    background: '#fff',
                  },
                }}
                onClick={() => refreshMutation.mutate()}
                startIcon={
                  <Image
                    width={20}
                    height={22}
                    alt="Refresh"
                    src={`/icons/Refresh.svg`}
                  />
                }
              >
                {REQUEST_LEAVE?.refresh}
              </Button>
              <Button
                sx={{
                  minWidth: '120px',
                  background: '#138A72',
                  color: '#fff',
                  '&:hover': {
                    background: '#138A72',
                  },
                }}
                onClick={handleOpenFilterModal}
                startIcon={
                  <Image
                    width={18}
                    height={15}
                    alt="Refresh"
                    src={`/icons/Filter.svg`}
                    onClick={handleOpenFilterModal}
                  />
                }
              >
                {REQUEST_LEAVE?.filter}
              </Button>
            </Box>
          </Box>
          {showFilterModal && (
            <LeaveReqFilterFormModal
              open={handleOpenFilterModal}
              onClose={handleClose}
              leaveType
              filterForm={filterLeaveForm}
            />
          )}
        </CustomTabPanel>
      </Box>
      <LeaveRequestTable
        tabVal={currentReqStatusTabVal}
        tab={currentReqStatusTab}
        handleOpen={handleOpen}
        handleOpenModal={handleOpenModal}
        handleClickView={handleClickView}
        handleClickDelete={handleClickDelete}
      />
    </Box>
  );
};

export default LeaveRequestTablesTabs;
