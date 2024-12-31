import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import FormInput from '../form/ui-elements/FormInput';
import { salaryEditFormSchema } from '../form/schemas/salaryForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HR_EMP_SALARY } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { editEmpSalary } from '@/src/redux/slices/hrSlices/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '../Toast/Toast';
import { salaryForm } from '@/src/constants/data/forms/salary-form';

const EditSalaryForm = ({ onClose, open, selectedId }) => {
  const dispatch = useDispatch();
  const clientQuery = useQueryClient();
  const { salary } = useSelector((state) => state?.hr?.employees);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.updateData(`${HR_EMP_SALARY}?id=${data?.id}`, data);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data updated successfully');
      console.log({ data, values });
      const reformedData = {
        ...values,
        id: selectedId?.row?.id,
        date: dayjs(values?.date)?.format('YYYY-MM-DD'),
        action: ['Delete', 'View'],
      };
      dispatch(editEmpSalary(reformedData));
      clientQuery?.invalidateQueries(['hr-employee-get-salary']);
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
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
    initialValues: {},
    validationSchema: salaryEditFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const reformedData = {
        ...formValues,
        id: selectedId?.row?.id,
        date: dayjs(values?.date)?.format('YYYY-MM-DD'),
      };
      mutate(reformedData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    const filteredSalary = salary?.find(
      (salary) => salary?.id === selectedId?.row?.id
    );
    if (filteredSalary) {
      setFieldValue('job_status', filteredSalary?.job_status);
      setFieldValue('gross_salary', filteredSalary?.gross_salary);
      setFieldValue('tax_deduction', filteredSalary?.tax_deduction);
      setFieldValue('net_salary', filteredSalary?.net_salary);
      setFieldValue('email', filteredSalary?.email);
      setFieldValue('date', filteredSalary?.date);
      setFieldValue('pay_slip', filteredSalary?.pay_slip);
    }
  }, [salary]);

  useEffect(() => {
    const { gross_salary, tax_deduction } = values || {};
    const calculatedNetSalary =
      gross_salary - (gross_salary * tax_deduction) / 100;
    setFieldValue('net_salary', calculatedNetSalary);
  }, [values]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
                <>
                  <Grid item xs={12} lg={5} key={formIndex}>
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
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
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
