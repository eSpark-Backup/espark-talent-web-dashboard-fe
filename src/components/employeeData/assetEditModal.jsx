import React, { forwardRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import FormInput from '../form/ui-elements/FormInput';
import { assetForm } from '@/src/constants/data/forms/asset-form';
import { assetFormSchema } from '../form/schemas/assetForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HR_ADD_EMP_ASSET } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { Toast } from '../Toast/Toast';

const AssetEditModal = forwardRef(
  ({ onClose, open, modalData, empData }, ref) => {
    const clientQuery = useQueryClient();
    const { mutate, isPending } = useMutation({
      mutationFn: async (data) => {
        return api?.updateData(`${HR_ADD_EMP_ASSET}?id=${modalData?.id}`, data);
      },
      onSuccess: ({ data }) => {
        Toast('success', `${data?.message}`);
        clientQuery.invalidateQueries(['hr-employee-get-asset', modalData?.id]);
        onClose();
      },
      onError: (err) => {
        console.log(err?.response?.data?.assignee_name[0], 'err');
        Toast(
          'error',
          err?.response?.data?.assignee_name[0] || 'Failed to post data'
        );
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
        gadget: modalData?.gadget || '',
        asset_id: modalData?.asset_id || '',
        assigned_date: modalData?.assigned_date || '',
        assignee_name: modalData?.assignee_name || '',
        assignee_email: modalData?.assignee_email || '',
      },
      validationSchema: assetFormSchema,
      enableReinitialize: true,
      onSubmit: (formValues) => {
        const reformedData = {
          ...formValues,
          employee_id: empData?.email,
          assigned_date: dayjs(formValues?.assigned_date).format(
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
          ),
        };
        mutate(reformedData);
      },
      validateOnChange: false,
      validateOnBlur: false,
    });
    return (
      <Modal
        ref={ref}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mx: 'auto',
        }}
      >
        <Box
          tabIndex={-1}
          sx={{
            bgcolor: '#fff',
            maxWidth: '850px',
            maxHeight: '510px',
            width: '95%',
            height: '95%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              display: 'none',
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
                fontSize: '25px',
                fontWeight: 600,
                marginLeft: '20px',
              }}
            >
              {EDIT_MODAL?.editassetForm}
            </Typography>
            <Box
              src="/images/leave-request/close.svg"
              component={'img'}
              onClick={onClose}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              sx={{
                padding: { xs: '10px 20px', lg: '41px 60px' },
              }}
            >
              {assetForm?.map(
                (
                  {
                    title,
                    placeholder,
                    errorText,
                    prefixIcon,
                    type,
                    suffixIcon,
                    disabled,
                    options,
                    name,
                    nested,
                    fields,
                  },
                  formIndex
                ) => (
                  <React.Fragment key={formIndex}>
                    <Grid item xs={12} lg={5}>
                      <FormInput
                        title={title}
                        disabled={disabled}
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
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        fields={fields}
                      />
                    </Grid>
                    {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                  </React.Fragment>
                )
              )}
              <Grid item p={'0 10px'} xs={12}>
                <Button
                  sx={{ minWidth: '120px' }}
                  variant="contained"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <CircularProgress size={26} color="secondary" />
                  ) : (
                    'save'
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
AssetEditModal.displayName = 'AssetEditModal';
export default AssetEditModal;
