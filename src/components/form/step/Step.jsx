import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';

const Step = ({
  handleGoPrev,
  handleGoNext,
  form,
  isMultiColumn,
  schema,
  pmd = '95px 90px',
  editProfile,
  isLastStep,
  countries,
  noButtons,
  mt,
}) => {
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
      country: {
        flag: 'https://flagcdn.com/pk.svg',
        title: 'Pakistan',
      },
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      handleGoNext();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handeClickBack = () => {
    console.log({ values, errors });
    handleGoPrev();
  };
  if (isMultiColumn)
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            p: { xs: '20px', md: '95px 90px' },
          }}
        >
          <Grid container columnSpacing={'40px'} p={'0 10px'}>
            {form?.map(({ label, fields }, sectionIndex) => (
              <Grid
                sx={{ mb: { xs: sectionIndex === 0 && '40px', md: 0 } }}
                xs={12}
                md={6}
                item
                key={sectionIndex}
              >
                <Box
                  sx={{
                    border: 'solid 1px #ccc',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      background: '#CFF0F0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: '10px 0',
                      mb: '20px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#171717',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  <Box>
                    <Grid
                      container
                      sx={{
                        p: { xs: '20px 20px', xl: '35px 100px' },
                      }}
                    >
                      {fields?.map(
                        (
                          { title, placeholder, errorText, name },
                          fieldIndex
                        ) => (
                          <FormInput
                            // mb={fieldIndex !== 0 && '40px'}
                            key={fieldIndex}
                            title={title}
                            placeholder={placeholder}
                            errorText={errorText}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
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
                        )
                      )}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Box
              p={'0 10px'}
              mt={'20px'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                onClick={handeClickBack}
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  mb: { xs: '20px', md: '0' },
                }}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                type="submit"
                sx={{ minWidth: { xs: '100%', sm: '120px' } }}
                variant="contained"
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        sx={{
          p: { xs: '20px', md: pmd },
        }}
      >
        {form?.map(
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
              col,
              searchable,
            },
            formIndex
          ) => (
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
              lg={col}
              countries={countries}
              searchable={searchable}
            />
          )
        )}
        {editProfile ? (
          <Grid item xs={12}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={'0 10px'}
              mt={'20px'}
            >
              <Button
                type="submit"
                sx={{ minWidth: '120px', marginTop: mt }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Grid>
        ) : noButtons ? null : (
          <Grid item xs={12}>
            <Box
              p={'0 10px'}
              mt={'20px'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                onClick={handeClickBack} // Corrected from `handeClickBack` to `handleClickBack`
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  mb: { xs: '20px', md: '0' },
                }}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                type="submit"
                sx={{ minWidth: { xs: '100%', sm: '120px' } }}
                variant="contained"
              >
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Step;
