import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Input = ({
  prefixIcon,
  suffixIcon,
  handleChange,
  value,
  setIsLoading,
  width,
  onKeyDown,
  autofocus,
}) => {
  const inputRef = useRef(null);

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
      maxWidth={'100%'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{ border: 'solid 1px #ccc' }}
        padding={1}
        borderRadius={1}
        width={'100%'}
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
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setIsLoading(true);
            handleChange(e?.target?.value);
          }}
          className="search-input"
          placeholder="Search here..."
          style={{ overflow: 'hidden', width: '100%' }}
          onKeyDown={onKeyDown}
        />
      </Box>
      {!!suffixIcon && (
        <Box sx={{ marginX: 1 }}>
          <Image
            width={18}
            height={18}
            alt="help"
            src="/icons/QuestionMarkIcon.svg"
          />
        </Box>
      )}
    </Box>
  );
};

Input.propTypes = {
  prefixIcon: PropTypes.string,
  suffixIcon: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  setIsLoading: PropTypes.func,
};

export default Input;
