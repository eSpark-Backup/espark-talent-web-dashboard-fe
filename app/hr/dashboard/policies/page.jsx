'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import { POLICIES_DATA } from '@/src/constants/policies';
import PoliciesCard from '@/src/components/policies/policiesCard';
import AppTable from '@/src/components/appTable/AppTable';
import {
  leaveBalanceColumn,
  leaveBalanceData,
} from '@/src/constants/data/tables/timeOffRequest';
import {
  policyColumn,
  policyData,
} from '@/src/constants/data/tables/policyData';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { toCamelCase } from '@/src/utils/stringModification';

const Policies = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const handleClose = () => setIsOpen(false);

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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Heading
              title={'Policies'}
              description={
                'You will manage all the policies related to your company below.'
              }
              containerStyles={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            />
            <Button
              sx={{
                minWidth: '200px',
                height: '40px',
                borderColor: '#029894',
                color: 'teal',
              }}
              variant="outlined"
              type="submit"
            >
              Upload Policy
            </Button>
          </Box>
          <AppTable
            column={policyColumn}
            // data={policyData}
            data={formTableState}
            handleClickActionView={handleSelectRow}
            handleClickActionDelete={handleClickDelete}
            noPagination
          />
        </Box>
      </Grid>
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
