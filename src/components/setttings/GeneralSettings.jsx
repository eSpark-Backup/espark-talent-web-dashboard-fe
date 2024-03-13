import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { User_Password } from '@/src/constants/profileEditData';
import { generalSettingFormSchema } from '../form/schemas/generalDetails';
import { settingForm } from '@/src/constants/data/forms/setting-form';

const GeneralSettings = () => {
  const [formData, setFormData] = useState({});
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues: {
      annualLeaves: 0,
      unpaidLeaves: 0,
      paidLeaves: 0,
      hajjLeaves: 0,
      sickLeaves: 0,
      casualLeaves: 0,
    },
    validationSchema: generalSettingFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid sx={{ marginLeft: '-7px' }}>
        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', md: '65%' },
            }}
          >
            {settingForm.map(
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
                  <Grid item xs={12} lg={6}>
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
                      md={6}
                      lg={6}
                      fields={fields}
                      handleData={handleData}
                    />
                  </Grid>
                </>
              )
            )}
          </Box>
          <Grid item p={'0 10px'} xs={12} lg={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                paddingRight: { xs: '0', md: '15px' },
                marginTop: { xs: '0px', md: '125px' },
              }}
            >
              <Button
                sx={{
                  minWidth: '120px',
                  background: '#888888',
                  color: '#fff',
                  '&:hover': {
                    background: '#888888',
                    color: '#fff',
                  },
                }}
                type="submit"
              >
                {User_Password?.buttonText}
              </Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </form>
  );
};
export default GeneralSettings;
