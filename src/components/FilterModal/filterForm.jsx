import React from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { filterModalSchema } from '../form/schemas/filterModal';
import { FILTER } from '@/src/constants/filter';
import ResetButton from './resetButton';
import { api } from '@/src/services/apiService';
import { EMP_TIME_SHEET } from '@/src/services/apiService/apiEndPoints';
import {
  getTimeSheetData,
  getTimeSheetDataFailed,
  getTimeSheetDataSuccess,
} from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { convertDateFormat, getAttendenceShortHand } from '@/src/utils/helpers';

const FilterFormModal = ({ open, onClose, filterForm }) => {
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { mutate } = useMutation({
    mutationFn: async (args) => {
      console.log({ args });
      dispatch(getTimeSheetData());
      return api.getData(
        `${EMP_TIME_SHEET}?workspace=${workSpace?.email || ''}&from=${
          args.from
        }&to=${args.to}`
      );
    },
    onSuccess: ({ data }) => {
      const newData = Object.entries(data?.time_sheet).map((item) => ({
        ...item[1],
        day: dayjs(convertDateFormat(item[0])).format('dddd'),
        status: Object.entries(item[1]?.status)
          .map((st) => {
            if (!st[1]) return;
            else return getAttendenceShortHand(st[0]);
          })
          .filter((el) => el !== undefined),
        date: convertDateFormat(item[0]),
        action: ['View'],
        attendenceShortHand: true,
        actionStatus: true,
      }));
      dispatch(
        getTimeSheetDataSuccess({
          ...data,
          time_sheet: {
            ...data.time_sheet,
            record: newData,
          },
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
    validationSchema: filterModalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({
        formValues: {
          from: dayjs(formValues?.from).format('YYYY-MM-DD'),
          to: dayjs(formValues?.to).format('YYYY-MM-DD'),
          fromOrig: formValues?.from,
          toOrig: formValues?.to,
        },
      });
      mutate({
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
          width: { xs: '90%', md: '20%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: { xs: '600px', md: '900px' },
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '0px',
          position: 'absolute',
          top: '2%',
          right: '0px',
          '@media (min-width: 900px) and (max-width: 1500px)': {
            width: '30%',
          },
          '@media (min-width: 600px) and (max-width: 900px)': {
            width: '45%',
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
              padding: '15px',
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
              {/* <button type="submit">Submit</button> */}
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default FilterFormModal;
