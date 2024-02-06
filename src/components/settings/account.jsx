import React, { useState } from 'react';
import { Box } from '@mui/material';
import AppTable from '../appTable/AppTable';
import {
  accountColumn,
  accountData,
} from '@/src/constants/data/tables/hr/account';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';

const Account = () => {
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
        data={accountData}
        handleClickActionDelete={handleClickActionDelete}
      />
      <AppConfirmationMadal
        isOpen={isOpenDeleteModal}
        title={'Delete'}
        handleClose={handleCloseDeleteModal}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
      />
    </Box>
  );
};
export default Account;
