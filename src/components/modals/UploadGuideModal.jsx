import React, { forwardRef, useState } from 'react';
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
import { api } from '@/src/services/apiService';
import { HR_GUIDE } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/utils/toast';
import { uploadGuideForm } from '@/src/data/forms/upload-guide';
import { uploadGuideFormSchema } from '../../validation/uploadGuide';
import { UPLOAD_GUIDE } from '@/src/constants/guide';
import { addGuide } from '@/src/redux/slices/hrSlices/guide';
import { useMutation } from '@tanstack/react-query';

const UploadGuideModal = forwardRef(({ open, onClose }, ref) => {
  const [guideFormVal, setGuideFormVal] = useState(null);
  const { guides_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const { isPending, mutate } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData?.append(key, formVals[key]);
      }
      return api?.postData(HR_GUIDE, formData);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Guide posted successfully');
      dispatch(
        addGuide({
          ...guideFormVal,
          action: [
            'View',
            role === 'super_admin' ||
            (guides_perms && guides_perms[0]?.download)
              ? 'Download'
              : null,
            role === 'super_admin' || (guides_perms && guides_perms[0]?.write)
              ? 'Edit'
              : null,
            role === 'super_admin' || (guides_perms && guides_perms[0]?.delete)
              ? 'Delete'
              : null,
          ]?.filter(Boolean),
          actionStatus: true,
          employee: ['DisabledCheck', 'EnabledCheck', false],
          client: ['DisabledCheck', 'EnabledCheck', false],
          isSelected: false,
          isModulePermissionData: true,
          isGuideData: true,
          id: data?.id,
        })
      );
      onClose();
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to post data');
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
    validationSchema: uploadGuideFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      setGuideFormVal(formValues);
      mutate(formValues);
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
      ref={ref}
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
        sx={{
          bgcolor: '#fff',
          maxWidth: '1000px',
          width: '95%',
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '423px',
          overflowY: 'auto',
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
              fontSize: { xs: '20px', sm: '22px', md: '25px' },
              fontWeight: 600,
              marginLeft: '8px',
            }}
          >
            {UPLOAD_GUIDE?.uploadGuide}
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
            <Box component="img" src="/icons/Close.svg" />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={{ xs: 0, md: 2 }}
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 5,
            }}
          >
            {uploadGuideForm?.map(
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
                },
                formIndex
              ) => (
                <React.Fragment key={formIndex}>
                  <Grid item xs={12} md={6} key={formIndex}>
                    <Box sx={{ px: { xs: 2, sm: 4, md: 8, lg: 10 } }}>
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
                        filelabel={filelabel}
                      />
                    </Box>
                  </Grid>
                </React.Fragment>
              )
            )}
            <Grid item xs={12}>
              <Box sx={{ px: { xs: 2.5, sm: 4, md: 8, lg: 10 } }}>
                <Button
                  sx={{ minWidth: '120px', fontSize: '16px' }}
                  variant="contained"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <CircularProgress size={26} color="secondary" />
                  ) : (
                    UPLOAD_GUIDE?.upload
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
});
UploadGuideModal.displayName = 'UploadGuideModal';
export default UploadGuideModal;
