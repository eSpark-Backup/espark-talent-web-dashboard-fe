import React from 'react';
import WideFormInput from '../../../../../src/components/form/ui-elements/WideFormInput';
import { createPunchRequestForm } from '@/src/constants/data/forms/create-punch-request';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { createPunchRequestSchema } from '../../../../../src/components/form/schemas/createPunchRequest';
import { useSelector } from 'react-redux';
import { api } from '@/src/services/apiService';
import { EMP_PUNCH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { pascalToSnake } from '@/src/utils/stringModification';

const PunchRequestForm = ({ handleClose }) => {
  const { punch_timings } = useSelector((state) => state?.emp?.home?.homeData);
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  // const pascalToSnake = (string) => {
  //   // Replace spaces and dots with empty strings
  //   const pascalCaseString = string.replace(/[\s.]+(?=[A-Z\s])/g, '');

  //   // Replace each uppercase letter (except the first one) with its lowercase equivalent preceded by an underscore
  //   const snakeCaseString = pascalCaseString.replace(
  //     /[A-Z]/g,
  //     (match, offset) =>
  //       offset === 0 ? match.toLowerCase() : '_' + match.toLowerCase()
  //   );

  //   return snakeCaseString.split(' ').join('_');
  // };
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      // console.log({ formValues });
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(EMP_PUNCH_REQUEST, formData);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      handleClose();
      // dispatch(login(data));
      // if (HR_ROLES.includes(data?.role)) {
      //   router.push('hr/dashboard');
      // } else if (EMPLOYEE_ROLES.includes(data?.role)) {
      //   router.push('employee/dashboard');
      // } else {
      //   router.push('client/dashboard');
      // }
    },
    onError: (err) => {
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
  } = useFormik({
    initialValues: {
      expectedCheckIn: punch_timings?.check_in,
      expectedCheckOut: punch_timings?.check_out,
    },
    validationSchema: createPunchRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      const revampFormValues = {
        date: dayjs(formValues.date).format('YYYY-MM-DD'),
        client_id: workSpace?.email,
        punch_type: pascalToSnake(formValues?.punchType),
        punch_time: dayjs(formValues?.punchTime).format('HH:mm:ss'),
        description: formValues?.description,
      };
      console.log({ revampFormValues });
      mutate(revampFormValues);
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
