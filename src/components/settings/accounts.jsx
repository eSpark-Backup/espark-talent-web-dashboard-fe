'use client';
import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';

import AppTable from '../appTableNew/AppTable';
import { accountColumn } from '@/src/constants/data/tables/hr/account';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contract-signed';
import CredentialModal from '../modals/credentialModal';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HR_ACCOUNTS } from '@/src/services/apiService/apiEndPoints';
import {
  deleteAccount,
  getAccountsData,
} from '@/src/redux/slices/hrSlices/settingsSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';
import EditAccountModal from '../modals/EditAccountModal';

const Accounts = ({ handleAdd }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deletingAccountId, setDeletingAccountId] = useState(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: accounts, isLoading } = useQuery({
    staleTime: 5000,
    refetchOnWindowFocus: false,
    queryKey: ['get-company-accounts'],
    queryFn: async () => {
      return api
        .getData(`${HR_ACCOUNTS}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  action: ['View', 'Edit', 'Delete'],
                }))
              : [];
          dispatch(getAccountsData(tempData));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_ACCOUNTS}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(deleteAccount(deletingAccountId));
      setDeletingAccountId(null);
      handleCloseDeleteModal?.();
      Toast('success', 'Account deleted successfully');
      queryClient?.invalidateQueries(['get-company-accounts']);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete account');
    },
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);

  const handleCrendentialModal = (id, column, row) => {
    setModalData({ row });
    setOpen(true);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenEditModal(false);
  };
  const handleClickActionDelete = (a) => {
    setDeletingAccountId(a);
    setIsOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleConfirmDeleteAccount = () => {
    mutate(deletingAccountId);
  };

  const handleClickActionEdit = ({ row }) => {
    setModalData(row);
    setOpenEditModal(true);
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
        minWidth={'1000px'}
        column={accountColumn}
        data={accounts || []}
        handleClickActionDelete={handleClickActionDelete}
        tableRowClass="app-table-row-contract"
        handleClickActionView={handleCrendentialModal}
        handleClickActionEdit={handleClickActionEdit}
        isLoading={isLoading}
      />
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
        width={'25%'}
        handleConfirm={handleConfirmDeleteAccount}
        isLoading={isPending}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        disableEnforceFocus
        disableRestoreFocus
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
      <EditAccountModal
        open={openEditModal}
        onClose={handleClose}
        modalData={modalData}
      />
    </Box>
  );
};

export default Accounts;
