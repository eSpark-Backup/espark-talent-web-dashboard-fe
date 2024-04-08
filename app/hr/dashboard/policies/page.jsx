'use client';
import React, { useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import AppTable from '@/src/components/appTableNew/AppTable';
import {
  policyColumn,
  // policyData,
} from '@/src/constants/data/tables/policyData';
// import { toCamelCase } from '@/src/utils/stringModification';
import UploadPolicyModal from '@/src/components/modals/uploadPolicyModal';
import { POLICIES_DATA } from '@/src/constants/policies';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_POLICY } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { SETTING } from '@/src/constants/SettingHr';

const Policies = () => {
  const { isLoading, data } = useQuery({
    staleTime: 10000,
    queryKey: ['hr-policy-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_POLICY}`)
        .then(({ data }) => {
          return data || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const [openUploadPolicy, setOpenUploadPolicy] = useState(false);
  // const [formTableState, setFormTableState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   setFormTableState([...policyData]);
  // }, [policyData]);
  // const handleSelectRow = (employeeId, column) => {
  //   const tempForm = [...policyData];
  //   const employeeIndex = tempForm.findIndex(
  //     (employee) => employee.id === employeeId
  //   );
  //   const targetObject = {
  //     ...tempForm[employeeIndex],
  //   };
  //   targetObject[[toCamelCase(column)]][2] =
  //     !targetObject[[toCamelCase(column)]][2];
  //   tempForm[employeeIndex] = targetObject;
  //   setFormTableState(tempForm);
  // };
  const handleClickDelete = () => {
    setIsOpen(true);
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
                  fontSize: '16px',
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
          {isLoading ? (
            'Loading...'
          ) : (
            <Box
              sx={{
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              <AppTable
                column={policyColumn}
                data={data}
                // handleClickActionView={handleSelectRow}
                handleClickActionDelete={handleClickDelete}
                noPagination
              />
            </Box>
          )}
          <Box mt={'-80px'}>
            <Button
              sx={{
                minWidth: '120px',
                fontSize: '16px',
                backgroundColor: '#029894',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#029894',
                  color: '#fff',
                },
              }}
            >
              {SETTING?.save}
            </Button>
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
