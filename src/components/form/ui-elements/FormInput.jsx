'use client';
import React, { useRef, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import copy from 'copy-to-clipboard';

import AppDropdown from '../../dashboard/appDropdown';
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
  DesktopDateTimePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppSearchableDropdown from '../../dashboard/appSearchableDropdown';
import useMediaQuery from '@mui/material/useMediaQuery';

const DateTimePickerComponent = (props) => {
  const isXsScreen = useMediaQuery('(max-width:600px)');
  if (isXsScreen) {
    return <MobileDateTimePicker {...props} />;
  }
  return <DesktopDateTimePicker {...props} />;
};

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
  countries,
  searchable,
  suffixIconInside,
  handleData,
  readOnly,
  modalData,
}) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isCopied, setIsCopied] = useState();
  const [imageSrc, setImageSrc] = useState(
    `/images/hiring/${suffixIconInside}.svg`
  );

  const handleSelectItem = (item) => {
    const tempErrors = { ...errors };
    if (Object.hasOwnProperty.call(tempErrors, name)) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue(name, item);
    handleData(name, item);
  };
  const handleChangeInput = (field, value) => {
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
    handleData(field, value);
  };

  const handleChangeFileInput = (field, value) => {
    console.log('test', name, value);
    const tempErrors = { ...errors };
    if (value?.name) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue?.(field, value);
    handleData(field, value);
  };

  const handleClickCounter = (type, name, value) => {
    switch (type) {
      case 'Sub':
        switch (value) {
          case 0:
            break;
          default:
            setFieldValue(name, value - 1);
            handleData(name, value - 1);
            break;
        }
        break;

      case 'Add':
        switch (value) {
          case 10:
            break;
          default:
            setFieldValue(name, value + 1);
            handleData(name, value + 1);
            break;
        }
        break;
      default:
        break;
    }
  };

  const textRef = useRef();
  const copyToClipboard = () => {
    const copyText = textRef.current.value;
    const isCopy = copy(copyText);
    if (isCopy) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
    setImageSrc(`/images/hiring/copy.svg`);
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
      {title && (
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
      )}
      {type === 'select' ? (
        <>
          {searchable ? (
            <AppSearchableDropdown
              data={countries}
              selectedItem={value}
              setSelectedItem={handleSelectItem}
              setIsLoadingList={setIsLoadingList}
              isLoadingList={isLoadingList}
              md={12}
              withFlag
              error={error}
            />
          ) : (
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
          )}
        </>
      ) : type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className={[
              error ? 'error-border' : 'no-error-border',
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
      ) : type === 'time' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopTimePicker
            className={[
              error ? 'error-border' : 'no-error-border',
              'form-date-picker-component',
            ].join(' ')}
            slots={{
              openPickerIcon: () => (
                <Image
                  src={`/icons/ClockIcon.svg`}
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
      ) : type === 'date-and-time' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePickerComponent
            className={[
              error ? 'error-border' : 'no-error-border',
              'form-date-picker-component',
            ].join(' ')}
            slots={{
              openPickerIcon: () => (
                <Image
                  src={`/icons/${suffixIcon}.svg`}
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
            border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
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
                  justifyContent: 'flex-end',
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
              value={
                name === 'emailCredential'
                  ? modalData?.row?.email || ''
                  : name === 'passwordCredential'
                  ? modalData?.row?.password || ''
                  : '' || type !== 'file'
                  ? value
                  : null
              }
              placeholder={placeholder}
              className="form-input-field"
              type={type}
              ref={textRef}
              readOnly={readOnly}
              onChange={(e) => {
                if (type === 'file') {
                  handleChangeFileInput(name, e?.currentTarget.files[0]);
                } else {
                  handleChangeInput(name, e?.target?.value);
                }
              }}
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
                  cursor: 'pointer',
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
            {suffixIconInside && (
              <>
                <label
                  htmlFor={`input-file-${title}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={imageSrc}
                    width={50}
                    height={50}
                    alt="Calendar"
                    onClick={copyToClipboard}
                  />
                </label>
              </>
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
          {/* {imageUrl && <img src={imageUrl} />} */}
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
      {
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isCopied && 'Copied!'}
        </Box>
      }
    </Grid>
  );
};

export default FormInput;
