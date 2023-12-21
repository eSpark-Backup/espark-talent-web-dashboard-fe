import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Input = ({
  prefixIcon,
  suffixIcon,
  handleChange,
  value,
  setIsLoading,
}) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      marginY={5}
      borderRadius={1}
      width={400}
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
          value={value}
          onChange={(e) => {
            setIsLoading(true);
            handleChange(e?.target?.value);
          }}
          className="search-input"
          placeholder="Search here..."
          style={{ overflow: 'hidden', width: '100%' }}
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
