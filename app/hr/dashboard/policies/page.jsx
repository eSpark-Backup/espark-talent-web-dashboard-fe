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
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  HR_POLICY,
  HR_POLICY_EDIT,
} from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { SETTING } from '@/src/constants/SettingHr';
import {
  getPolicyData,
  updatePolicyValue,
} from '@/src/redux/slices/hrSlices/policy';
import { useDispatch, useSelector } from 'react-redux';

const Policies = () => {
  const dispatch = useDispatch();
  const { policies } = useSelector((state) => state?.hr?.policies);
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['hr-policy-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_POLICY}`)
        .then(({ data }) => {
          const tempData = data.length
            ? data.map((item) => ({
                ...item,
                action: ['Delete'],
                actionStatus: true,
                employee: ['DisabledCheck', 'EnabledCheck', item.employee],
                client: ['DisabledCheck', 'EnabledCheck', item.client],
                isSelected: false,
                isModulePermissionData: true,
                isPolicyData: true,
              }))
            : [];
          console.log({ tempData, data });
          dispatch(getPolicyData(tempData));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
          console.log({ isLoading });
        });
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      return api.updateJSONData(HR_POLICY_EDIT, formVals);
    },
    onSuccess: () => {
      Toast('success', 'Policies updates successfully');
      setIsOpenSavePolicies(false);
      handleClose?.();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const [openUploadPolicy, setOpenUploadPolicy] = useState(false);
  // const [formTableState, setFormTableState] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSavePolicies, setIsOpenSavePolicies] = useState(false);
  // useEffect(() => {
  //   setFormTableState([...policyData]);
  // }, [policyData]);
  const handleSelectRow = (id, column, row) => {
    console.log({ id, column, row });
    dispatch(
      updatePolicyValue({
        id,
        key: column.name,
        value: !row[column.name][2],
      })
    );
    // const tempForm = [...policyData];
    // const employeeIndex = tempForm.findIndex(
    //   (employee) => employee.id === employeeId
    // );
    // const targetObject = {
    //   ...tempForm[employeeIndex],
    // };
    // targetObject[[toCamelCase(column)]][2] =
    //   !targetObject[[toCamelCase(column)]][2];
    // tempForm[employeeIndex] = targetObject;
    // setFormTableState(tempForm);
  };
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
  const handleSavePolicies = () => {
    const tempData = policies.map((item) => ({
      id: item.id,
      employee: item.employee[2],
      client: item.client[2],
    }));
    mutate(tempData);
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
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <AppTable
              column={policyColumn}
              data={policies}
              handleClickActionView={handleSelectRow}
              handleClickActionDelete={handleClickDelete}
              noPagination
            />
          </Box>
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
              onClick={() => setIsOpenSavePolicies(true)}
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
      <AppConfirmationMadal
        title={'Save Policies'}
        bodyText={'Are you sure you want to update the policies?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Save'}
        isOpen={isOpenSavePolicies}
        handleClose={() => setIsOpenSavePolicies(false)}
        handleConfirm={handleSavePolicies}
      />
    </>
  );
};
export default Policies;
