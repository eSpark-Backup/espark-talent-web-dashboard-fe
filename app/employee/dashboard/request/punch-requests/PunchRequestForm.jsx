import React, { useState } from 'react';
import WideFormInput from '../../../../../src/components/form/ui-elements/WideFormInput';
import { createPunchRequestForm } from '@/src/constants/data/forms/create-punch-request';
import { Box, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { createPunchRequestSchema } from '../../../../../src/components/form/schemas/createPunchRequest';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/src/services/apiService';
import { EMP_PUNCH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { pascalToSnake } from '@/src/utils/stringModification';
import { Toast } from '@/src/components/Toast/Toast';
import { createEmpPunchRequestSuccess } from '@/src/redux/slices/employeeSlices/punchRequestSlice';

const PunchRequestForm = ({ handleClose }) => {
  const [punchReqFormData, setPunchReqFormData] = useState(null);
  const { punch_timings } = useSelector((state) => state?.emp?.home?.homeData);
  const { empDetails } = useSelector((state) => state?.auth?.userData);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);

  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData?.append(key, formVals[key]);
      }
      return api.postData(EMP_PUNCH_REQUEST, formData);
    },
    onSuccess: ({ data }) => {
      handleClose();
      dispatch(
        createEmpPunchRequestSuccess({
          ...punchReqFormData,
          actionTimeOffReqStatus: true,
          actionStatus: true,
          action: ['Delete', 'View'],
          status: 'pending',
          employee_name: empDetails?.employee_name,
          id: data.id,
        })
      );
      Toast('success', 'Data posted successfully');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
    },
  });
  const preetyTime = (time) => {
    if (dayjs(time).format('hh:mm A') === 'Invalid Date') {
      return time;
    } else {
      return dayjs(time).format('hh:mm A');
    }
  };

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
      expectedCheckIn: preetyTime(punch_timings?.check_in),
      expectedCheckOut: preetyTime(punch_timings?.check_out),
    },
    validationSchema: createPunchRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const revampFormValues = {
        date: dayjs(formValues.date).format('YYYY-MMMM-DD'),
        client_id: currentWorkSpace?.email,
        punch_type: pascalToSnake(formValues?.punchType),
        punch_time: dayjs(formValues?.punchTime).format('hh:mm:ss A'),
        description: formValues?.description,
      };
      setPunchReqFormData(revampFormValues);
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
            padding: { xs: '15px', sm: '26px', md: '28px' },
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
                maxDate,
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
                  maxDate={maxDate}
                />
              );
            }
          )}
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        sx={{
          padding: '20px 40px',
          marginBottom: '15px',
          justifyContent: { xs: 'center', sm: 'flex-end' },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            width: '120px',
            border: '1px solid #029894',
            background: '#FFF',
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            ml: '20px',
            width: '120px',
            '&:hover': {
              background: '#029894',
            },
          }}
          variant="contained"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={26} color="secondary" />
          ) : (
            'Save'
          )}
        </Button>
      </Box>
    </form>
  );
};

export default PunchRequestForm;
