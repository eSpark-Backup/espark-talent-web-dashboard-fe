import React from 'react';
import WideFormInput from '../../../../../src/components/form/ui-elements/WideFormInput';
import { Box, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { createWFHRequestSchema } from '@/src/components/form/schemas/createLeaveRequest';
import { useMutation } from '@tanstack/react-query';
import { EMP_WFH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  getEmpWfhRequestDataSuccess,
  fetchEmpWfhRequestData,
  getEmpWfhRequestDataFailed,
  createEmpWfhRequest,
  createEmpWfhRequestSuccess,
  createEmpWfhRequestFailed,
} from '@/src/redux/slices/employeeSlices/wfhRequestSlice';

import { Toast } from '@/src/components/Toast/Toast';
import { createWFHRequestForm } from '@/src/constants/data/forms/create-wfh-request';

const WFHRequestForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { empDetails } = useSelector((state) => state?.auth?.userData);

  const getRevampedValues = (vals) => ({
    employee_id: empDetails?.employee_id,
    employee_name: empDetails?.employee_name,
    department: empDetails?.job_title,
    action: ['delete', 'view'],
    count: vals?.count,
    status: 'pending',
    start_date: dayjs(vals?.startDate)?.format('YYYY-MM-DD'),
    end_date: dayjs(vals?.endDate)?.format('YYYY-MM-DD'),
    reason: vals?.reason,
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      dispatch(fetchEmpWfhRequestData());
      return api.getData(`${EMP_WFH_REQUEST}`);
    },
    onSuccess: ({ data }) => {
      const tempData = {
        ...data,
        requests: data?.requests?.length
          ? data?.requests?.map((item) => ({
              ...item,
            }))
          : [],
      };
      dispatch(getEmpWfhRequestDataSuccess(tempData));
      return data;
    },
    onError: (err) => {
      console.log(err.message, 'error invoked');
      dispatch(getEmpWfhRequestDataFailed());
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      dispatch(createEmpWfhRequest());
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(EMP_WFH_REQUEST, formData);
    },
    onSuccess: (data) => {
      Toast('success', 'Data posted successfully');
      dispatch(
        createEmpWfhRequestSuccess({
          ...getRevampedValues(values),
          id: data.id,
        })
      );
      handleClose();
      refreshMutation.mutate();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      dispatch(createEmpWfhRequestFailed());
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
    initialValues: {},
    validationSchema: createWFHRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const revampFormValues = {
        start_date: dayjs(formValues?.startDate).format('YYYY-MM-DD'),
        end_date: dayjs(formValues?.endDate).format('YYYY-MM-DD'),
        reason: formValues?.reason,
        count: formValues?.count,
      };
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
            padding: { xs: '20px', sm: '26px', md: '28px' },
          }}
        >
          {createWFHRequestForm?.map(
            (
              {
                title,
                placeholder,
                name,
                suffixIcon,
                type,
                required,
                hideSuffix,
                minDate,
                searchable,
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
                  minDate={minDate}
                  searchable={searchable}
                />
              );
            }
          )}
        </Box>
      </Box>
      <Box
        display={'flex'}
        sx={{
          padding: '20px 40px',
          marginBottom: '15px',
          justifyContent: { xs: 'center', sm: 'flex-end' },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            ml: { xs: 0, sm: '20px' },
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

export default WFHRequestForm;
