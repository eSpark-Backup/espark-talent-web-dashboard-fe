import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import {
  Profile_Edit_Section,
  User_Detail,
  User_Password,
} from '@/src/constants/profileEditData';
import { generalSettingFormSchema } from '../form/schemas/generalDetails';
import { settingForm } from '@/src/constants/data/forms/setting-form';
import Image from 'next/image';
import {
  CLIENT_UPDATE_COMPANY,
  CLIENT_UPDATE_PIC,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useMutation } from '@tanstack/react-query';
import { Toast } from '../Toast/Toast';

const GeneralSettings = () => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return api
        .postData(`${CLIENT_UPDATE_PIC}`, { picture: data.picture })
        .then(() => {
          Toast('success', 'Data posted successfully');
          return api.updateJSONData(CLIENT_UPDATE_COMPANY, {
            company_name: data.companyName,
          });
        });
    },
    onSuccess: ({ data }) => {
      console.log({ data });
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
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
  } = useFormik({
    initialValues: {},
    validationSchema: generalSettingFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      mutate(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const fileInputRef = React.useRef(null);
  const handleFileInputChange = (event) => {
    // const name = event.target.name;
    const file = event.target.files[0];
    setFieldValue('picture', file);
    // handleData(name, file);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            color: '#171717',
            fontWeight: 400,
            fontSize: '16px',
          }}
        >
          {Profile_Edit_Section?.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Image
            src={Profile_Edit_Section?.profileAvatar}
            width={50}
            height={50}
            alt={Profile_Edit_Section?.alt}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
            required
            name="picture"
          />
          <Button
            type="file"
            onClick={handleButtonClick}
            sx={{
              width: '160px',
              height: '40px',
              fontSize: { xs: '12px', md: '16px' },
              whiteSpace: 'nowrap',
              fontWeight: 600,
              background: '#029894',
              borderRadius: '5px',
              color: '#fff',
              '&:hover': {
                background: '#029894',
              },
            }}
            startIcon={
              <Image
                src={Profile_Edit_Section?.buttonIcon}
                width={24}
                height={24}
                alt={'upload'}
              />
            }
          >
            {Profile_Edit_Section?.buttonText}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          my: 3,
          width: { xs: '100%', md: '80%' },
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: '#171717', fontWeight: '400' }}
        >
          {User_Detail?.title}
        </Typography>
        <Grid sx={{ marginLeft: '-7px' }}>
          <Box
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', md: '65%' },
              }}
            >
              {settingForm.map(
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
                        md={6}
                        lg={6}
                        fields={fields}
                      />
                    </Grid>
                  </>
                )
              )}
            </Box>
            <Grid item p={'0 10px'} xs={12} lg={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  paddingRight: { xs: '0', md: '15px' },
                  marginTop: { xs: '0px', md: '125px' },
                }}
              >
                <Button
                  sx={{
                    minWidth: '120px',
                    background: '#888888',
                    color: '#fff',
                    '&:hover': {
                      background: '#888888',
                      color: '#fff',
                    },
                  }}
                  type="submit"
                >
                  {User_Password?.buttonText}
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};
export default GeneralSettings;
