import React from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import { contractFormHrPortalSchema } from '../form/schemas/contractSignedForm';
import { contractFormHrPortal } from '@/src/constants/data/forms/contract';
import FormInput from '../form/ui-elements/FormInput';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { useMutation } from '@tanstack/react-query';
import { addClientContract } from '@/src/redux/slices/hrSlices/contractSlice';
import { useDispatch } from 'react-redux';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { Toast } from '../Toast/Toast';

const AddContractHrPortalModal = ({
  open,
  onClose,
  contractType,
  currentTab,
  endPoint,
}) => {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      let url;
      if (currentTab === 0) {
        url = `${endPoint}?status=${contractType}`;
      } else {
        url = `${endPoint}`;
      }
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(`${url}`, formData);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data posted successfully');
      console.log({ data });
      dispatch(addClientContract(values));
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
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
    handleReset,
  } = useFormik({
    initialValues: {},
    validationSchema: contractFormHrPortalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      mutate({
        ...formValues,
        date: dayjs(formValues.date).format('YYYY-MM-DD'),
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
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', sm: '90%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: '518px',
          maxHeight: '90%',
          overflowY: 'auto',
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
            sx={{
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            {CONTRACT_SIGNED?.contractForm}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #068987',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
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
              padding: { xs: '10px 20px', md: '50px' },
            }}
          >
            {contractFormHrPortal?.map(
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
                  accept,
                },
                formIndex
              ) => (
                <>
                  <Grid item xs={12} lg={5}>
                    <FormInput
                      key={formIndex}
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
                      md={12}
                      lg={12}
                      fields={fields}
                      accept={accept}
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px', mt: '25px' }}
                variant="contained"
                type="submit"
              >
                {CONTRACT_SIGNED?.submit}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default AddContractHrPortalModal;
