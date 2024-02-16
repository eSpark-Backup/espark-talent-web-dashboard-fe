import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { accountInfoSchema } from '../form/schemas/addAccount';
import { accountForm } from '@/src/constants/data/forms/add-account';
import { SETTING } from '@/src/constants/SettingHr';
import { FORM_DATA } from '@/src/constants/form';

const AddAccountModal = ({ open, onClose, handleAdd }) => {
  const [formData, setFormData] = useState({});
  function generateString() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const sections = [4, 7, 2];
    const totalLength = 15;
    let currentLength = 0;

    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < sections[i]; j++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        currentLength++;
      }
      if (currentLength < totalLength) {
        result += '-';
        currentLength++;
      }
    }
    return result;
  }
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
    validationSchema: accountInfoSchema,
    enableReinitialize: true,
    onSubmit: async (formValues) => {
      console.log({ formValues });
      let imageUrl = '';
      if (formValues.upload) {
        imageUrl = URL.createObjectURL(formValues.upload);
      } else {
        imageUrl = '/images/users/default-image.svg';
      }
      const imageElement = new Image();
      imageElement.src = imageUrl;
      imageElement.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 30;
        canvas.height = 30;
        const borderRadiusPercentage = 50;
        const borderRadius = (canvas.width * borderRadiusPercentage) / 100;
        context.beginPath();
        context.moveTo(borderRadius, 0);
        context.arcTo(
          canvas.width,
          0,
          canvas.width,
          canvas.height,
          borderRadius
        );
        context.arcTo(
          canvas.width,
          canvas.height,
          0,
          canvas.height,
          borderRadius
        );
        context.arcTo(0, canvas.height, 0, 0, borderRadius);
        context.arcTo(0, 0, canvas.width, 0, borderRadius);
        context.closePath();
        context.clip();
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
        const resizedImageUrl = canvas.toDataURL();
        handleAdd({
          ...formValues,
          pic: resizedImageUrl,
          action: ['Delete', 'View'],
          actionStatus: true,
          id: generateString(),
        });
      };
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
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  return (
    <Modal
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
          width: { xs: '90%', sm: '90%', md: '45%' },
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
            {SETTING?.addAccount}
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
            {accountForm?.map(
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
                },
                formIndex
              ) => (
                <>
                  <Grid item xs={12} lg={6}>
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
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      handleData={handleData}
                    />
                  </Grid>
                  {/* {formIndex % 2 === 0 && <Grid item xs={12} lg={1.6}></Grid>} */}
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
              >
                {FORM_DATA?.add}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAccountModal;
