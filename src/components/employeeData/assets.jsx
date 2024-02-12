import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import {
  ASSET_TABLECOLUMN,
  ASSET_TABLEDATA,
  employeeProfileData,
} from '@/src/constants/employeeProfile';
import AppTable from '../appTable/AppTable';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';

const Assets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const handleClickDelete = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
              column={ASSET_TABLECOLUMN}
              data={ASSET_TABLEDATA}
              handleClickActionDelete={handleClickDelete}
            />
          </Box>
        </>
      )}
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default Assets;
