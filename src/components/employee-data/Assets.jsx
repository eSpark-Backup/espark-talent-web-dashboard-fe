import React, { useState } from 'react';
import { Box } from '@mui/material';

import { ASSET_TABLECOLUMN } from '@/src/constants/employee-profile';
import AppTable from '@/src/components/app-table-new/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contract-signed';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  HR_ADD_EMP_ASSET,
  HR_GET_EMP_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpAssetRequestFailed,
  getEmpAssetRequest,
  getEmpAssetRequestSuccess,
  deleteEmpAsset,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '@/src/utils/toast';
import dayjs from 'dayjs';
import AssetEditModal from '@/src/components/employee-data/AssetEditModal';

const Assets = ({ empData }) => {
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [editModalData, setEditModalData] = useState(null);
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [deletingAssetId, setDeletingAssetId] = useState(null);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_ADD_EMP_ASSET}?id=${id}`);
    },
    onSuccess: () => {
      handleClose();
      dispatch(deleteEmpAsset(deletingAssetId));
      Toast('success', 'Asset deleted successfully');
      setDeletingAssetId(null);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { assets } = useSelector((state) => state?.hr?.employees);
  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-employee-get-asset', params?.id, empData?.email],
    queryFn: async () => {
      dispatch(getEmpAssetRequest());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params?.id}&tab=assets`)
        .then(({ data }) => {
          const tempAssets = data?.length
            ? data?.map((item) => ({
                ...item,
                assigned_date: dayjs(item?.assigned_date)?.format(
                  'MMMM D, YYYY'
                ),
                assignee: [item?.assignee_name, item?.assignee_email],
                action: [
                  role === 'super_admin' ||
                  (employee_perms && employee_perms[0]?.delete)
                    ? 'Delete'
                    : null,
                  role === 'super_admin' ||
                  (employee_perms && employee_perms[0]?.write)
                    ? 'Edit'
                    : null,
                ]?.filter(Boolean),
              }))
            : [];
          dispatch(getEmpAssetRequestSuccess(tempAssets));
          return tempAssets || [];
        })
        .catch((err) => {
          dispatch(getEmpAssetRequestFailed());
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });

  const handleClickDelete = (a, b) => {
    setDeletingAssetId(b?.id);
    setIsOpen(true);
  };

  const handleClickEdit = ({ row }) => {
    setEditModalOpen(true);
    setEditModalData(row);
    console.log({ row }, empData?.email);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditModalOpen(false);
  };
  const handleDelete = () => {
    mutate(deletingAssetId);
  };

  function processColumns() {
    if (
      role === 'super_admin' ||
      (role !== 'super_admin' && employee_perms[0].delete)
    )
      return ASSET_TABLECOLUMN;
    else {
      return ASSET_TABLECOLUMN.filter((item) => item.name !== 'action');
    }
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          mt: '40px',
        }}
      >
        <AppTable
          minWidth={'1200px'}
          column={processColumns()}
          data={assets || []}
          handleClickActionDelete={handleClickDelete}
          handleClickActionEdit={handleClickEdit}
          isLoading={isLoading}
        />
      </Box>

      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={`Are you sure you want to delete asset?`}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        isLoading={isPending}
      />
      {editModalOpen && (
        <AssetEditModal
          open={editModalOpen}
          onClose={handleClose}
          modalData={editModalData}
          empData={empData}
        />
      )}
    </>
  );
};

export default Assets;
