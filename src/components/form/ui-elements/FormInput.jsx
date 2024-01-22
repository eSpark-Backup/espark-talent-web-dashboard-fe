'use client';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

import AppDropdown from '../../dashboard/appDropdown';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FormInput = ({
  xs = 12,
  sm = 6,
  md = 4,
  lg = 3,
  title,
  placeholder,
  prefixIcon,
  type = 'text',
  suffixIcon,
  options,
  nested,
  name,
  setFieldValue,
  value,
  values,
  error,
  setFieldError,
  errors,
  setErrors,
  fields,
  suffixIconOutside,
  onClick,
}) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
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
  const handleChangeFileInput = (field, value) => {
    const tempErrors = { ...errors };
    if (value?.name) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue?.(field, value);
  };

  const handleClickCounter = (type, name, value) => {
    switch (type) {
      case 'Sub':
        switch (value) {
          case 0:
            break;
          default:
            setFieldValue(name, value - 1);
            break;
        }
        break;

      case 'Add':
        switch (value) {
          case 10:
            break;
          default:
            setFieldValue(name, value + 1);
            break;
        }
        break;
      default:
        break;
    }
  };

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      sx={{
        position: 'relative',
        mb: { xs: '30px', md: '30px' },
        padding: '0 10px',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: error ? 'red' : '#595959',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            mb: '10px',
          }}
        >
          {title}
        </Typography>
      </Box>
      {type === 'select' ? (
        <AppDropdown
          data={options}
          placeHolder={'Select'}
          selectedItem={value}
          setSelectedItem={handleSelectItem}
          isLoadingList={isLoadingList}
          setIsLoadingList={setIsLoadingList}
          nested={nested}
          mb={'0px'}
          error={error}
          isForm
          setFieldError={setFieldError}
          name={name}
        />
      ) : type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className={[
              error && 'error-border',
              'form-date-picker-component',
            ].join(' ')}
            slots={{
              openPickerIcon: () => (
                <Image
                  src="/images/hiring/calender.svg"
                  width={30}
                  height={30}
                  alt="calender"
                />
              ),
            }}
            placeholder={placeholder}
            slotProps={{
              textField: {
                placeholder: placeholder,
                sx: {
                  '& input': {
                    color: '#88888',
                    padding: '9.95px 10px',
                    width: '100%',
                  },
                },
              },
            }}
            sx={{
              width: '100%',
              height: '40px',
              '@media (min-width: 900px) and (max-width: 1400px)': {
                width: '100%',
              },
            }}
            value={value}
            onChange={(e) => {
              handleChangeInput(name, `${e?.$d}`);
            }}
          />
        </LocalizationProvider>
      ) : type === 'input-range' ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {fields?.map((field, fieldIndex) => (
            <>
              {fieldIndex === 1 && (
                <Box
                  sx={{
                    mx: '10px',
                    width: '20px',
                    height: '1px',
                    background: '#000',
                  }}
                />
              )}
              <Box
                sx={{
                  border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
                  borderRadius: '5px',
                  display: 'flex',
                  overflow: 'hidden',
                  height: '40px',
                }}
              >
                <input
                  style={{
                    background: '#FFF',
                    display: type === 'file' && 'none',
                  }}
                  placeholder={field.placeholder}
                  className="form-input-field"
                  type={type}
                  onChange={(e) => {
                    handleChangeInput(
                      `${name}.${field.name}`,
                      e?.target?.value
                    );
                  }}
                  value={values[`${name}.${field.name}`]}
                />
                {field.suffixIcon && (
                  <Box
                    sx={{
                      display: 'flex',
                      padding: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={`/icons/${field.suffixIcon}.svg`}
                      width={17}
                      height={17}
                      alt="Calendar"
                    />
                  </Box>
                )}
              </Box>
            </>
          ))}
        </Box>
      ) : type === 'add-sub-counter' ? (
        <Box
          sx={{
            border: 'solid 1px #ccc',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '5px',
            padding: '5px',
          }}
        >
          <Box
            sx={{
              width: '30px',
              height: '30px',
              background: value === 0 ? '#888888' : '#068987',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleClickCounter('Sub', name, value)}
          >
            <Box
              component={'img'}
              src="/icons/MinusIcon.svg"
              sx={{ maxWidth: '70%' }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                color: '#888',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textAlign: 'center',
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '30px',
              height: '30px',
              background: value === 10 ? '#888888' : '#068987',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleClickCounter('Add', name, value)}
          >
            <Box
              component={'img'}
              src="/icons/PlusIcon.svg"
              sx={{ maxWidth: '70%' }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
              borderRadius: '5px',
              display: 'flex',
              overflow: 'hidden',
              height: '40px',
              flex: 1,
            }}
          >
            {prefixIcon && (
              <label
                htmlFor={`input-file-${title}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '40px',
                    height: '40px',
                    padding: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: type === 'file' && '#068987',
                  }}
                >
                  <Image
                    src={`/icons/${prefixIcon}.svg`}
                    width={20}
                    height={20}
                    alt="Upload"
                  />
                </Box>
              </label>
            )}
            <input
              id={`input-file-${title}`}
              style={{
                background: '#FFF',
                display: type === 'file' && 'none',
              }}
              placeholder={placeholder}
              className="form-input-field"
              type={type}
              onChange={(e) => {
                if (type === 'file') {
                  handleChangeFileInput(name, e?.currentTarget.files[0]);
                } else {
                  handleChangeInput(name, e?.target?.value);
                }
              }}
              value={type !== 'file' ? value : null}
              accept=".png"
            />
            {suffixIcon && (
              <label
                htmlFor={`input-file-${title}`}
                style={{
                  display: 'flex',
                  padding: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={`/images/hiring/${suffixIcon}.svg`}
                  width={30}
                  height={30}
                  alt="Calendar"
                />
              </label>
            )}
            {type === 'file' && (
              <label
                className="file-upload-label"
                htmlFor={`input-file-${title}`}
              >
                {value?.name || placeholder}
              </label>
            )}
          </Box>
          {suffixIconOutside && (
            <Box
              src={`/icons/${suffixIconOutside}.svg`}
              component={'img'}
              sx={{
                width: { xs: '20px', md: '30px' },
                height: { xs: '20px', md: '30px' },
                position: 'absolute',
                right: { xs: '-30px', md: '-40px' },
                '@media (min-width: 900px) and (max-width: 1200px)': {
                  width: '20px',
                  height: '20px',
                  marginRight: '20px',
                },
              }}
              onClick={onClick}
            ></Box>
          )}
        </Box>
      )}
    </Grid>
  );
};

export default FormInput;
