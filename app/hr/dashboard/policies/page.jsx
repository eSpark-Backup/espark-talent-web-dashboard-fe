'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import AppTable from '@/src/components/appTable/AppTable';
import {
  policyColumn,
  policyData,
} from '@/src/constants/data/tables/policyData';
import { toCamelCase } from '@/src/utils/stringModification';
import UploadPolicyModal from '@/src/components/modals/uploadPolicyModal';
import { POLICIES_DATA } from '@/src/constants/policies';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';

const Policies = () => {
  const [openUploadPolicy, setOpenUploadPolicy] = useState(false);
  const [formTableState, setFormTableState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setFormTableState([...policyData]);
  }, [policyData]);
  const handleSelectRow = (employeeId, column) => {
    const tempForm = [...policyData];
    const employeeIndex = tempForm.findIndex((el) => el.id === employeeId);
    const targetObject = {
      ...tempForm[employeeIndex],
    };
    targetObject[[toCamelCase(column)]][2] =
      !targetObject[[toCamelCase(column)]][2];
    tempForm[employeeIndex] = targetObject;
    setFormTableState(tempForm);
  };
  const handleClickDelete = () => {
    setIsOpen(true);
    console.log('kkk');
  };
  const handleOpenModal = () => {
    setOpenUploadPolicy(true);
  };
  const handleClose = () => {
    setOpenUploadPolicy(false);
    setIsOpen(false);
  };
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '10px',
            gap: '80px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ display: 'flex', mx: 'auto' }}>
              <Heading
                title={POLICIES_DATA?.policy}
                description={POLICIES_DATA?.companyPolicy}
                containerStyles={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'flex-start', md: 'center' },
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  minWidth: '200px',
                  height: '40px',
                  borderColor: '#029894',
                  color: 'teal',
                  '&:hover': {
                    background: '#fff',
                    color: 'teal',
                  },
                  marginTop: { xs: '20px', md: '0px' },
                }}
                variant="outlined"
                onClick={handleOpenModal}
              >
                {POLICIES_DATA?.uploadPolicy}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <AppTable
              column={policyColumn}
              data={formTableState}
              handleClickActionView={handleSelectRow}
              handleClickActionDelete={handleClickDelete}
              noPagination
            />
          </Box>
        </Box>
      </Grid>
      {openUploadPolicy && (
        <UploadPolicyModal open={handleOpenModal} onClose={handleClose} />
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
export default Policies;
