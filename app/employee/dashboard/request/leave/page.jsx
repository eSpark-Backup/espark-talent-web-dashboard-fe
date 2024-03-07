'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import Image from 'next/image';
import LeaveRequestModal from './LeaveRequestModal';
import LeaveViewModal from '@/app/client/dashboard/team/time-off/LeaveViewModal';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import LeaveBalanceTable from './LeaveBalanceTable';
import LeaveRequestTablesTabs from './LeaveRequestTablesTabs';
import { useMutation } from '@tanstack/react-query';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch } from 'react-redux';
import {
  deleteEmpLeaveRequest,
  deleteEmpLeaveRequestSuccess,
  deleteLeaveRequestDataFailed,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteEmpLeaveRequest());
      return api.daleteData(`${EMP_LEAVE_REQUEST}/?id=${id}`);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      dispatch(deleteEmpLeaveRequestSuccess(modalData?.id));
      handleCloseDeleteModal();
      setModalData({});
    },
    onError: (err) => {
      dispatch(deleteLeaveRequestDataFailed(modalData?.id));
      handleCloseDeleteModal();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickActionView = (props) => {
    const {
      row: {
        status,
        employeeName,
        count,
        leave_type,
        start_date,
        end_date,
        reason,
      },
    } = props;
    console.log({
      // item,
      // row,
      // status,
      // count,
      // leaveType,
      // employeeName,
      ...props,
    });
    setModalData({
      status,
      employeeName,
      count,
      leave_type,
      start_date,
      end_date,
      reason,
    });
    setOpen(true);
  };
  const handleClickActionDelete = (props) => {
    setModalData({ id: props });
    setIsOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    mutate(modalData.id);
  };

  const handleOpenConditionalModal = (rowType, actionType) => {
    if (rowType === 'Pending') {
      if (actionType === 'View') {
        // render pending view modal
      } else {
        // render pending reject modal
      }
    } else if (rowType === 'Completed') {
      // render completed modal
    } else if (rowType === 'Rejected') {
      // render completed modal
    } else {
      // render cancelled modal
    }
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
          <div>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              marginBottom={'50px'}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h3">Leaves Requests</Typography>
                <Box display={'flex'} flexDirection={'column'} mt={'20px'}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      letterSpacing: '0em',
                      textAlign: 'left',
                      color: '#595959',
                    }}
                    variant="caption"
                  >
                    {REQUEST_LEAVE?.manageLeave}
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  minWidth: { xs: '100px', md: '120px' },
                  marginBottom: '25px',
                  marginX: '10px',
                  color: '#fff',
                  background: '#029894',
                  '&:hover': {
                    color: '#fff',
                    background: '#029894',
                  },
                }}
                variant="contained"
                onClick={handleOpenModal}
              >
                {REQUEST_LEAVE?.create}
              </Button>
              {openModal && (
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LeaveRequestModal handleClose={handleCloseModal} />
                </Modal>
              )}
            </Box>

            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <Box
                  sx={{
                    mb: '26px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '400',
                      lineHeight: '17px',
                      letterSpacing: '0em',
                      textAlign: 'left',
                      color: '#595959',
                    }}
                    variant="caption"
                  >
                    {REQUEST_LEAVE?.balance}
                  </Typography>
                  <Button
                    sx={{
                      mt: { xs: '20px', md: 0 },
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
                </Box>
                <LeaveBalanceTable />
              </Box>
            </Box>
          </div>
        </Box>
      </Grid>

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
          <div>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#595959',
                  }}
                >
                  {REQUEST_LEAVE?.request}
                </Typography>
              </Box>
            </Box>
            <LeaveRequestTablesTabs
              handleOpen={handleOpen}
              handleOpenModal={handleOpenConditionalModal}
              handleClickView={handleClickActionView}
              handleClickDelete={handleClickActionDelete}
              // showFilterModal={showFilterModal}
              // setShowFilterModal={setShowFilterModal}
            />
          </div>
        </Box>
      </Grid>

      {/* LeaveRequest Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-aos="fade-down"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LeaveViewModal
          modalData={modalData}
          handleClose={handleClose}
          isEmployee
        />
      </Modal>
      <AppConfirmationMadal
        isOpen={isOpenDeleteModal}
        title={'Delete'}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
      />
    </>
  );
};
export default Dashboard;
