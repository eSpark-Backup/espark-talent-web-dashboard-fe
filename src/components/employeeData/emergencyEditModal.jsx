import React, { forwardRef, useEffect, useState } from 'react';
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
import { emergency_contact_form } from '@/src/constants/data/forms/emergency-contacts';
import { emergency_contact_schema } from '../form/schemas/emergencyContact';
import FormInput from '../form/ui-elements/FormInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_UPDATE_EMP_INFO } from '@/src/services/apiService/apiEndPoints';
import { useParams } from 'next/navigation';
import { Toast } from '../Toast/Toast';

const EditEmergencyModal = forwardRef(
  ({ onClose, showEmergencyModal, data }, ref) => {
    const params = useParams();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
      mutationFn: async (data) => {
        return api.updateJSONData(
          `${HR_UPDATE_EMP_INFO}?id=${params.id}`,
          data
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
        emergency_contact: {
          primary: {
            name: data?.emergency_contact?.primary?.name || '',
            relation: data?.emergency_contact?.primary?.relation || '',
            phone_number: data?.emergency_contact?.primary?.phone_number || '',
            phone_number2:
              data?.emergency_contact?.primary?.phone_number2 || '',
          },
          secondary: {
            name: data?.emergency_contact?.secondary?.name || '',
            relation: data?.emergency_contact?.secondary?.relation || '',
            phone_number:
              data?.emergency_contact?.secondary?.phone_number || '',
            phone_number2:
              data?.emergency_contact?.secondary?.phone_number2 || '',
          },
        },
      },
      validationSchema: emergency_contact_schema,
      enableReinitialize: true,
      onSubmit: (formValues) => {
        handleUpdate(formValues);
      },
      validateOnChange: false,
      validateOnBlur: false,
    });
    const [secPhoneList, setSecPhoneList] = useState([]);
    const handleClickTogglePhoneNumber = (name, icon) => {
      if (icon === 'plus') {
        if (secPhoneList.includes(`${name}2`)) return;
        setSecPhoneList((prevState) => {
          return [...prevState, `${name}2`];
        });
      } else if (icon === 'minus') {
        setSecPhoneList((prevState) => {
          return prevState.filter((str) => str !== name);
        });
      }
    };
    useEffect(() => {
      console.log({ secPhoneList });
    }, [secPhoneList]);

    return (
      <Modal
        ref={ref}
        open={showEmergencyModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            maxWidth: '1000px',
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            maxHeight: '80%',
            position: 'absolute',
            top: '10%',
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
                fontSize: { xs: '18px', md: '25px' },
                fontWeight: 600,
                marginLeft: '17px',
                marginRight: '20px',
              }}
            >
              {EDIT_MODAL?.editEmergencyContacts}
            </Typography>
            <Box
              src="/images/leave-request/close.svg"
              component={'img'}
              onClick={onClose}
              sx={{
                cursor: 'pointer',
              }}
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              sx={{
                padding: { xs: '25px 25px', md: '35px 50px', lg: '35px 70px' },
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Grid container spacing={5}>
                {emergency_contact_form?.map(
                  ({ contactTitle, fields, type }, contactIndex) => (
                    <Grid item xs={12} md={5.5} lg={6} key={contactIndex}>
                      <Typography
                        sx={{
                          fontSize: { xs: '14px', md: '16px' },
                          fontWeight: 600,
                          paddingBottom: { xs: '25px', md: '35px' },
                          marginLeft: '7px',
                        }}
                      >
                        {contactTitle}
                      </Typography>
                      {fields?.map(
                        (
                          { title, placeholder, suffixIconOutside, name },
                          fieldIndex
                        ) => {
                          return (
                            <Grid item xs={12} lg={10} key={fieldIndex}>
                              {(suffixIconOutside !== 'minus' ||
                                (suffixIconOutside === 'minus' &&
                                  secPhoneList.includes(
                                    `emergency_contact.${type}.${name}`
                                  ))) && (
                                <FormInput
                                  title={title}
                                  placeholder={placeholder}
                                  name={`emergency_contact.${type}.${name}`}
                                  setFieldValue={setFieldValue}
                                  value={
                                    values['emergency_contact']?.[type]?.[
                                      name
                                    ] || ''
                                  }
                                  error={
                                    errors['emergency_contact']?.[type]?.[name]
                                  }
                                  touched={
                                    touched['emergency_contact']?.[type]?.[name]
                                  } // Access touched values by key
                                  setFieldError={setFieldError}
                                  errors={errors}
                                  setErrors={setErrors}
                                  values={values}
                                  xs={11}
                                  sm={11.5}
                                  md={12}
                                  lg={12}
                                  suffixIconOutside={
                                    (suffixIconOutside !== 'plus' ||
                                      (suffixIconOutside === 'plus' &&
                                        !secPhoneList.includes(`${name}2`))) &&
                                    suffixIconOutside
                                  }
                                  onClickTogglePhoneNumber={() =>
                                    handleClickTogglePhoneNumber(
                                      `emergency_contact.${type}.${name}`,
                                      suffixIconOutside
                                    )
                                  }
                                />
                              )}
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  )
                )}
              </Grid>
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
EditEmergencyModal.displayName = 'EditEmergencyModal';
export default EditEmergencyModal;
