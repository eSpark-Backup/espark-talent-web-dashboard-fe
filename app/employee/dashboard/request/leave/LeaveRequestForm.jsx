import React, { useEffect } from 'react';
import WideFormInput from '../../../../../src/components/form/ui-elements/WideFormInput';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { createLeaveRequestForm } from '@/src/constants/data/forms/create-leave-request';
import { createLeaveRequestSchema } from '@/src/components/form/schemas/createLeaveRequest';
import { useMutation } from '@tanstack/react-query';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { pascalToSnake } from '@/src/utils/stringModification';
import {
  createEmpLeaveRequest,
  createEmpLeaveRequestFailed,
  createEmpLeaveRequestSuccess,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';
import { generateUniqueString } from '@/src/utils/helpers';

const LeaveRequestForm = ({ handleClose, handleData }) => {
  const dispatch = useDispatch();
  const { workSpace, empDetails } = useSelector(
    (state) => state?.auth?.userData
  );
  const { balance } = useSelector((state) => state?.emp?.leaveReq?.data);
  const getRevampedValues = (vals) => ({
    employee_id: empDetails?.employee_id,
    employee_name: empDetails?.employee_name,
    department: empDetails?.department,
    leave_type: vals?.leaveType?.label.split(' ')[0].toLowerCase(),
    requested_at: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    count: vals?.count + 1,
    status: 'pending',
    start_date: dayjs(vals?.punchTime).format('YYYY-MM-DD'),
    end_date: dayjs(vals?.punchTime).format('YYYY-MM-DD'),
    reason: vals?.reason,
  });
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      dispatch(createEmpLeaveRequest());
      // console.log({ formValues });
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(EMP_LEAVE_REQUEST, formData);
    },
    onSuccess: (data) => {
      console.log({ data });
      dispatch(
        createEmpLeaveRequestSuccess({
          ...getRevampedValues(values),
          id: generateUniqueString(),
        })
      );
      handleClose();
    },
    onError: (err) => {
      dispatch(createEmpLeaveRequestFailed());
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
      // availableLeaves: getAvailableLeaves(values?.leaveType),
    },
    validationSchema: createLeaveRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const revampFormValues = {
        client_id: workSpace?.email,
        leave_type: formValues?.leaveType?.label.split(' ')[0].toLowerCase(),
        start_date: dayjs(formValues?.punchTime).format('YYYY-MM-DD'),
        end_date: dayjs(formValues?.punchTime).format('YYYY-MM-DD'),
        reason: formValues?.reason,
        attachment: formValues?.attachment,
        count: formValues?.count + 1,
      };
      console.log({ formValues, revampFormValues });
      mutate(revampFormValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  console.log({ values, errors });
  const getAvailableLeaves = (type) => {
    if (balance?.length) {
      const leavedata = balance.find((el) =>
        el.leave_type.includes(pascalToSnake(type))
      );
      return leavedata?.total;
    }
  };
  useEffect(() => {
    if (values?.leaveType?.label) {
      setFieldValue(
        'availableLeaves',
        getAvailableLeaves(values.leaveType.label)
      );
    }
  }, [values.leaveType]);

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box
          sx={{
            padding: '28px',
          }}
        >
          {createLeaveRequestForm?.map(
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
                  minDate={minDate}
                  searchable={searchable}
                  handleData={handleData}
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

export default LeaveRequestForm;
