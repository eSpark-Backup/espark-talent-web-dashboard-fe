import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import { EDIT_MODAL } from '@/src/constants/employee-profile';
import FormInput from '../form/ui-elements/FormInput';
import { salaryEditFormSchema } from '../form/schemas/salaryForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HR_EMP_SALARY } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { editEmpSalary } from '@/src/redux/slices/hrSlices/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/utils/toast';
import { salaryForm } from '@/src/constants/data/forms/salary-form';

const EditSalaryForm = ({ onClose, open, selectedId }) => {
  const dispatch = useDispatch();
  const clientQuery = useQueryClient();
  const { salary } = useSelector((state) => state?.hr?.employees);

  const initialValues = useMemo(() => {
    if (!selectedId) {
      return {
        job_status: '',
        gross_salary: '',
        tax_deduction: '',
        net_salary: '',
        email: '',
        date: '',
        pay_slip: '',
      };
    }

    const record = salary?.find((s) => s.id === selectedId) || {};

    return {
      job_status: record.job_status || '',
      gross_salary: record.gross_salary || '',
      tax_deduction: record.tax_deduction || '',
      net_salary: record.net_salary || '',
      email: record.email || '',
      date: record.date || '',
      pay_slip: record.pay_slip || '',
    };
  }, [salary, selectedId]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.updateData(`${HR_EMP_SALARY}?id=${data?.id}`, data);
    },
    onSuccess: () => {
      const reformedData = {
        ...values,
        id: selectedId,
        date: dayjs(values?.date)?.format('YYYY-MM-DD'),
        action: ['Delete', 'View'],
      };
      dispatch(editEmpSalary(reformedData));
      clientQuery?.invalidateQueries(['hr-employee-get-salary']);
      Toast('success', 'Data updated successfully');
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
    },
  });

  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: salaryEditFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const reformedData = {
        ...formValues,
        id: selectedId,
        date: dayjs(formValues?.date)?.format('YYYY-MM-DD'),
      };

      if (!formValues?.pay_slip) {
        delete reformedData.pay_slip;
      }

      mutate(reformedData);
    },

    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    const gross = Number(values.gross_salary);
    const tax = Number(values.tax_deduction);

    if (!isNaN(gross) && !isNaN(tax)) {
      const calculatedNetSalary = gross - (gross * tax) / 100;

      if (calculatedNetSalary !== Number(values.net_salary)) {
        setFieldValue('net_salary', String(calculatedNetSalary), false);
      }
    }
  }, [
    values.gross_salary,
    values.tax_deduction,
    setFieldValue,
    values.net_salary,
  ]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
      disableEnforceFocus
      disableRestoreFocus
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '850px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90%',
          overflow: 'auto',
          scrollbarWidth: 'none',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '@media (min-width: 900px) and (max-width: 1440px)': {
            width: '70%',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
              marginLeft: '20px',
            }}
          >
            {EDIT_MODAL?.editsalaryForm}
          </Typography>
          <Box
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 60px' },
            }}
          >
            {salaryForm?.map(
              (
                {
                  title,
                  placeholder,
                  errorText,
                  prefixIcon,
                  type,
                  suffixIcon,
                  options,
                  name,
                  nested,
                  fields,
                },
                formIndex
              ) => (
                <React.Fragment key={formIndex}>
                  <Grid item xs={12} lg={5}>
                    <FormInput
                      title={title}
                      placeholder={placeholder}
                      errorText={errorText}
                      prefixIcon={prefixIcon}
                      type={type}
                      suffixIcon={suffixIcon}
                      options={options}
                      name={name}
                      setFieldValue={setFieldValue}
                      value={values[name]}
                      error={errors[name]}
                      touched={touched}
                      setFieldError={setFieldError}
                      errors={errors}
                      setErrors={setErrors}
                      values={values}
                      nested={nested}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      accept=".pdf"
                      isEditMode={true}
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </React.Fragment>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditSalaryForm;
