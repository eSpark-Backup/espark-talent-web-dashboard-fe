import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';

import AppTable from '../dashboard/appTable';
import {
  timeSheetTableColumn,
  timeSheetTableData,
} from '@/src/constants/data/tables/timeSheet';
import AttendanceViewModal from '@/app/employee/dashboard/attendance/time-sheet/AttendanceViewModal';
import { employeeProfileData } from '@/src/constants/employeeProfile';

const AttendanceReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});
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
