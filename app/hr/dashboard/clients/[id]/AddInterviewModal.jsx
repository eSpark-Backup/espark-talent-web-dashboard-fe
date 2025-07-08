import { addNewInterviewFormSchema } from '@/src/schemas/addNewInterviewForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Toast } from '@/src/components/Toast/Toast';
import { countriesList } from '@/src/constants/countries';
import { addNewInterviewForm } from '@/src/data/forms/add-new-interview';
import { FORM_DATA } from '@/src/constants/form';
import { addInterviewSchedule } from '@/src/redux/slices/hrSlices/clientSlice';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_INTERVIEW_SCHEDULE } from '@/src/services/apiService/apiEndPoints';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddInterviewModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.auth?.userData);
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const [interviewFormValues, setInterviewFormValues] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}`, formVals);
    },
    onSuccess: ({ data }) => {
      dispatch(
        addInterviewSchedule({
          ...interviewFormValues,
          id: data.id,
          status: 'pending',
          action: [
            role === 'super_admin' || (client_perms && client_perms[0]?.delete)
              ? 'Delete'
              : null,
            role === 'super_admin' || (client_perms && client_perms[0]?.write)
              ? 'Edit'
              : null,
          ]?.filter(Boolean),
        })
      );
      setInterviewFormValues(null);
      handleCloseModal();
      Toast('success', 'Data posted successfully');
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
    initialValues: {},
    validationSchema: addNewInterviewFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        gender:
          formValues?.gender == 'Not specific' ? 'nonspec' : formValues?.gender,
        country: formValues?.country.title,
        interview_date_time: dayjs(
          formValues?.interview_date_time
        )?.toISOString(),
        client_id: email,
      };
      setInterviewFormValues(finalData);
      mutate(finalData);
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
          maxWidth: '850px',
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
            Interview schedule form
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
              padding: { xs: '10px 20px', lg: '41px 100px' },
            }}
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
                      selectWithType={selectWithType}
                      setFieldValue={setFieldValue}
                      value={values[name]}
                      error={errors[name]}
                      touched={touched}
                      setFieldError={setFieldError}
                      errors={errors}
                      setErrors={setErrors}
                      values={values}
                      searchable={searchable}
                      withFlag={withFlag}
                      countries={countriesList}
                      nested={nested}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      width={'100%'}
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

export default AddInterviewModal;
