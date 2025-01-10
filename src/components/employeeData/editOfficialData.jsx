import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { officialDetailsForm } from '@/src/constants/data/forms/employee-personal-details';
import { employeeOfficialDataSchema } from '../form/schemas/employeePersonalDetails';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_UPDATE_EMP_INFO } from '@/src/services/apiService/apiEndPoints';
import { useParams } from 'next/navigation';
import { Toast } from '../Toast/Toast';
import dayjs from 'dayjs';

const EditOfficialModal = ({ onClose, handleEditProfileModal, data }) => {
  const params = useParams();
  const [isJobTitleClicked, setIsJobTitleClicked] = useState(false);

  const handleJobTitleClick = (event, name) => {
    if (name === 'job_title') {
      setIsJobTitleClicked(!isJobTitleClicked);
    }
  };

  const handleJobTitleSelect = (event, name) => {
    if (event?.target?.value) {
      setFieldValue(name, event.target.value); // Update the form value
      setIsJobTitleClicked(false); // Reset dropdown open state
    }
  };

  const queryClient = useQueryClient();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (data) => {
  //     const updatedData = {
  //       ...data,
  //       dob: dayjs(data?.dob).format('YYYY-MM-DD'),
  //       joining_date: dayjs(data?.joining_date).format('YYYY-MM-DD'),
  //       starting_date: dayjs(data?.starting_date).format('YYYY-MM-DD'),
  //       ending_date: dayjs(data?.ending_date).format('YYYY-MM-DD'),
  //     };
  //     return api.updateJSONData(
  //       `${HR_UPDATE_EMP_INFO}?id=${params.id}`,
  //       updatedData
  //     );
  //   },
  //   onSuccess: async ({ data }) => {
  //     Toast('success', 'Data updated successfully');
  //     console.log({ data });
  //     onClose();
  //     await queryClient.invalidateQueries('employee-profile');
  //   },
  //   onError: (err) => {
  //     Toast('error', err.message || 'Failed to update data');
  //     console.log({ err: err.message, name: err.name, stack: err.stack });
  //     onClose();
  //   },
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      // Prepare the updated data object
      const updatedData = {
        ...data,
        dob: dayjs(data?.dob).format('YYYY-MM-DD'),
        joining_date: dayjs(data?.joining_date).format('YYYY-MM-DD'),
      };

      // Dynamically exclude `starting_date` and `ending_date` if job status is Part-Time or Permanent
      if (data.status === 'Part-Time' || data.status === 'Permanent') {
        console.log('Excluding starting_date and ending_date'); // Debugging log
        delete updatedData.starting_date;
        delete updatedData.ending_date;
      } else {
        updatedData.starting_date = dayjs(data?.starting_date).format(
          'YYYY-MM-DD'
        );
        updatedData.ending_date = dayjs(data?.ending_date).format('YYYY-MM-DD');
      }

      console.log('Final Payload:', updatedData); // Debugging log
      return api.updateJSONData(
        `${HR_UPDATE_EMP_INFO}?id=${params.id}`,
        updatedData
      );
    },
    onSuccess: async ({ data }) => {
      Toast('success', 'Data updated successfully');
      console.log({ data });
      onClose();
      await queryClient.invalidateQueries('employee-profile');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
      onClose();
    },
  });

  const handleUpdate = (data) => {
    mutate(data);
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
      employee_id: data?.employee_id || '',
      job_title: data?.job_title || '',
      role: data?.role || '',
      job_status: data?.status || '',
      starting_date: data?.probation_started || '',
      ending_date: data?.probation_ended || '',
      joining_date: data?.joining_date || '',
    },
    validationSchema: employeeOfficialDataSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log(formValues, 'formValues');
      const cleanedFormValues = { ...formValues };
      if (
        formValues.job_status === 'Part-Time' ||
        formValues.job_status === 'Permanent'
      ) {
        console.log('Cleaning up form values'); // Debugging log
        delete cleanedFormValues.starting_date;
        delete cleanedFormValues.ending_date;
      }
      console.log('Cleaned Form Values:', cleanedFormValues); // Debugging log
      handleUpdate(cleanedFormValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal
      open={handleEditProfileModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          width: '95%',
          bgcolor: '#fff',
          top: '50%',
          left: '50%',
          maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          border: 'none',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '630px',
          overflowY: 'auto',
          height: '95%',
          '&.MuiBox-root': {
            border: 'none',
            outline: 'none',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '16px', sm: '18px', md: '23px', lg: '25px' },
              fontWeight: 600,
              marginLeft: { xs: '12px', sm: '20px' },
            }}
          >
            {EDIT_MODAL?.editOfficialDetails}
          </Typography>

          <Box
            sx={{ cursor: 'pointer' }}
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              display: 'flex',
              height: '100%',
              justifyContent: 'space-between',
              px: { xs: 2, sm: 4, md: 10, lg: 10 },
              pt: { xs: 3, sm: 4, md: 5, lg: 5 },
              pb: { xs: 3, sm: 4, md: 7, lg: 7 },
              overflow: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: 'gray',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {officialDetailsForm?.map(
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
                  selectWithType,
                  fields,
                },
                formIndex
              ) => (
                <>
                  <Grid item xs={12} md={5.5} key={formIndex}>
                    <FormInput
                      title={title}
                      placeholder={placeholder}
                      errorText={errorText}
                      prefixIcon={prefixIcon}
                      type={type}
                      suffixIcon={suffixIcon}
                      options={options}
                      name={name}
                      selectWithType={selectWithType}
                      setFieldValue={setFieldValue}
                      value={name === 'email' ? data?.email : values[name]}
                      error={errors[name]}
                      touched={touched}
                      setFieldError={setFieldError}
                      errors={errors}
                      setErrors={setErrors}
                      values={values}
                      disabled={
                        name === 'email' ||
                        (name === 'starting_date' &&
                          (values.job_status === 'Part-Time' ||
                            values.job_status === 'Permanent')) ||
                        (name === 'ending_date' &&
                          (values.job_status === 'Part-Time' ||
                            values.job_status === 'Permanent'))
                          ? true
                          : false
                      }
                      nested={nested}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      handleJobTitleClick={(event) =>
                        handleJobTitleClick(event, name)
                      }
                      handleJobTitleSelect={(event) =>
                        handleJobTitleSelect(event, name)
                      }
                    />
                  </Grid>
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: { xs: '100%', sm: '120px' } }}
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
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default EditOfficialModal;
