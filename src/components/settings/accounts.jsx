import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';

import AppTable from '../appTableNew/AppTable';
import { accountColumn } from '@/src/constants/data/tables/hr/account';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import CredentialModal from '../modals/credentialModal';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { HR_ACCOUNTS } from '@/src/services/apiService/apiEndPoints';
import { getAccountsData } from '@/src/redux/slices/hrSlices/settingsSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';

const Accounts = ({
  // accountDataState,
  handleAdd,
}) => {
  const { accounts } = useSelector((state) => state?.hr?.settings);
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['get-company-accounts'],
    queryFn: async () => {
      return api
        .getData(`${HR_ACCOUNTS}`)
        .then(({ data }) => {
          const tempData = data.length
            ? data?.map((item) => ({
                ...item,
                action: ['Delete', 'View'],
                pic: '/images/users/Bilal.svg',
              }))
            : [];
          dispatch(getAccountsData(tempData || []));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
          console.log({ isLoading });
        });
    },
  });
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
        data={accounts}
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
        width={'25%'}
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
