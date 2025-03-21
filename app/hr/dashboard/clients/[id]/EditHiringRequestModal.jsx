import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { editHiringRequestSchema } from '@/src/components/form/schemas/hiringRequestForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { hringRequestForm } from '@/src/constants/data/forms/hiring-request';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_HIRING_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { countriesList } from '@/src/constants/countries';
import dayjs from 'dayjs';
import { getSelectedCountry } from '@/src/utils/salaryFormat';

const EditHiringRequestModal = ({ open, onClose, existingData }) => {
  const clientQuery = useQueryClient();
  const parseSalaryRange = (salaryRange) => {
    if (!salaryRange) return { min: '', max: '' };

    // Salary range se min aur max values extract karne ke liye regex
    const matches = salaryRange.match(/([\d.]+)\s*([KMB]?)/gi);
    if (!matches || matches?.length < 2) return { min: '', max: '' };

    const multipliers = { K: 1e3, M: 1e6, B: 1e9 };

    // Min aur Max values ko extract kar ke convert karna
    const convertToNumber = (value) => {
      const match = value?.match(/([\d.]+)\s*([KMB]?)/i);
      if (!match) return 0;
      const amount = parseFloat(match[1]);
      const unit = match[2]?.toUpperCase();
      return amount * (multipliers[unit] || 1);
    };

    return {
      minimum: convertToNumber(matches[0]),
      maximum: convertToNumber(matches[1]),
    };
  };
  const salaryRangeValues = parseSalaryRange(existingData?.salary_range);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.updateData(
        `${HR_CLIENT_EMP_HIRING_REQUEST}?id=${existingData?.id}`,
        formVals
      );
    },
    onSuccess: ({ data }) => {
      Toast('success', `${data?.message}`);
      clientQuery?.invalidateQueries(['hr-client-hiring-req-query']);
      handleCloseModal();
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
    handleReset,
  } = useFormik({
    initialValues: {
      id: existingData?.id,
      job_title: existingData?.job_title,
      role_type: existingData?.role_type,
      gender: existingData?.gender,
      jobDescription: existingData?.jobDescription,
      salary_range: salaryRangeValues,
      country: getSelectedCountry(existingData?.country, countriesList) || {
        title: '',
        flag: '',
      },
      salary_currency: existingData?.salary_currency,
      employment_term: existingData?.employment_term,
      hiring_end_date: existingData?.hiring_end_date,
      hiring_start_date: existingData?.hiring_start_date,
      comments: existingData?.comments,
    },
    validationSchema: editHiringRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const temData = {
        ...formValues,
        gender:
          formValues?.gender == 'Not specific' ? 'nonspec' : formValues?.gender,
        salary_range: JSON.stringify({
          minimum: formValues?.salary_range?.minimum,
          maximum: formValues?.salary_range?.maximum,
        }),
        hiring_start_date: dayjs(formValues?.hiring_start_date).format(
          'YYYY-MM-DD'
        ),
        hiring_end_date: dayjs(formValues?.hiring_end_date).format(
          'YYYY-MM-DD'
        ),
        country: formValues?.country?.title,
      };
      mutate(temData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      disableScrollLock
      disableEnforceFocus
      disableRestoreFocus
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '1000px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflow: 'auto',
          scrollbarWidth: 'none',
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
            sx={{
              fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '25px' },
              fontWeight: 600,
              mx: '10px',
            }}
          >
            Edit hiring request form
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
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 80px' },
            }}
          >
            {hringRequestForm?.map(
              (
                {
                  title,
                  placeholder,
                  errorText,
                  prefixIcon,
                  type,
                  suffixIcon,
                  selectWithType,
                  options,
                  name,
                  nested,
                  fields,
                  searchable,
                  withFlag,
                },
                formIndex
              ) => (
                <React.Fragment key={formIndex}>
                  <Grid item xs={12} lg={5}>
                    <FormInput
                      width={'100%'}
                      title={title}
                      placeholder={placeholder}
                      errorText={errorText}
                      prefixIcon={prefixIcon}
                      type={type}
                      suffixIcon={suffixIcon}
                      options={options}
                      name={name}
                      searchable={searchable}
                      countries={countriesList}
                      withFlag={withFlag}
                      selectWithType={selectWithType}
                      setFieldValue={setFieldValue}
                      value={values[name]}
                      error={errors[name]}
                      accept=".pdf"
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

export default EditHiringRequestModal;
