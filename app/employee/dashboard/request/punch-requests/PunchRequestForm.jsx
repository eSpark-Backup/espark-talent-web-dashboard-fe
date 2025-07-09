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
import { Toast } from '@/src/utils/toast';
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
      punch_time: null,
      expectedCheckIn: preetyTime(punch_timings?.check_in),
      expectedCheckOut: preetyTime(punch_timings?.check_out),
    },
    validationSchema: createPunchRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const revampFormValues = {
        date: dayjs(formValues?.date)?.format('YYYY-MM-DD'),
        client_id: currentWorkSpace?.email,
        punch_type: pascalToSnake(formValues?.punchType),
        punch_time: dayjs(formValues?.punch_time)?.format('hh:mm:ss A'),
        description: formValues?.description,
      };
      setPunchReqFormData(revampFormValues);
      mutate(revampFormValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const calculatePunchTime = (punchType, expectedCheckIn, expectedCheckOut) => {
    const currentDate = dayjs()?.startOf('day');

    if (punchType === 'Check in') {
      return currentDate
        .hour(dayjs(expectedCheckIn, 'hh:mm A')?.hour())
        .minute(dayjs(expectedCheckIn, 'hh:mm A')?.minute())
        .toDate();
    } else if (punchType === 'Check out') {
      return currentDate
        .hour(dayjs(expectedCheckOut, 'hh:mm A').hour())
        .minute(dayjs(expectedCheckOut, 'hh:mm A').minute())
        .toDate();
    }
    return null;
  };

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
                  setFieldValue={(fieldName, value) => {
                    setFieldValue(fieldName, value);
                    if (fieldName === 'punchType') {
                      const newPunchTime = calculatePunchTime(
                        value,
                        values?.expectedCheckIn,
                        values?.expectedCheckOut
                      );
                      setFieldValue('punch_time', newPunchTime);
                    }
                  }}
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
