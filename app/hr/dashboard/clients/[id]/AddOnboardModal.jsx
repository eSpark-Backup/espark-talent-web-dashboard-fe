import React, { useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import { addOnboardFormSchema } from '@/src/components/form/schemas/addOnBoardForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { addOnboardForm } from '@/src/constants/data/forms/add-onboard';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_ON_BOARDING } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';
import { Toast } from '@/src/components/Toast/Toast';
import { addOnBoard } from '@/src/redux/slices/hrSlices/clientSlice';
import { countriesList } from '@/src/constants/countries';
import { hasSymbol } from '@/src/utils/symbolChecker';

const AddOnboardModal = ({ open, onClose }) => {
  const { client_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const dispatch = useDispatch();
  const clientQuery = useQueryClient();
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [onBoardFormValues, setOnBoardFormValues] = useState(null);
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(`${HR_CLIENT_EMP_ON_BOARDING}`, formVals);
    },
    onSuccess: ({ data }) => {
      const symbol = onBoardFormValues?.salary_currency?.split(' ')[0];

      dispatch(
        addOnBoard({
          ...onBoardFormValues,
          salary: `${onBoardFormValues.salary} ${hasSymbol(symbol) ? symbol : ''}`,
          id: data.id,
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
      setOnBoardFormValues(null);
      Toast('success', 'Data posted successfully');
      clientQuery.invalidateQueries(['hr-client-on-board-req-query']);
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
    validationSchema: addOnboardFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        gender:
          formValues?.gender == 'Not specific' ? 'nonspec' : formValues?.gender,
        country: formValues?.country.title,
        joining_date: dayjs(formValues.joining_date).format('YYYY-MM-DD'),
        client_id: email,
      };
      setOnBoardFormValues(finalData);
      mutate(finalData);
      handleCloseModal();
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
      disableScrollLock
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
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
            {FORM_DATA?.onBoardingForm}
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
            {addOnboardForm?.map(
              (
                {
                  title,
                  placeholder,
                  errorText,
                  prefixIcon,
                  dollarIcon,
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
                      dollarIcon={dollarIcon}
                      type={type}
                      suffixIcon={suffixIcon}
                      options={options}
                      name={name}
                      searchable={searchable}
                      countries={countriesList}
                      selectWithType={selectWithType}
                      withFlag={withFlag}
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
              >
                {FORM_DATA?.submit}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddOnboardModal;
