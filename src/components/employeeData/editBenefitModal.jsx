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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HR_EMP_BENEFIT } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { editEmpBenefit } from '@/src/redux/slices/hrSlices/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '../Toast/Toast';
import { benefitForm } from '@/src/constants/data/forms/benefit-form';
import { benefitFormSchema } from '../form/schemas/benefitForm';

const EditBenefitForm = ({ onClose, open, selectedId }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { benefits } = useSelector((state) => state?.hr?.employees);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(
        `${HR_EMP_BENEFIT}?id=${selectedId?.row?.id}`,
        data
      );
    },
    onSuccess: async () => {
      Toast('success', 'Data updated successfully');
      const reformedData = {
        card_id: values.card_id,
        description: values.description,
      };
      dispatch(editEmpBenefit(reformedData));
      await queryClient.invalidateQueries(['hr-employee-get-benefit']);
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
    initialValues: {},
    validationSchema: benefitFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const { benefit, employee_id, id, issue_date, ...filteredFormValues } =
        formValues;
      console.log(benefit, employee_id, id, issue_date);
      const reformedData = {
        ...filteredFormValues,
      };
      mutate(reformedData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    const filteredBenefit = benefits?.find(
      (benefit) => benefit.id === selectedId?.row?.id
    );
    if (filteredBenefit) {
      setFieldValue('benefit', filteredBenefit.benefit);
      setFieldValue('card_id', filteredBenefit.card_id);
      setFieldValue('description', filteredBenefit.description);
      setFieldValue('issue_date', filteredBenefit.issue_date);
    }
  }, [benefits]);

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
        height: 'auto',
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
            {EDIT_MODAL?.editbenefitForm}
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
                      disabled={
                        name === 'card_id' || name === 'description'
                          ? false
                          : true
                      }
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
};
export default EditBenefitForm;
