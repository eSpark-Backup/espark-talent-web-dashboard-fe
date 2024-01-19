import { Box, Grid, Typography } from '@mui/material';
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ActionBarComponent from '@/src/components/requestview/actionbarComponent';
import AppDropdown from '../../dashboard/appDropdown';

const WideFormInput = ({
  title,
  placeholder,
  suffixIcon,
  type,
  required,
  disabled,
  options,
  darkBack,
  name,
  setFieldValue,
  value,
  error,
  setFieldError,
  errors,
  setErrors,
  values,
}) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
            width: 320px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 8px 12px;
            border-radius: 8px;
            color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
            background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
            border: 1px solid ${
              theme.palette.mode === 'dark' ? grey[700] : grey[200]
            };
            box-shadow: 0px 2px 2px ${
              theme.palette.mode === 'dark' ? grey[900] : grey[50]
            };
        
            &:hover {
              border-color: ${blue[400]};
            }
        
            &:focus {
              border-color: ${blue[400]};
              box-shadow: 0 0 0 3px ${
                theme.palette.mode === 'dark' ? blue[600] : blue[200]
              };
            }
        
            // firefox
            &:focus-visible {
              outline: 0;
            }
          `
  );
  const handleSelectItem = (item) => {
    const tempErrors = { ...errors };
    if (Object.hasOwnProperty.call(tempErrors, name)) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue(name, item);
  };
  const handleChangeInput = (field, value) => {
    console.log({ field, value });
    const tempErrors = { ...errors };
    if (value.length) {
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(value);
        if (result) {
          delete tempErrors[name];
        }
      } else {
        delete tempErrors[name];
      }
    } else {
      tempErrors[name] = 'Required';
    }
    setErrors({ ...tempErrors });
    setFieldValue?.(field, value);
  };

  useEffect(() => {
    if (values.startDate && values.endDate) {
      function getDaysDifference(startDate, endDate, timeZone) {
        // Create Date objects for the given dates, setting the time zone
        const start = new Date(startDate);
        start.setHours(start.getHours() - start.getTimezoneOffset(), 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(end.getHours() - end.getTimezoneOffset(), 0, 0, 0);

        // Check if end date is before start date
        if (end < start) {
          return null; // Or throw an error if preferred
        }

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = end.getTime() - start.getTime();

        // Convert the difference to days
        const differenceInDays = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24)
        );

        return differenceInDays;
      }
      setFieldValue(
        'count',
        getDaysDifference(values.startDate, values.endDate)
      );
    }
  }, [values]);

  return (
    <Box>
      <Box
        sx={{
          padding: '5px 10px',
        }}
      >
        <Grid
          container
          p={'5px 5px 5px 20px'}
          sx={{
            background: darkBack ? '#F6F6F6' : '#FFF',
            borderRadius: '5px',
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '10px', md: '0px' },
          }}
        >
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                color: '#171717',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                paddingLeft: { xs: '0px', md: '20px' },
              }}
            >
              {title} {required && <span style={{ color: '#FF0000' }}>*</span>}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                borderRadius: '5px',
                width: '100%',
                background: '#F6F6F6',
              }}
            >
              {type === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className={[
                      error && 'error-border',
                      'custom-date-time-picker',
                    ].join(' ')}
                    open={isOpenDatePicker}
                    slots={{
                      openPickerIcon: () => (
                        <Image
                          src={`/icons/${suffixIcon}.svg`}
                          width={20}
                          height={20}
                          alt="Date"
                          onClick={() => setIsOpenDatePicker((ps) => !ps)}
                        />
                      ),
                      actionBar: () => (
                        <ActionBarComponent onClose={handleCloseDatePicker} />
                      ),
                    }}
                    sx={{ width: '100%', borderRadius: '50%' }}
                    value={value}
                    onChange={(e) => {
                      handleChangeInput(name, `${e?.$d}`);
                    }}
                    disabled={disabled}
                  />
                </LocalizationProvider>
              ) : type === 'time' ? (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ width: '100%' }}
                >
                  {name === 'expectedCheckIn' ? (
                    <DesktopTimePicker
                      className={[
                        error && 'error-border',
                        'custom-date-time-picker',
                      ].join(' ')}
                      open={false}
                      slots={{
                        openPickerIcon: () => null,
                      }}
                      sx={{ width: '100%' }}
                      defaultValue={dayjs('2022-04-17T10:00')}
                      disabled={disabled}
                    />
                  ) : name === 'expectedCheckOut' ? (
                    <DesktopTimePicker
                      className={[
                        error && 'error-border',
                        'custom-date-time-picker',
                      ].join(' ')}
                      open={false}
                      slots={{
                        openPickerIcon: () => null,
                      }}
                      sx={{ width: '100%' }}
                      defaultValue={dayjs('2022-04-17T19:00')}
                      disabled={disabled}
                    />
                  ) : (
                    <DesktopTimePicker
                      // className="custom-date-time-picker"
                      className={[
                        error && 'error-border',
                        'custom-date-time-picker',
                      ].join(' ')}
                      open={false}
                      slots={{
                        openPickerIcon: () => null,
                      }}
                      sx={{ width: '100%' }}
                      value={value}
                      onChange={(e) => {
                        handleChangeInput(name, `${e?.$d}`);
                      }}
                      disabled={disabled}
                    />
                  )}
                </LocalizationProvider>
              ) : type === 'select' ? (
                <AppDropdown
                  data={options}
                  setIsLoadingList={setIsLoadingTitles}
                  isLoadingList={isLoadingTitles}
                  selectedItem={value}
                  setSelectedItem={handleSelectItem}
                  placeHolder={placeholder}
                  mb={'0px'}
                  background="#F6F6F6"
                  isForm
                  name={name}
                  setFieldError={setFieldError}
                  error={error}
                  disabled={disabled}
                />
              ) : type === 'text-area' ? (
                <textarea
                  className="reason-text-area"
                  rows={3}
                  style={{
                    width: '100%',
                    border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => {
                    handleChangeInput(name, `${e?.target?.value}`);
                  }}
                  disabled={disabled}
                ></textarea>
              ) : // <Textarea
              //   name={name}
              //   sx={{
              //     width: '100%',
              //     background: '#f6f6f6',
              //     color: '#595959',
              //     fontSize: '16px',
              //     fontStyle: 'normal',
              //     fontWeight: 500,
              //     lineHeight: 'normal',
              //     border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
              //     borderRadius: '5px',

              //     '::placeholder': {
              //       color: '#595959',
              //     },
              //     '&:hover': {
              //       border: '1px solid #E4E4E4',
              //     },
              //     '&:focus': {
              //       border: '1px solid #E4E4E4',
              //     },
              //   }}
              //   minRows={4}
              //   placeholder="Write your description"
              //   value={value}
              //   onChange={(e) => {
              //     setFieldValue(name, `${e?.target?.value}`);
              //   }}
              //   disabled={disabled}
              // />
              type === 'file' ? (
                <label
                  style={{
                    width: '100%',
                  }}
                  htmlFor="input-attachment"
                >
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: `solid 1px ${error ? 'red' : '#E4E4E4'}`,
                      p: '9px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Box display={'flex'} flexDirection={'row'}>
                      <Typography
                        sx={{
                          color: '#595959',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: 'normal',
                        }}
                      >
                        {'uploadedFileName'}
                      </Typography>
                      <input
                        // onChange={handleUpload}
                        id="input-attachment"
                        type="file"
                        style={{ width: 0, height: 0, visibility: 'hidden' }}
                      />
                    </Box>

                    <Image
                      src={'/icons/Attachment.svg'}
                      width={20}
                      height={20}
                      alt="Attachment"
                    />
                  </Box>
                </label>
              ) : type === 'static' ? (
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                    width: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    {value || 0}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WideFormInput;
