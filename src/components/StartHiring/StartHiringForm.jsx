import React, { useEffect, useState } from 'react';

import { Box, Grid, Button, Typography } from '@mui/material';
import FormInput from '../form/ui-elements/FormInput';
import { FORM_DATA } from '@/src/constants/form';
import { useFormik } from 'formik';
import { HiringForm } from '@/src/constants/data/forms/start-hiring';
import { fetchCountriesList } from '@/src/utils/countryList';
import { hiringFormSchema } from '../form/schemas/hiringForm';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import { api } from '@/src/services/apiService';
import { CLIENT_START_HIRING } from '@/src/services/apiService/apiEndPoints';
import {
  createClientHiringRequest,
  createClientHiringRequestFailed,
  createClientHiringRequestSuccess,
} from '@/src/redux/slices/clientSlices/hiringProgressSlice';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { generateUniqueString } from '@/src/utils/helpers';
import dayjs from 'dayjs';

const StartHiringForm = () => {
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
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
      country: {
        flag: 'https://flagcdn.com/pk.svg',
        title: 'Pakistan',
      },
    },
    validationSchema: hiringFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      // const formVals
      const revampFormValues = {
        job_title: formValues?.jobTitle,
        role_type: formValues?.roleType,
        gender: formValues?.gender,
        employment_term: formValues?.employmentTerm,
        salary_range: {
          minimum: formValues?.salaryRange?.min,
          maximum: formValues?.salaryRange?.max,
        },
        country: formValues?.country?.title,
        hiring_start_date: dayjs(formValues?.hiringStartDate).format(
          'YYYY-MM-DD'
        ),
        hiring_end_date: dayjs(formValues?.hiringEndDate).format('YYYY-MM-DD'),
      };

      mutate(revampFormValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const getRevampedValues = (vals) => ({
    job_title: vals?.jobTitle,
    role_type: vals?.roleType,
    gender: vals?.gender,
    employment_term: vals?.employmentTerm,
    salary_range: {
      minimum: vals?.salaryRange?.min,
      maximum: vals?.salaryRange?.max,
    },
    hiring_start_date: dayjs(vals?.hiringStartDate).format('YYYY-MM-DD'),
    hiring_end_date: dayjs(vals?.hiringEndDate).format('YYYY-MM-DD'),
  });
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      // console.log({ formVals });
      // return {
      //   data: [],
      // };
      dispatch(createClientHiringRequest());
      // const formData = new FormData();
      // for (const key in formVals) {
      //   formData.append(key, formVals[key]);
      // }
      return api.postData(CLIENT_START_HIRING, formVals);
    },
    onSuccess: ({ data }) => {
      console.log({ values, data });
      dispatch(
        createClientHiringRequestSuccess({
          ...getRevampedValues(values),
          id: generateUniqueString(),
        })
      );
    },
    onError: (err) => {
      dispatch(createClientHiringRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedCountries = await fetchCountriesList();
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <Grid item xs={12} sm={10} md={10} lg={8}>
      <Box
        sx={{
          width: '100%',
          height: { xs: 'auto', md: '900px' },
          borderRadius: '10px',
          border: '1px solid #E4E4E4',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          padding: { xs: '20px', sm: '20px', md: '20px 60px' },
          gap: '30px',

          '@media (min-width: 960px) and (max-width: 1590px)': {
            width: '120%',
          },
          '@media (min-width: 900px) and (max-width: 1440px)': {
            height: '1200px',
          },
        }}
      >
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: '#595959',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              width: '40px',
              p: '8px 0',
            }}
          >
            {HIRING_FORM_DATA?.hire}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container>
            {HiringForm.map(
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
                  searchable,
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
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      searchable={searchable}
                      countries={countries}
                    />
                  </Grid>
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12} lg={12}>
              <Button
                sx={{
                  fontSize: '16px',
                  width: '100%',
                  padding: '10px',
                  fontWeight: 400,
                  background: '#fff',
                  color: '#029E9C',
                  border: '1px solid #029E9C',
                  '&:hover': {
                    background: '#029E9C',
                    color: '#fff',
                  },
                }}
                variant="contained"
                type="submit"
              >
                {FORM_DATA?.submit}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};
export default StartHiringForm;
