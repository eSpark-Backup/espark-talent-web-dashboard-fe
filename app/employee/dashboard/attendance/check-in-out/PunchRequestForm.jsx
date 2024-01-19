import React from 'react';
import WideFormInput from '../../../../../src/components/form/ui-elements/WideFormInput';
import { createPunchRequestForm } from '@/src/constants/data/forms/create-punch-request';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { createPunchRequestSchema } from '../../../../../src/components/form/schemas/createPunchRequest';

const PunchRequestForm = ({ handleClose }) => {
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
    validationSchema: createPunchRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box
          sx={{
            padding: '28px',
          }}
        >
          {createPunchRequestForm?.map(
            (
              {
                title,
                placeholder,
                name,
                suffixIcon,
                type,
                required,
                hideSuffix,
                disabled,
                options,
              },
              formIndex
            ) => {
              return (
                <WideFormInput
                  key={formIndex}
                  title={title}
                  placeholder={placeholder}
                  suffixIcon={suffixIcon}
                  type={type}
                  required={required}
                  hideSuffix={hideSuffix}
                  disabled={disabled}
                  options={options}
                  darkBack={!(formIndex % 2)}
                  name={name}
                  setFieldValue={setFieldValue}
                  value={values[name]}
                  error={errors[name]}
                  touched={touched}
                  setFieldError={setFieldError}
                  errors={errors}
                  setErrors={setErrors}
                  values={values}
                />
              );
            }
          )}
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        sx={{ padding: '20px 40px', marginBottom: '15px' }}
      >
        <Button
          onClick={handleClose}
          sx={{
            ml: '20px',
            width: '120px',
            border: '1px solid #029894',
            background: '#FFF',
          }}
        >
          Cancel
        </Button>
        <Button
          // onClick={handleClose}
          sx={{
            ml: '20px',
            width: '120px',
            '&:hover': {
              background: '#029894',
            },
          }}
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default PunchRequestForm;
