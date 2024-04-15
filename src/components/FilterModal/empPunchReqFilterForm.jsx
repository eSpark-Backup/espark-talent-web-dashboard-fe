import React from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { FILTER } from '@/src/constants/filter';
import ResetButton from './resetButton';
import { api } from '@/src/services/apiService';
import { EMP_PUNCH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { empPunchReqfilterModalSchema } from '../form/schemas/empPunchReqfilterModal';
import {
  fetchEmpPunchRequestData,
  getEmpPunchRequestDataFailed,
  getEmpPunchRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/punchRequestSlice';
// import { filterModalSchema } from '../form/schemas/filterModal';

const EmpPunchReqFilterFormModal = ({ open, onClose, filterForm }) => {
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: async (args) => {
      console.log({ args });
      dispatch(fetchEmpPunchRequestData());
      return api.getData(
        `${EMP_PUNCH_REQUEST}?workspace=${
          workSpace?.email || ''
        }&tab=${args.status.toLowerCase()}&from=${args.from}&to=${args.to}`
      );
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      dispatch(
        getEmpPunchRequestDataSuccess(
          data || {
            requests: [],
            pending: 0,
            completed: 0,
            rejected: 0,
            all: 0,
          }
        )
      );
    },
    onError: (err) => {
      dispatch(getEmpPunchRequestDataFailed());
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
    validationSchema: empPunchReqfilterModalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log(formValues);
      mutate({
        status: formValues.status.label,
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
  console.log({ errors, values });
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

                      searchable,
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
                          searchable={searchable}
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
export default EmpPunchReqFilterFormModal;
