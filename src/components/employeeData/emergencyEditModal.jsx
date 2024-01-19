import React from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import { formEmergencyContact } from '@/src/constants/data/forms/emergency-contacts';
import { emergencyContactsSchema } from '../form/schemas/emergencyContact';
import FormInput from '../form/ui-elements/FormInput';

const EditEmergencyModal = ({ onClose, handleEmergencyModal }) => {
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
    validationSchema: emergencyContactsSchema,
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
      open={handleEmergencyModal}
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
          width: { xs: '90%', sm: '90%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '80%',
          position: 'absolute',
          top: '10%',
          overflow: 'auto',
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
              marginLeft: '20px',
            }}
          >
            {EDIT_MODAL?.editEmergencyContacts}
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
              padding: { xs: '10px 20px', lg: '35px 70px' },
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { xs: '14px', md: '16px' },
                  fontWeight: 600,
                  paddingBottom: '35px',
                  marginLeft: '10px',
                }}
              >
                {EDIT_MODAL?.primaryContact}
              </Typography>
              {formEmergencyContact.map(
                (
                  {
                    label,
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
                    <Grid item xs={12} lg={10}>
                      <FormInput
                        key={formIndex}
                        label={label}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { xs: '14px', md: '16px' },
                  fontWeight: 600,
                  paddingBottom: '35px',
                  marginLeft: '10px',
                }}
              >
                {EDIT_MODAL?.secondaryContact}
              </Typography>

              {formEmergencyContact.map(
                (
                  {
                    label,
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
                    <Grid item xs={12} lg={10}>
                      <FormInput
                        key={formIndex}
                        label={label}
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
            </Grid>
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
      </Box>
    </Modal>
  );
};
export default EditEmergencyModal;
