import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from '../appTableNew/AppTable';
import EditSalaryForm from './editSalaryModal';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { Toast } from '../Toast/Toast';
import { api } from '@/src/services/apiService';
import {
  getEmpSalaryRequest,
  getEmpSalaryRequestSuccess,
  getEmpSalaryRequestFailed,
  deleteEmpSalary,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import {
  HR_EMP_SALARY,
  DOWNLOAD_PAYSLIP,
} from '@/src/services/apiService/apiEndPoints';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { SALARY_TABLECOLUMN } from '@/src/constants/employeeProfile';
import dayjs from 'dayjs';

const Salary = ({ timeTracking }) => {
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const { employee_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || [];
  const { role } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const QueryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: salaryData, isLoading } = useQuery({
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    queryKey: [
      'hr-employee-get-salary',
      timeTracking?.month || 'all',
      timeTracking?.year || 'all',
      currentEmployee?.email,
      employee_perms && employee_perms?.read,
    ],
    queryFn: async () => {
      dispatch(getEmpSalaryRequest());
      return api
        .getData(
          `${HR_EMP_SALARY}?month=${timeTracking?.month}&year=${timeTracking?.year}&employee_id=${currentEmployee?.email}`
        )
        .then(({ data }) => {
          const tempSalary =
            data === '' || !data.length
              ? []
              : data.map((item) => ({
                  ...item,
                  paySlip: 'Download',
                  date: dayjs(item?.date)?.format('MMMM D, YYYY'),
                  action: [
                    role === 'super_admin' ||
                    (employee_perms && employee_perms?.delete)
                      ? 'Delete'
                      : null,
                    role === 'super_admin' ||
                    (employee_perms && employee_perms?.write)
                      ? 'View'
                      : null,
                  ]?.filter(Boolean),
                }));
          dispatch(getEmpSalaryRequestSuccess(tempSalary));
          return tempSalary || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to fetch data');
          dispatch(getEmpSalaryRequestFailed());
          console.error(err);
        });
    },
  });

  const downloadSalaryMutation = useMutation({
    mutationFn: async (id) => api.downloadFile(`${DOWNLOAD_PAYSLIP}?id=${id}`),
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'salary.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => Toast('error', err.message || 'Failed to download file'),
  });

  const handleDelete = () => {
    api
      .daleteData(`${HR_EMP_SALARY}?id=${selectedId}`)
      .then(() => {
        Toast('success', 'Salary deleted successfully');
        setIsOpen(false);
        dispatch(deleteEmpSalary(selectedId));
        QueryClient.invalidateQueries(['hr-employee-get-salary']);
      })
      .catch((err) => Toast('error', err.message || 'Failed to delete salary'));
  };

  function processColumns() {
    if (role === 'super_admin') {
      return SALARY_TABLECOLUMN;
    }

    let filteredColumns = SALARY_TABLECOLUMN;

    if (!employee_perms?.download) {
      filteredColumns = filteredColumns?.filter(
        (col) => col?.name !== 'pay_slip'
      );
    }

    if (!employee_perms?.delete && !employee_perms?.write) {
      filteredColumns = filteredColumns?.filter(
        (col) => col?.name !== 'action'
      );
    }

    return filteredColumns;
  }

  return (
    <>
      <Box sx={{ maxWidth: '100%', overflowX: 'auto', mt: '40px' }}>
        <AppTable
          minWidth={'1200px'}
          column={processColumns()}
          data={salaryData}
          isLoading={isLoading}
          handleClickActionDelete={(a, b) => {
            setSelectedId(b?.id);
            setIsOpen(true);
          }}
          handleEditImage={'/icons/EditIcon.svg'}
          handleClickDownload={(id) => downloadSalaryMutation?.mutate(id)}
          handleClickActionView={(id) => {
            setShowEditModal(true);
            setSelectedId(id);
          }}
        />
      </Box>
      {showEditModal && (
        <EditSalaryForm
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          empData={currentEmployee}
          selectedId={selectedId}
        />
      )}
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText="Are you sure you want to delete this salary?"
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default Salary;
