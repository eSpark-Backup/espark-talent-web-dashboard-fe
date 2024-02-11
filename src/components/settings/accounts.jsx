import React, { useState } from 'react';
import { Box } from '@mui/material';

import AppTable from '../appTable/AppTable';
import { accountColumn } from '@/src/constants/data/tables/hr/account';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';

const Accounts = ({ accountDataState }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
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
      />
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
    </Box>
  );
};
export default Accounts;
