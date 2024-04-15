import React from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { FILTER } from '@/src/constants/filter';
import ResetButton from './resetButton';
import { api } from '@/src/services/apiService';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import {
  getTimeSheetData,
  getTimeSheetDataFailed,
} from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { empLeaveReqfilterModalSchema } from '../form/schemas/empLeaveReqFilterModal';
import { getEmpLeaveRequestFilteredDataSuccess } from '@/src/redux/slices/employeeSlices/leaveRequestSlice';

const LeaveReqFilterFormModal = ({ open, onClose, filterForm }) => {
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: async (args) => {
      console.log({ args });
      dispatch(getTimeSheetData());
      return api.getData(
        `${EMP_LEAVE_REQUEST}?workspace=${
          workSpace?.email || ''
        }&tab=${values?.status?.toLowerCase()}&from=${args.from}&to=${args.to}`
      );
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const newData1 =
        data === '' || !data?.requests?.length
          ? []
          : data?.requests.filter((el) => {
              if (values?.leaveType) {
                // return el.leaveType.includes(values?.attendanceStatus);
                // return el.leaveType.includes(values?.attendanceStatus);
                return values?.leaveType
                  ?.toLowerCase()
                  ?.includes(el?.leave_type);
              } else return el;
            });

      console.log({
        newData1,
        values,
        data,
      });
      dispatch(
        getEmpLeaveRequestFilteredDataSuccess({
          ...data,
          requests: [...newData1],
        })
      );
    },
    onError: (err) => {
      dispatch(getTimeSheetDataFailed());
      console.log({ err });
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
    handleReset,
  } = useFormik({
    initialValues: {},
    validationSchema: empLeaveReqfilterModalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log(formValues);
      mutate({
        ...formValues,
        from: dayjs(formValues?.from).format('YYYY-MM-DD'),
        to: dayjs(formValues?.to).format('YYYY-MM-DD'),
      });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  return (
    <Modal
      data-aos="fade-left"
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '300px', sm: '330px', md: '350px' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: '93%',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '0px',
          position: 'absolute',
          right: '0px',
          '@media (min-width: 270px) and (max-width: 320px)': {
            width: '260px',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '0px',
            p: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            background: '#029E9C',
          }}
        >
          <Box
            sx={{
              width: { xs: '35px', md: '50px' },
              height: { xs: '35px', md: '50px' },
              cursor: 'pointer',
            }}
            src="/images/filter/back.svg"
            component={'img'}
            onClick={onClose}
          />
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              marginLeft: '10px',
              color: '#fff',
            }}
          >
            {FILTER?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflowY: { xs: 'auto', md: 'hidden' },
            scrollbarWidth: 'thin',
            scrollbarColor: 'green',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              py: '22px',
              px: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', md: '20px' },
              width: '100%',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container>
                {filterForm?.map(
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
                      fieldsName,

                      // searchable,
                    },
                    formIndex
                  ) => (
                    <>
                      <Grid item xs={12} lg={12}>
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
                          // searchable={searchable}
                          sm={12}
                          md={12}
                          lg={12}
                          fieldsName={fieldsName}
                        />
                      </Grid>
                    </>
                  )
                )}
                <Grid item p={'0 10px'} xs={12}>
                  <ResetButton />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default LeaveReqFilterFormModal;
