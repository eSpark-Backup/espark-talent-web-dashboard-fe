import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';

import AppTable from '../appTable/AppTable';
import { accountColumn } from '@/src/constants/data/tables/hr/account';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import CredentialModal from '../modals/credentialModal';

const Accounts = ({ accountDataState, handleAdd }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  const handleCrendentialModal = (rowData) => {
    setModalData(rowData);
    setOpen(true);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickActionDelete = () => {
    setIsOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  return (
    <Box
      sx={{
        maxWidth: '100%',
        overflowX: 'auto',
        marginTop: '40px',
      }}
    >
      <AppTable
        column={accountColumn}
        data={accountDataState}
        handleClickActionDelete={handleClickActionDelete}
        tableRowClass="app-table-row-contract"
        handleClickActionView={handleCrendentialModal}
      />
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CredentialModal
          modalData={modalData}
          onClose={handleClose}
          open={handleOpenModal}
          handleAdd={handleAdd}
        />
      </Modal>
    </Box>
  );
};
export default Accounts;
