import React, { forwardRef } from 'react';

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
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HR_EMP_BENEFIT } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { addEmpBenefit } from '@/src/redux/slices/hrSlices/employeeSlice';
import { useDispatch } from 'react-redux';
import { Toast } from '@/src/utils/toast';
import { benefitForm } from '@/src/data/forms/benefit-form';
import { benefitFormSchema } from '@/src/validation/benefitForm';

const BenefitForm = forwardRef(({ onClose, open, empData }, ref) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.postJSONData(`${HR_EMP_BENEFIT}`, data);
    },
    onSuccess: async ({ data }) => {
      const reformedData = {
        id: data?.id,
        action: ['Delete', 'View'],
        benefit: values.benefit,
        card_id: values.card_id,
        description: values.description,
        issue_date: dayjs(values.issue_date).format('YYYY-MM-DD'),
      };
      dispatch(addEmpBenefit(reformedData));
      await queryClient.invalidateQueries(['hr-employee-get-benefit']);
      Toast('success', 'Data posted successfully');
      onClose();
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to post data');
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
    validationSchema: benefitFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const reformedData = {
        ...formValues,
        issue_date: dayjs(formValues.issue_date).format('YYYY-MM-DD'),
        employee_id: empData?.email,
      };
      mutate(reformedData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  // Rendering the form
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
            {EDIT_MODAL?.addbenefitForm}
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
            {benefitForm?.map(
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
});
BenefitForm.displayName = 'BenefitForm';
export default BenefitForm;
