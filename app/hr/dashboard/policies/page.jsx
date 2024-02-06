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

const Policies = () => {
  const [openUploadPolicy, setOpenUploadPolicy] = useState(false);
  const [formTableState, setFormTableState] = useState([]);
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
  const handleClickDelete = () => setIsOpen(true);
  const handleOpenModal = () => {
    setOpenUploadPolicy(true);
  };
  const handleClose = () => {
    setOpenUploadPolicy(false);
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
          <Box sx={{ display: 'flex', justifyContent: 'center', background:"pink" }}>
            <Heading
              title={POLICIES_DATA?.policy}
              description={
               POLICIES_DATA?.companyPolicy
              }
              containerStyles={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            />
            <Box sx={{
              // marginLeft:"120px"
            }}><Button
              sx={{
                minWidth: '200px',
                height: '40px',
                borderColor: '#029894',
                  color: 'teal',
                  '&:hover': {
                    background: "#fff",
                    color:"teal"
                }
              }}
              variant="outlined"
              onClick={handleOpenModal}
            >
              {POLICIES_DATA?.uploadPolicy}
            </Button></Box>
            
          </Box>
          <AppTable
            column={policyColumn}
            data={formTableState}
            handleClickActionView={handleSelectRow}
            handleClickActionDelete={handleClickDelete}
            noPagination
          />
        </Box>
      </Grid>
      {openUploadPolicy && (
        <UploadPolicyModal open={handleOpenModal} onClose={handleClose} />
      )}
    </>
  );
};
export default Policies;
