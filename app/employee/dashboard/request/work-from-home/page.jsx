'use client';
import React, { useState } from 'react';
import { Grid, Box, Modal } from '@mui/material';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import { useMutation } from '@tanstack/react-query';
import { EMP_WFH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch } from 'react-redux';
import {
  deleteEmpWfhRequest,
  deleteEmpWfhRequestSuccess,
  deleteWfhRequestDataFailed,
} from '@/src/redux/slices/employeeSlices/wfhRequestSlice';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Toast } from '@/src/components/Toast/Toast';
import WFHRequestModal from './WFHRequestModal';
import WFHRequestTablesTabs from './WFHRequestTablesTabs';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteEmpWfhRequest());
      return api.daleteData(`${EMP_WFH_REQUEST}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(deleteEmpWfhRequestSuccess(modalData?.id));
      Toast('success', 'Data deleted successfully');
      handleCloseDeleteModal();
      setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deleteWfhRequestDataFailed(modalData?.id));
      handleCloseDeleteModal();
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
    setViewClicked(true);
    const {
      row: {
        id,
        status,
        employee_name,
        count,
        start_date,
        end_date,
        reason,
        employee_id,
      },
    } = props;

    setModalData({
      id,
      status,
      employee_name: employee_name,
      employee_id,
      count,
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
    setOpen(false);
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
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'center', sm: 'center', md: 'end' },
                flexDirection: { xs: 'column', sm: 'row' },
                marginBottom: '35px',
                rowGap: 1.5,
              }}
            >
              <DashboardHeading
                title={'Work From Home Requests'}
                dashboardDescription={REQUEST_LEAVE?.manageWFHrequest || ''}
              />
              {openModal && (
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  data-aos="fade-down"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WFHRequestModal
                    modalData={modalData}
                    handleClose={handleCloseModal}
                    createModal
                  />
                </Modal>
              )}
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
            <WFHRequestTablesTabs
              handleOpenCreatedModal={handleOpenModal}
              handleOpen={handleOpen}
              handleOpenModal={handleOpenConditionalModal}
              handleClickView={handleClickActionView}
              handleClickDelete={handleClickActionDelete}
              viewClicked={viewClicked}
            />
          </div>
        </Box>
      </Grid>

      {/* WFHRequest View Modal */}
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
        <WFHRequestModal
          modalData={modalData || {}}
          handleClose={handleClose}
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
        isLoading={isPending}
      />
    </>
  );
};
export default Dashboard;
