import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import {
  EDIT_MODAL,
  employeeProfileData,
} from '@/src/constants/employeeProfile';
import { GENDER_OPTION } from '@/src/constants/Hiring';
import DatePicker from './Datepicker';
import PersonalDetails from './personalDetails';
import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { personalDetailsForm } from '@/src/constants/data/forms/employee-personal-details';
import { employeePersonalDataSchema } from '../form/schemas/employeePersonalDetails';

const EditPersonalModal = ({ onClose, handleEditProfileModal }) => {
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
    validationSchema: employeePersonalDataSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      //   handleGoNext();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const [selectedValue, setSelectedValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [select, setselect] = React.useState('Select');
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(true);

  const handleChange = (event) => {
    setselect(event.target.value);
    setIsInputLabelVisible(selectedValue === '');
  };
  const SelectOpen = () => {
    setOpen(true);
  };
  const SelectClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  console.log(setSelectedValue);
  console.log(open);
  return (
    <Modal
      open={handleEditProfileModal}
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
          width: { xs: '90%', sm: '90%', md: '55%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
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
            {EDIT_MODAL?.editPersonalDetails}
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
              padding: { xs: '10px 20px', lg: '41px 100px' },
            }}
          >
            {personalDetailsForm.map(
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
                  <Grid item xs={12} lg={5}>
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
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '95%',
              padding: '15px',
              marginLeft: { xs: '0px', md: '70px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '20px',
                gap: { xs: '50px', md: '100px' },
                flexDirection: { xs: 'column', md: 'row' },
                '@media (min-width: 280px) and (max-width: 450px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <PersonalDetails
                isOpen={isOpen}
                handleClick={handleClick}
                SelectOpen={SelectOpen}
                SelectClose={SelectClose}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'column' },
                  gap: '35px',
                  width: { xs: '100%', md: '100%' },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.employeeId}
                  </Typography>
                  <TextField
                    sx={{ width: '82%' }}
                    inputProps={{
                      style: {
                        height: '10px',
                      },
                    }}
                    placeholder={EDIT_MODAL?.id}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.gender}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel
                      shrink={false}
                      disabled
                      sx={{ display: isInputLabelVisible ? 'block' : 'none' }}
                    >
                      {employeeProfileData?.select}
                    </InputLabel>

                    <Select
                      sx={{
                        '&:focus': {
                          borderColor: 'teal',
                        },
                        width: '82%',
                        height: '45px',
                      }}
                      value={select}
                      IconComponent={() => (
                        <InputAdornment
                          sx={{
                            marginRight: '10px',
                          }}
                        >
                          <Image
                            src={
                              isOpen
                                ? '/images/hiring/icon-down.svg'
                                : '/images/hiring/rightarrow.png'
                            }
                            width={25}
                            height={25}
                            alt="Dropdown"
                            onClick={handleClick}
                          />
                        </InputAdornment>
                      )}
                      onOpen={SelectOpen}
                      onClose={SelectClose}
                      onChange={handleChange}
                    >
                      {GENDER_OPTION?.map((option) => (
                        <MenuItem key={option?.value} value={option?.label}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ width: '100%', marginTop: '-10px' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.team}
                  </Typography>
                  <TextField
                    sx={{ width: '82%' }}
                    inputProps={{
                      style: {
                        height: '10px',
                      },
                    }}
                    placeholder={EDIT_MODAL?.emailPlaceholder}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
                    {EDIT_MODAL?.joiningDate}
                  </Typography>
                  <DatePicker />
                </Box>
              </Box>
            </Box>
            <Button
              variant="primary"
              sx={{
                width: { xs: '100px', sm: '120px' },
                height: '40px',
                fontSize: '16px',
                fontWeight: 600,
                marginLeft: '20px',
                marginTop: { xs: '10px', md: '-10px' },
              }}
            >
              {EDIT_MODAL?.save}
            </Button>
          </Box>
        </Box> */}
      </Box>
    </Modal>
  );
};
export default EditPersonalModal;
