'use client';
import React, { useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import AppTable from '@/src/components/appTableNew/AppTable';
import { policyColumn } from '@/src/constants/data/tables/policyData';
import UploadPolicyModal from '@/src/components/modals/uploadPolicyModal';
import { POLICIES_DATA } from '@/src/constants/policies';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  DOWNLOAD_POLICY,
  HR_POLICY,
  HR_POLICY_EDIT,
} from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { SETTING } from '@/src/constants/SettingHr';
import {
  getPolicyData,
  removePolicy,
  updatePolicyValue,
} from '@/src/redux/slices/hrSlices/policy';
import { useDispatch, useSelector } from 'react-redux';

const Policies = () => {
  const dispatch = useDispatch();
  const { policies_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const { policies } = useSelector((state) => state?.hr?.policies);
  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-policy-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_POLICY}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  action: [
                    'View',
                    role === 'super_admin' ||
                    (policies_perms && policies_perms[0]?.download)
                      ? 'Download'
                      : null,
                    // role === 'super_admin' ||
                    // (policies_perms && policies_perms[0]?.write)
                    //   ? 'Edit'
                    //   : null,
                    role === 'super_admin' ||
                    (policies_perms && policies_perms[0]?.delete)
                      ? 'Delete'
                      : null,
                  ]?.filter(Boolean),
                  actionStatus: true,
                  employee: ['DisabledCheck', 'EnabledCheck', item.employee],
                  client: ['DisabledCheck', 'EnabledCheck', item.client],
                  isSelected: false,
                  isModulePermissionData: true,
                  isPolicyData: true,
                }))
              : [];

          dispatch(getPolicyData(tempData));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.updateJSONData(HR_POLICY_EDIT, formVals);
    },
    onSuccess: () => {
      setIsOpenSavePolicies(false);
      Toast('success', 'Policies updates successfully');
      handleClose?.();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });
  const deletePolicyMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_POLICY}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(removePolicy(deletingPolicyId));
      Toast('success', 'Policy deleted successfully');
      setDeletingPolicyId(null);
      handleClose?.();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete policy');
    },
  });
  const [openUploadPolicy, setOpenUploadPolicy] = useState(false);
  const [deletingPolicyId, setDeletingPolicyId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSavePolicies, setIsOpenSavePolicies] = useState(false);

  const downloadPolicyMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_POLICY}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      const url = window?.URL?.createObjectURL(new Blob([data]));
      const link = document?.createElement('a');
      link.href = url;
      link?.setAttribute('download', 'policy.pdf');
      document?.body?.appendChild(link);
      link?.click();
      link?.parentNode?.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });

  const openPolicyMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_POLICY}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      const url = window?.URL?.createObjectURL(
        new Blob([data], { type: 'application/pdf' })
      );
      window?.open(url, '_blank');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });

  const handleClickActionView = (id, column, row) => {
    const row_id = id?.row?.id;
    if (column === undefined && row === undefined) {
      return openPolicyMutation?.mutate(row_id);
    } else {
      if (
        role === 'super_admin' ||
        (role !== 'super_admin' && policies_perms?.[0]?.write)
      ) {
        dispatch(
          updatePolicyValue({
            id,
            key: column?.name,
            value: !row[column?.name][2],
          })
        );
      } else {
        return false;
      }
    }
  };

  const handleClickActionDownload = (id) => {
    downloadPolicyMutation?.mutate(id);
  };
  const handleClickDelete = (id) => {
    setDeletingPolicyId(id);
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
    const tempData = policies?.map((item) => ({
      id: item.id,
      employee: item.employee[2],
      client: item.client[2],
    }));
    mutate({ data: [...tempData] });
  };
  const handleDeletePolicies = () => {
    deletePolicyMutation.mutate(deletingPolicyId);
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
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ display: 'flex', mx: { xs: 'none', md: 'auto' } }}>
              <Heading
                title={POLICIES_DATA?.policy}
                description={POLICIES_DATA?.companyPolicy}
                containerStyles={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'center' },
                  '@media (min-width: 600px) and (max-width: 901px)': {
                    display: 'flex',
                    alignItems: 'flex-start',
                  },
                  '@media (min-width: 280px) and (max-width: 600px)': {
                    display: 'flex',
                    mx: 'auto',
                  },
                }}
              />
            </Box>
            {(role === 'super_admin' ||
              (role !== 'super_admin' && policies_perms?.[0].write)) && (
              <Box>
                <Button
                  sx={{
                    minWidth: '220px',
                    height: '40px',
                    borderColor: '#029894',
                    color: 'teal',
                    fontSize: '16px',
                    '&:hover': {
                      background: '#fff',
                      color: 'teal',
                    },
                    marginTop: { xs: '20px', md: '0px' },
                    '@media (min-width: 600px) and (max-width: 900px)': {
                      display: 'flex',
                      alignItems: 'flex-start',
                    },
                    '@media (min-width: 280px) and (max-width: 600px)': {
                      display: 'flex',
                      mx: 'auto',
                    },
                  }}
                  variant="outlined"
                  onClick={handleOpenModal}
                >
                  {POLICIES_DATA?.uploadPolicy}
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <AppTable
              column={policyColumn}
              data={policies || []}
              handleClickActionView={handleClickActionView}
              handleClickActionDownload={handleClickActionDownload}
              handleClickActionDelete={handleClickDelete}
              noPagination
              isLoading={isLoading}
            />
          </Box>
          {(role === 'super_admin' ||
            (role !== 'super_admin' && policies_perms?.[0].write)) && (
            <Box
              sx={{
                mt: { xs: '-40px', md: '-85px' },
                '@media (min-width: 900px) and (max-width: 1400px)': {
                  mt: '-70px',
                },
              }}
            >
              <Button
                aria-hidden={false}
                disabled={policies?.length > 0 ? false : true}
                sx={{
                  minWidth: '120px',
                  fontSize: '16px',
                  backgroundColor:
                    policies?.length > 0 ? '#029894' : 'lightgray',
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
          )}
        </Box>
      </Grid>
      {openUploadPolicy && (
        <UploadPolicyModal open={openUploadPolicy} onClose={handleClose} />
      )}
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleDeletePolicies}
        isLoading={deletePolicyMutation.isPending}
      />
      <AppConfirmationMadal
        title={'Save Policies'}
        bodyText={'Are you sure you want to update the policies?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Save'}
        isOpen={isOpenSavePolicies}
        handleClose={() => setIsOpenSavePolicies(false)}
        handleConfirm={handleSavePolicies}
        isLoading={isPending}
      />
    </>
  );
};
export default Policies;
