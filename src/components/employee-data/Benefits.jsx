import React, { useState } from 'react';
import { Box } from '@mui/material';

import { BENEFITS_TABLECOLUMN } from '@/src/constants/employee-profile';
import AppTable from '../app-table-new/AppTable';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contract-signed';
import { useDispatch, useSelector } from 'react-redux';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HR_EMP_BENEFIT } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import {
  getEmpBenefitRequestFailed,
  getEmpBenefitRequest,
  getEmpBenefitRequestSuccess,
  deleteEmpBenefit,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '@/src/utils/toast';
import EditBenefitForm from './EditBenefitModal';
import dayjs from 'dayjs';

const Benefits = () => {
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: [
      'hr-employee-get-benefit',
      currentEmployee?.email,
      employee_perms && employee_perms?.[0],
    ],
    queryFn: async () => {
      try {
        if (!currentEmployee?.email) {
          dispatch(getEmpBenefitRequestFailed());
          return [];
        }
        dispatch(getEmpBenefitRequest());
        const { data } = await api.getData(
          `${HR_EMP_BENEFIT}?emp_email=${currentEmployee.email}`
        );
        const tempBenefits = data?.length
          ? data.map((item) => ({
              ...item,
              issue_date: dayjs(item?.issue_date)?.format('MMMM D, YYYY'),
              action: [
                role === 'super_admin' ||
                (employee_perms && employee_perms[0]?.delete)
                  ? 'Delete'
                  : null,
                role === 'super_admin' ||
                (employee_perms && employee_perms[0]?.write)
                  ? 'View'
                  : null,
              ]?.filter(Boolean),
            }))
          : [];
        dispatch(getEmpBenefitRequestSuccess(tempBenefits));
        return tempBenefits || [];
      } catch (err) {
        dispatch(getEmpBenefitRequestFailed());
        Toast('error', err.message || 'Failed to get data');
        return [];
      }
    },
  });

  const handleClickDelete = (a, b) => {
    setSelectedId(b?.id);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);
  const handleDelete = () => {
    mutate(selectedId);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_EMP_BENEFIT}?id=${id}`);
    },
    onSuccess: async () => {
      Toast('success', 'Benefit deleted successfully');
      handleClose();
      dispatch(deleteEmpBenefit(selectedId));
      await queryClient.invalidateQueries(['hr-employee-get-benefit']);
      setSelectedId(null);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });

  const handleEdit = (id) => {
    setShowEditModal(true);
    setSelectedId(id);
  };
  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  function processColumns() {
    if (role === 'super_admin') {
      return BENEFITS_TABLECOLUMN;
    }

    const hasDeletePermission = employee_perms?.[0]?.delete;
    const hasWritePermission = employee_perms?.[0]?.write;

    if (!hasDeletePermission && !hasWritePermission) {
      return BENEFITS_TABLECOLUMN?.filter((item) => item?.name !== 'action');
    }

    return BENEFITS_TABLECOLUMN;
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          mt: '35px',
        }}
      >
        <AppTable
          column={processColumns()}
          data={data || []}
          handleClickActionDelete={handleClickDelete}
          handleClickActionView={handleEdit}
          handleEditImage={'/icons/EditIcon.svg'}
          isLoading={isLoading}
        />
      </Box>
      {showEditModal && (
        <EditBenefitForm
          open={showEditModal}
          onClose={handleCloseModal}
          empData={currentEmployee}
          selectedId={selectedId}
        />
      )}
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={`Are you sure you want to delete benefit?`}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        isLoading={isPending}
      />
    </>
  );
};

export default Benefits;
