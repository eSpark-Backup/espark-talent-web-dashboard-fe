import React, { useEffect, useState } from 'react';
import { Box, Modal, Tab, Tabs } from '@mui/material';

import {
  timeSheetTableColumn,
  timeSheetTableData,
} from '@/src/constants/data/tables/timeSheet';
import AttendanceViewModal from '@/app/employee/dashboard/attendance/time-sheet/AttendanceViewModal';
import { employeeProfileData } from '@/src/constants/employeeProfile';
import AppTable from '../appTable/AppTable';
import { a11yProps } from '@/src/utils/tabs';

const AttendanceReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});
  const [currentTab, setCurrentTab] = useState({
    label: 'Time',
    val: 0,
  });
  const tabs = [
    {
      prop: a11yProps(0),
      label: 'Client A',
    },
    {
      prop: a11yProps(1),
      label: 'Client B',
    },
    {
      prop: a11yProps(1),
      label: 'Client C',
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const handleAttendanceModal = (props) => {
    const { item, row } = props;
    setModalData({ item, ...row });
    setOpen(true);
  };
  const handleChangeTab = (event, newValue) => {
    setCurrentTab({
      label: tabs[newValue].label,
      val: newValue,
    });
  };
  return (
    <>
      {isLoading ? (
        <Box>{employeeProfileData?.loading}</Box>
      ) : (
        <>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <Tabs
              value={currentTab.val}
              onChange={(ev, newVal) => {
                handleChangeTab(ev, newVal);
              }}
              aria-label="basic tabs example"
              variant="scrollable"
              sx={{
                marginBottom: '20px',
              }}
            >
              {tabs?.map(({ label, prop }, tabIndex) => (
                <Tab
                  key={tabIndex}
                  label={`${label}`}
                  {...prop}
                  disableRipple={true}
                />
              ))}
            </Tabs>
            <AppTable
              column={timeSheetTableColumn}
              data={timeSheetTableData}
              handleClickActionView={handleAttendanceModal}
            />
          </Box>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-aos="fade-down"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AttendanceViewModal modalData={modalData} handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default AttendanceReport;
