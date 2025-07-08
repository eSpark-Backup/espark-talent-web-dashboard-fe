import { addNewInterviewFormSchema } from '@/src/schemas/addNewInterviewForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Toast } from '@/src/components/Toast/Toast';
import { countriesList } from '@/src/constants/countries';
import { addNewInterviewForm } from '@/src/data/forms/add-new-interview';
import { FORM_DATA } from '@/src/constants/form';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_INTERVIEW_SCHEDULE } from '@/src/services/apiService/apiEndPoints';
import { getSelectedCountry } from '@/src/utils/salaryFormat';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

const EditInterviewModal = ({ open, onClose, existingData }) => {
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const queryClient = useQueryClient();

  const initialValues = useMemo(
    () => ({
      employee_name: existingData?.employee_name || '',
      gender: existingData?.gender || '',
      job_title: existingData?.job_title || '',
      role_type: existingData?.role_type || '',
      employment_term: existingData?.employment_term || '',
      interview_date_time: existingData?.interview_date_time
        ? dayjs(existingData?.interview_date_time)
        : '',
      country: getSelectedCountry(existingData?.country, countriesList) || {
        title: '',
        flag: '',
      },
    }),
    [existingData]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.updateData(
        `${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}?id=${existingData?.id}`,
        formVals
      );
    },
    onSuccess: ({ data }) => {
      Toast('success', `${data?.message}`);
      queryClient.invalidateQueries(['hr-interview-schedule-req-query']);
      setTimeout(() => handleCloseModal(), 0);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: addNewInterviewFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        client_id: email,
        gender:
          formValues?.gender === 'Not specific'
            ? 'nonspec'
            : formValues?.gender,
        country: formValues?.country?.title,
        interview_date_time: formValues?.interview_date_time
          ? dayjs(formValues?.interview_date_time).toISOString()
          : '',
      };
      mutate(finalData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleCloseModal = useCallback(() => {
    formik.handleReset();
    onClose();
  }, [formik, onClose]);

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="edit-interview-modal-title"
      disableScrollLock
      disableEnforceFocus
      disableRestoreFocus
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '850px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
          maxHeight: '90%',
          overflow: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
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
              fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '25px' },
              fontWeight: 600,
              mx: '10px',
            }}
          >
            Edit Interview Schedule Form
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #068987',
              borderRadius: '50%',
              width: { xs: '20px', sm: '25px' },
              height: { xs: '20px', sm: '25px' },
              cursor: 'pointer',
              p: 0.5,
            }}
            onClick={handleCloseModal}
          >
            <Box component="img" src="/icons/Close.svg" />
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            sx={{ padding: { xs: '10px 20px', lg: '41px 100px' } }}
          >
            {addNewInterviewForm?.map(
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
                  selectWithType,
                  fields,
                  searchable,
                  withFlag,
                },
                index
              ) => (
                <React.Fragment key={index}>
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
                      selectWithType={selectWithType}
                      setFieldValue={formik.setFieldValue}
                      value={formik.values[name]}
                      error={formik.errors[name]}
                      touched={formik.touched[name]}
                      setFieldError={formik.setFieldError}
                      errors={formik.errors}
                      setErrors={formik.setErrors}
                      values={formik.values}
                      searchable={searchable}
                      withFlag={withFlag}
                      countries={countriesList}
                      nested={nested}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      width="100%"
                    />
                  </Grid>
                  {index % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
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
                  FORM_DATA?.edit
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditInterviewModal;
