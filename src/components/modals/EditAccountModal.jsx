import React, { forwardRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { SETTING } from '@/src/constants/setting-hr';
import { FORM_DATA } from '@/src/constants/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_ACCOUNTS } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/utils/toast';
import { useState } from 'react';
import { editAccountInfoSchema } from '@/src/validation/addAccount';
import { editAccountForm } from '@/src/data/forms/add-account';
import EditSettingProfile from '@/src/components/employee-data/EditSettingProfile';

const EditAccountModal = forwardRef(({ open, onClose, modalData }, ref) => {
  const [showEditModal, setEditModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData?.append(key, formVals[key]);
      }
      return api.updateData(`${HR_ACCOUNTS}?id=${modalData?.id}`, formData);
    },
    onSuccess: ({ data }) => {
      handleCloseModal();
      Toast('success', data?.message);
      queryClient?.invalidateQueries(['get-company-accounts']);
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to update data');
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
    initialValues: {
      account_name: modalData?.account_name,
      email: modalData?.email,
      password: modalData?.password,
    },
    validationSchema: editAccountInfoSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (formValues) => {
      mutate(formValues);
      setImageFile(null);
    },
  });

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

  const handleOpenModal = () => {
    setEditModal(true);
  };

  const handlePictureModalClose = () => {
    setEditModal(false);
  };

  return (
    <Modal
      ref={ref}
      open={Boolean(open)}
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
        sx={{
          bgcolor: '#fff',
          maxWidth: '850px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflowY: 'auto',
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
              marginLeft: '8px',
            }}
          >
            {SETTING?.editAccount}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #068987',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
              marginRight: '8px',
            }}
            onClick={handleCloseModal}
          >
            <Box component="img" src="/icons/Close.svg" sx={{}} />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 80px' },
              display: 'flex',
            }}
          >
            {editAccountForm?.map(
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
                  fields,
                  accept,
                  filelabel,
                  disabled,
                },
                formIndex
              ) => (
                <Grid item xs={12} lg={6} key={formIndex}>
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
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    fields={fields}
                    accept={accept}
                    disabled={disabled}
                    filelabel={filelabel}
                    onclickUpload={handleOpenModal}
                  />
                </Grid>
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
                  FORM_DATA?.edit
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
        {showEditModal && (
          <EditSettingProfile
            open={showEditModal}
            onClose={handlePictureModalClose}
            id={modalData?.id}
            isImage={imageFile === null ? modalData?.image : imageFile}
            setFieldValue={setFieldValue}
            setImageFile={setImageFile}
          />
        )}
      </Box>
    </Modal>
  );
});
EditAccountModal.displayName = 'EditAccountModal';
export default EditAccountModal;
