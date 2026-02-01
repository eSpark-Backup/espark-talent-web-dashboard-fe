import React, { forwardRef } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addEmpLetter } from '@/src/redux/slices/hrSlices/employeeSlice';
import { HR_EMP_LETTER } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';
import { letterForm } from '@/src/constants/data/forms/letter-form';
import { letterFormSchema } from '../form/schemas/letterForm';
import FormInput from '../form/ui-elements/FormInput';

const LetterForm = forwardRef(({ onClose, open, empData }, ref) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      return api.postData(`${HR_EMP_LETTER}`, data);
    },
    onSuccess: async ({ data }) => {
      const reformedData = {
        ...values,
        id: data?.id,
        objective: values.objective,
        letter: values.letter,
        email: values.email,
        issue_date: dayjs(values.issue_date).format('YYYY-MM-DD'),
        reason: values.reason,
        download: values.download,
      };
      await queryClient.invalidateQueries(['hr-employee-get-letter']);
      dispatch(addEmpLetter(reformedData));
      Toast('success', data?.message || 'Letter added successfully');
      onClose();
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.message || 'Something went wrong');
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
    validationSchema: letterFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const reformedData = {
        ...formValues,
        employee_id: empData?.email,
        issue_date: dayjs(formValues.issue_date).format('YYYY-MM-DD'),
      };
      mutate(reformedData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal
      ref={ref}
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
        tabIndex={-1}
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
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
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
            sx={{ fontSize: '25px', fontWeight: 600, marginLeft: '20px' }}
          >
            Add Letter
          </Typography>
          <Box
            src="/images/leave-request/close.svg"
            component="img"
            onClick={onClose}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{ padding: { xs: '10px 20px', lg: '41px 60px' } }}
          >
            {letterForm.map(
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
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </React.Fragment>
              )
            )}
            <Grid item p="0 10px" xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
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
});
LetterForm.displayName = 'LetterForm';
export default LetterForm;
