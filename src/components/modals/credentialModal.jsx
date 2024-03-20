import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { CREDENTIAL_FORM } from '@/src/constants/credential';
import { credentialForm } from '@/src/constants/data/forms/add-credential';

const CredentialModal = ({ onClose, modalData }) => {
  useEffect(() => {
    console.log('modal', modalData);
  }, [modalData]);
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
    validationSchema: '',
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
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
    <Box
      sx={{
        bgcolor: '#fff',
        width: { xs: '90%', sm: '90%', md: '25%' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '90%',
        overflowY: 'auto',
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
            marginLeft: '8px',
          }}
        >
          {CREDENTIAL_FORM?.Credentials}
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
            marginRight: '8px',
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
            padding: { xs: '10px 20px', lg: '41px 100px' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {credentialForm?.map(
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
                suffixIconInside,
              },
              formIndex
            ) => (
              <>
                <Grid item xs={12} lg={12}>
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
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    fields={fields}
                    suffixIconInside={suffixIconInside}
                    readOnly={true}
                  />
                </Grid>
                {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
              </>
            )
          )}
          <Grid item p={'0 10px'} xs={12}>
            <Button
              sx={{ minWidth: '120px', fontSize: '16px' }}
              variant="contained"
              type="submit"
            >
              {CREDENTIAL_FORM?.done}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CredentialModal;
