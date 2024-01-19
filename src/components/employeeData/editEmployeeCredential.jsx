import React from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { formEmployeeCredential } from '@/src/constants/data/forms/employee-credential';
import { editEmployeeCredentialSchema } from '../form/schemas/employeeCredential';

const EditEmployeeCredential = ({ onClose, open }) => {
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
    validationSchema: editEmployeeCredentialSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      //   handleGoNext();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
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
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', md: '40%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          // height: { xs: '600px', md: '414px' },
          position: 'absolute',
          top: '10%',
          maxHeight: '75%',
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
            {EDIT_MODAL?.editEmployeeCredentials}
          </Typography>
          <Box
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 60px' },
            }}
          >
                         

            {formEmployeeCredential.map(
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
                <>
                  <Grid item xs={12} lg={5} >
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
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
              )
              )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', md: '40px' },
              width: '80%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '20px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.employeeId}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.id}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.currentPassword}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '11px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.enterPassword}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '20px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.newPassword}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.enternewPassword}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.confirmPassword}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.confirmPassword}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="primary"
              sx={{
                width: { xs: '100px', sm: '120px' },
                height: '40px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {EDIT_MODAL?.save}
            </Button>
          </Box>
        </Box> */}
      </Box>
    </Modal>
  );
};
export default EditEmployeeCredential;
