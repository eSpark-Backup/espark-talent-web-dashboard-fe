import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { editContractFormHrPortalSchema } from '@/src/schemas/contractSignedForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { editEmployeeContractForm } from '@/src/constants/data/forms/contract';
import { useFormik } from 'formik';
import { CONTRACT_SIGNED } from '@/src/constants/contract-signed';
import { FORM_DATA } from '@/src/constants/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HR_COMPANY_CONTRACTS } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { getEmployeesCompanyContractRequestSuccess } from '@/src/redux/slices/hrSlices/contractSlice';
import { useDispatch } from 'react-redux';

const EditEmployeeContractModal = ({ open, onClose, modalData }) => {
  const companyContractSignedMutation = useMutation({
    mutationFn: async (status) => {
      return api.getData(`${HR_COMPANY_CONTRACTS}?status=${status}`);
    },
    onSuccess: ({ data }) => {
      const tempData =
        data === ''
          ? []
          : data?.map((item) => ({
              ...item,
              download: 'Download',
              action: ['View', 'Edit', 'Delete'],
              contract_doc: item.contract_doc,
              date: dayjs(item?.date)?.format('DD-MMMM-YYYY'),
            }));
      dispatch(getEmployeesCompanyContractRequestSuccess(tempData));
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
    },
  });

  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData?.append(key, formVals[key]);
      }
      return api.updateData(
        `${HR_COMPANY_CONTRACTS}?id=${modalData?.id}&tab=employee`,
        formData
      );
    },
    onSuccess: ({ data }) => {
      companyContractSignedMutation?.mutate('employees');
      Toast('success', `${data?.message}`);
      setFormData(null);
      resetForm();
      onClose();
      queryClient?.invalidateQueries(['company-contract-signed-query']);
    },
    onError: (err) => {
      Toast('error', err?.response?.data?.error || 'Failed to post data');
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
    resetForm,
  } = useFormik({
    initialValues: {
      contract_name: modalData?.contract_name,
      employee_id: modalData?.employee_id || '',
      date: modalData?.date
        ? dayjs(modalData.date)?.format('DD-MMMM-YYYY')
        : '19-03-2025',
    },
    validationSchema: editContractFormHrPortalSchema,
    enableReinitialize: true,
    onSubmit: (formData) => {
      const temData = {
        ...formData,
        date: dayjs(formData?.date)?.format('YYYY-MM-DD'),
        employee_id: modalData?.employee_id,
      };
      setFormData(temData);
      mutate(temData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Modal
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
          maxWidth: '850px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
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
              fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '25px' },
              fontWeight: 600,
              mx: '10px',
            }}
          >
            {CONTRACT_SIGNED?.contractEditForm}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #068987',
              borderRadius: '50%',
              width: { xs: '20px', sm: '25px' },
              height: { xs: '20px', sm: '25px' },
              cursor: 'pointer',
              p: 0.5,
            }}
            onClick={handleCloseModal}
          >
            <Box component="img" src="/icons/Close.svg" />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '30px 20px', lg: '41px 60px' },
            }}
          >
            {editEmployeeContractForm?.map(
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
                <React.Fragment key={formIndex}>
                  <Grid item xs={12} md={12} lg={5} key={formIndex}>
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
                      handleData={handleData}
                      accept={accept}
                      filelabel={filelabel}
                      disabled={disabled}
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
                  FORM_DATA?.edit
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditEmployeeContractModal;
