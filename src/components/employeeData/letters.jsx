import React, { useState } from 'react';
import { Box } from '@mui/material';
import { HR_EMP_LETTERS_TABLECOLUMN } from '@/src/constants/employeeProfile';
import AppTable from '../appTableNew/AppTable';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import EditLetterForm from './editLetterModal';
import { useDispatch, useSelector } from 'react-redux';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DOWNLOAD_LETTER,
  HR_EMP_LETTER,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import {
  getEmpLetterRequestFailed,
  getEmpLetterRequest,
  getEmpLetterRequestSuccess,
  deleteEmpLetter,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '../Toast/Toast';
import dayjs from 'dayjs';

const Letters = () => {
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: letters, isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-employee-get-letter', currentEmployee?.email],
    queryFn: async () => {
      dispatch(getEmpLetterRequest());
      return api
        .getData(`${HR_EMP_LETTER}?email=${currentEmployee?.email}`)
        .then(({ data }) => {
          const tempLetters =
            data === '' || !data.length
              ? []
              : data?.map((item) => ({
                  ...item,
                  download: 'Download',
                  issue_date: dayjs(item?.issue_date)?.format('MMMM D, YYYY'),
                  action: ['Delete', 'View'],
                }));
          dispatch(getEmpLetterRequestSuccess(tempLetters));
          return tempLetters || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getEmpLetterRequestFailed());
          console.log({ err });
        });
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
      return api.daleteData(`${HR_EMP_LETTER}?id=${id}`);
    },
    onSuccess: async () => {
      Toast('success', 'Letter deleted successfully');
      handleClose();
      dispatch(deleteEmpLetter(selectedId));
      setSelectedId(null);
      await queryClient.invalidateQueries(['hr-employee-get-letter']);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });

  const downloadLetterMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_LETTER}?id=${id}`);
    },
    onSuccess: async ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'letter.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
      console.log({ err });
    },
  });

  const downloadLetter = (id) => {
    downloadLetterMutation.mutate(id);
  };

  const handleEdit = (id) => {
    setShowEditModal(true);
    setSelectedId(id);
  };
  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  function processColumns() {
    if (
      role === 'super_admin' ||
      (role !== 'super_admin' && employee_perms[0].delete)
    )
      return HR_EMP_LETTERS_TABLECOLUMN;
    else {
      return HR_EMP_LETTERS_TABLECOLUMN?.filter(
        (item) => item?.name !== 'action'
      );
    }
  }

  return (
    <>
      <>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            mt: '40px',
          }}
        >
          <AppTable
            column={processColumns()}
            data={letters}
            handleClickActionDelete={handleClickDelete}
            handleClickDownload={downloadLetter}
            handleClickActionView={handleEdit}
            handleEditImage={'/icons/EditIcon.svg'}
            tableRowClass="app-table-row-letter"
            minWidth={'700px'}
            isLoading={isLoading}
          />
        </Box>
      </>
      {showEditModal && (
        <EditLetterForm
          open={showEditModal}
          onClose={handleCloseModal}
          empData={currentEmployee}
          selectedId={selectedId}
        />
      )}
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={`Are you sure you want to delete letter?`}
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

export default Letters;
