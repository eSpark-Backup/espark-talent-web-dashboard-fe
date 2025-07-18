import React, { forwardRef } from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { FILTER } from '@/src/constants/filter';
import ResetButton from './ResetButton';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/utils/toast';
import {
  getTimeSheetData,
  getTimeSheetDataFailed,
} from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import {
  getEmpWfhRequestDataFailed,
  getEmpWfhRequestDataSuccess,
  getEmpWfhRequestFilteredDataSuccess,
} from '@/src/redux/slices/employeeSlices/wfhRequestSlice';

import { onCheckDateValidation } from '@/src/utils/onCheckDateValidation';
import { EMP_WFH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { wfhReqfilterModalSchema } from '../../validation/wfhReqFilterModal';

const WFHReqFilterFormModal = forwardRef(
  ({ open, onClose, filterForm }, ref) => {
    const dispatch = useDispatch();

    const { mutate, isPending } = useMutation({
      mutationFn: async (args) => {
        dispatch(getTimeSheetData());
        return api.getData(
          `${EMP_WFH_REQUEST}?tab=${values?.status?.toLowerCase()}&from=${args.from}&to=${args.to}`
        );
      },
      onSuccess: ({ data }) => {
        const newData1 =
          data === '' || !data?.requests?.length
            ? []
            : data?.requests.filter((el) => {
                return el;
              });

        const updateRequestAtTime = newData1?.map((item) => {
          return {
            ...item,
          };
        });

        dispatch(
          getEmpWfhRequestFilteredDataSuccess({
            ...data,
            requests: [...updateRequestAtTime],
          })
        );
      },
      onError: (err) => {
        dispatch(getTimeSheetDataFailed());
        Toast('error', err.message || 'Failed to get data');
      },
    });

    const resetMutation = useMutation({
      mutationFn: async () => {
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
        dispatch(getEmpWfhRequestDataFailed());
        Toast('error', err.message || 'Failed to update data');
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
      setValues,
    } = useFormik({
      initialValues: {
        from: null,
        to: null,
      },
      validationSchema: wfhReqfilterModalSchema,
      enableReinitialize: true,
      onSubmit: (formValues) => {
        if (
          formValues?.from === 'Invalid Date' ||
          formValues?.to === 'Invalid Date'
        ) {
          setErrors(onCheckDateValidation(formValues));
        } else {
          mutate({
            ...formValues,
            from: dayjs(formValues?.from).format('YYYY-MM-DD'),
            to: dayjs(formValues?.to).format('YYYY-MM-DD'),
          });
        }
      },
      validateOnChange: false,
      validateOnBlur: false,
    });
    const handleCloseModal = () => {
      handleReset();
      onClose();
    };
    const handleClickReset = () => {
      setValues({
        from: null,
        to: null,
      });
      setErrors({});
      resetMutation.mutate();
    };
    return (
      <Modal
        ref={ref}
        data-aos="fade-left"
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        disableScrollLock
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          tabIndex={-1}
          sx={{
            bgcolor: '#fff',
            width: { xs: '300px', sm: '330px', md: '350px' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            height: '100%',
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
              scrollbarWidth: 'none',
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
                      },
                      formIndex
                    ) => (
                      <Grid item xs={12} lg={12} key={formIndex}>
                        <FormInput
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
                          sm={12}
                          md={12}
                          lg={12}
                          fieldsName={fieldsName}
                        />
                      </Grid>
                    )
                  )}
                  <Grid item p={'0 10px'} xs={12}>
                    <ResetButton
                      handleReset={handleClickReset}
                      isLoadingSubmit={isPending}
                    />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
);

WFHReqFilterFormModal.displayName = 'WFHReqFilterFormModal';
export default WFHReqFilterFormModal;
