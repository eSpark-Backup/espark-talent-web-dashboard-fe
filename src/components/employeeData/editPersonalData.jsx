import React, { forwardRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { EDIT_MODAL } from '@/src/constants/employee-profile';
import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { personalDetailsForm } from '@/src/data/forms/employee-personal-details';
import { employeePersonalDataSchema } from '../../schemas/employeePersonalDetails';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_UPDATE_EMP_INFO } from '@/src/services/apiService/apiEndPoints';
import { useParams } from 'next/navigation';
import { Toast } from '../Toast/Toast';
import dayjs from 'dayjs';

const EditPersonalModal = forwardRef(
  ({ onClose, showEditProfilelModal, data }, ref) => {
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

    const { mutate, isPending } = useMutation({
      mutationFn: async (data) => {
        const updatedData = {
          ...data,
          dob: dayjs(data?.dob).format('YYYY-MM-DD'),
          joining_date: dayjs(data?.joining_date).format('YYYY-MM-DD'),
        };
        return api.updateJSONData(
          `${HR_UPDATE_EMP_INFO}?id=${params.id}`,
          updatedData
        );
      },
      onSuccess: async () => {
        Toast('success', 'Data updated successfully');
        onClose();
        await queryClient.invalidateQueries('employee-profile');
      },
      onError: (err) => {
        Toast('error', err.message || 'Failed to update data');
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
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        dob: data?.dob || '',
        gender: data?.gender || '',
        personal_email: data?.personal_email || '',
        marital_status: data?.marital_status || '',
        phone_number: data?.phone_number || '',
      },
      validationSchema: employeePersonalDataSchema,
      enableReinitialize: true,
      onSubmit: (formValues) => {
        handleUpdate({
          ...formValues,
        });
      },
      validateOnChange: false,
      validateOnBlur: false,
    });

    return (
      <Modal
        ref={ref}
        open={showEditProfilelModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            mx: 'auto',
            width: '95%',
            height: '95%',
            maxWidth: '1000px',
            maxHeight: '630px',
            bgcolor: '#fff',
            top: '50%',
            left: '50%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            overflow: 'auto',
            scrollbarWidth: 'none',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
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
              {EDIT_MODAL?.editPersonalDetails}
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
                scrollbarWidth: 'none',
                scrollbarColor: 'gray',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {personalDetailsForm?.map(
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
                      value={values[name]}
                      error={errors[name]}
                      touched={touched}
                      setFieldError={setFieldError}
                      errors={errors}
                      setErrors={setErrors}
                      values={values}
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
  }
);
EditPersonalModal.displayName = 'EditPersonalModal';

export default EditPersonalModal;
