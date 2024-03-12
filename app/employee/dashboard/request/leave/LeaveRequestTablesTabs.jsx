import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { employeeRequestsTabs } from '@/src/constants/data/tabs/requestTabs';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeaveRequestTable from './LeaveRequestTable';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterLeaveForm } from '@/src/constants/data/forms/filter-form';

const LeaveRequestTablesTabs = ({
  handleOpen,
  handleOpenModal,
  handleClickView,
  handleClickDelete,
}) => {
  const { data, isLoading } = useSelector((state) => state?.emp?.leaveReq);
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleClose = () => {
    setShowFilterModal(false);
  };

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

  if (isLoading) return 'Loading...';

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          marginTop: '10px',
          marginBottom: '20px',
          borderBottom: 'solid 1px #ccc',
        }}
      >
        <CustomTabPanel value={0} index={0} key={0}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            alignItems={'center'}
            marginTop={5}
            px={'10px'}
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
                ({ label, prop, color, background, name }, index) => {
                  return (
                    <Tab
                      key={index}
                      disableRipple={true}
                      label={
                        <Box display={'flex'} alignItems={'center'}>
                          <Box
                            sx={{
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
            <Box
              display={'flex'}
              alignItems={'center'}
              sx={{
                pt: { xs: '10px', md: 0 },
                pb: '10px',
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
            <FilterFormModal
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
