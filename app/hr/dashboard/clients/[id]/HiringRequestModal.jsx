import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { hiringRequestSchema } from '@/src/components/form/schemas/hiringRequestForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { hringRequestForm } from '@/src/constants/data/forms/hiring-request';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_HIRING_REQUEST } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';
import { Toast } from '@/src/utils/toast';
import { addHiringRequest } from '@/src/redux/slices/hrSlices/clientSlice';
import { countriesList } from '@/src/constants/countries';
import { hasSymbol } from '@/src/utils/symbolChecker';
import { genderType } from '@/src/utils/genderType';

const HiringRequestModal = ({ open, onClose }) => {
  const { client_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const [hiringValues, setHiringValues] = useState(null);
  const { role } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const clientQuery = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.postData(`${HR_CLIENT_EMP_HIRING_REQUEST}`, formVals);
    },
    onSuccess: ({ data }) => {
      const symbol = hiringValues?.salary_range?.currency?.split(' ')[0];
      dispatch(
        addHiringRequest({
          ...hiringValues,
          salary_range: `${hiringValues?.salary_range?.minimum} ${hasSymbol(symbol) ? symbol : ''} - ${hiringValues?.salary_range?.maximum} ${hasSymbol(symbol) ? symbol : ''}`,
          id: data.id,
          gender: genderType(hiringValues?.gender),
          action: [
            role === 'super_admin' || (client_perms && client_perms[0]?.read)
              ? 'View'
              : null,
            role === 'super_admin' || (client_perms && client_perms[0]?.delete)
              ? 'Delete'
              : null,
            role === 'super_admin' || (client_perms && client_perms[0]?.write)
              ? 'Edit'
              : null,
          ]?.filter(Boolean),
        })
      );
      handleCloseModal();
      setHiringValues(null);
      Toast('success', 'Data posted successfully');
      clientQuery?.invalidateQueries(['hr-client-hiring-req-query']);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
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
      comments: '',
      hiring_end_date: null,
      hiring_start_date: null,
    },
    validationSchema: hiringRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log(formValues, 'formValues');

      const finalData = {
        ...formValues,
        description: 'ok',
        job_description: formValues?.job_description,
        gender:
          formValues?.gender == 'Not specific' ? 'nonspec' : formValues?.gender,
        hiring_start_date: dayjs(formValues.hiring_start_date).format(
          'YYYY-MM-DD'
        ),
        hiring_end_date: dayjs(formValues.hiring_end_date).format('YYYY-MM-DD'),
        client_id: email,
        salary_currency: formValues?.salary_currency,
        salary_range: JSON.stringify({
          minimum: formValues?.salary_range?.minimum,
          maximum: formValues?.salary_range?.maximum,
        }),
        country: formValues?.country?.title,
      };

      setHiringValues(finalData);
      mutate({
        ...finalData,
      });
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
            Hiring request
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
            <Box component="img" src="/icons/Close.svg" sx={{}} />
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
                  FORM_DATA?.submit
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default HiringRequestModal;
