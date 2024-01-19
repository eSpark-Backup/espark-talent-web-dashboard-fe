import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';

import {
  EDIT_MODAL,
  employeeProfileData,
} from '@/src/constants/employeeProfile';
import FormInput from '../form/ui-elements/FormInput';
import { assetForm } from '@/src/constants/data/forms/asset-form';
import { assetFormSchema } from '../form/schemas/assetForm';

const AssetForm = ({ onClose, open }) => {
   const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues: {},
    validationSchema: assetFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      //   handleGoNext();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith(employeeProfileData?.acceptImage)) {
      setSelectedFile(file);
    } else {
      alert(employeeProfileData?.invalidFile);
      event.target.value = null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '90%', md: '40%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          // height: { xs: '750px', md: '510px' },
          position: 'absolute',
          top: '10%',
          maxHeight:"90%",
          '@media (min-width: 900px) and (max-width: 1440px)': {
            width: '70%',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems:"center"
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
              marginLeft: '20px',
            }}
          >
            {EDIT_MODAL?.addassetForm}
          </Typography>
          <Box
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
          />
        </Box>
          <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 60px' },
            }}
          >
            {assetForm.map(
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
                  <Grid item xs={12} lg={5} >
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
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
              >
              Save
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', md: '40px' },
              width: '80%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '20px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.gadgetName}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.gadgetPlaceholder}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assetID}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '11px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.assetidPlaceholder}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '30px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assignedDate}
                </Typography>
                <DatePicker />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assigneeName}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.assignnamePlacholder}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: '20px', md: '0px' },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assignedEmail}
                </Typography>
                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.assignedemailPlaceholder}
                  inputProps={{
                    style: {
                      height: '10px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                  {EDIT_MODAL?.assigneePicture}
                </Typography>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                <TextField
                  sx={{
                    width: '82%',
                    '& input::placeholder': {
                      fontSize: { xs: '12px', md: '14px' },
                    },
                  }}
                  placeholder={EDIT_MODAL?.uploadPicture}
                  inputProps={{
                    style: {
                      height: '10px',
                      marginLeft: '10px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment sx={{ position: 'start' }}>
                        <Box
                          sx={{
                            backgroundColor: '#068987',
                            display: 'flex',
                            width: '45px',
                            padding: '1px',
                            marginLeft: '-13px',
                            '@media (min-width: 280px) and (max-width: 300px)':
                              {
                                marginTop: '1px',
                              },
                          }}
                        >
                          <Image
                            width={40}
                            height={42}
                            alt="Refresh"
                            src={`/images/dashboard/upload.svg`}
                            onClick={handleClick}
                          />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="primary"
              sx={{
                width: { xs: '100px', sm: '120px' },
                height: '40px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {EDIT_MODAL?.submit}
            </Button>
          </Box>
        </Box> */}
      </Box>
    </Modal>
  );
};
export default AssetForm;
