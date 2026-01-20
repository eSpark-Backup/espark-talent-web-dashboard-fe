import React, { useEffect, useRef } from 'react';
import { Box, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Input = ({
  disabled = false,
  prefixIcon,
  suffixIcon,
  handleChange,
  value,
  width,
  onKeyDown,
  autofocus,
  maxWidth,
  placeHolder,
  name,
  tooltip,
}) => {
  const inputRef = useRef(null);
  const pathName = usePathname();
  const addClient = pathName.includes('/hr/dashboard/clients/add-client');

  useEffect(() => {
    if (autofocus) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      borderRadius={1}
      width={width || 400}
      maxWidth={maxWidth || '100%'}
    >
      <Box
        display={'flex'}
        flex={1}
        alignItems={'center'}
        sx={
          addClient
            ? { borderBottom: 'solid 1px #ccc', borderRadius: '0px' }
            : {
                border: disabled ? '1px solid #E0E0E0' : '1px solid #ccc',
                backgroundColor: disabled ? '#F2F2F2' : 'transparent',
                color: disabled ? '#9E9E9E' : '#000',
                cursor: disabled ? 'not-allowed' : 'text',
              }
        }
        padding={1}
        borderRadius={1}
        width={'100%'}
        height={40}
      >
        {!!prefixIcon && (
          <Box sx={{ marginRight: 1 }}>
            <Image
              width={16}
              height={16}
              alt="Search"
              src={`/icons/SearchIcon.svg`}
            />
          </Box>
        )}
        <input
          disabled={disabled}
          ref={inputRef}
          value={value}
          onChange={(e) => {
            handleChange?.(e?.target?.value);
          }}
          className="search-input"
          placeholder={placeHolder || 'Search here...'}
          style={{
            overflow: 'hidden',
            width: '100%',
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onKeyDown={onKeyDown}
          name={name || ''}
        />
      </Box>
      {!!suffixIcon && (
        <Tooltip title={tooltip || ''} placement="right-start">
          <Box sx={{ marginX: 1 }}>
            <Image
              width={24}
              height={24}
              alt="help"
              src="/icons/QuestionMarkIcon.svg"
            />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

Input.propTypes = {
  prefixIcon: PropTypes.string,
  suffixIcon: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
