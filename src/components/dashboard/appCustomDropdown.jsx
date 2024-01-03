import { toCamelCase } from '@/src/utils/stringModification';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const AppCustomDropdown = ({
  options = [
    { label: 'Short listed' },
    { label: 'Pending' },
    { label: 'Rejected' },
  ],
  colIndex,
  col,
  row,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState(row[toCamelCase(col)]);
  const componentRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <td
      key={colIndex}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'relative' }} ref={componentRef}>
        <Box
          onClick={() => setIsOpen((ps) => !ps)}
          width={'120px'}
          p={'5px 15px'}
          sx={{
            border: 'solid 1px #068987',
            backgroundColor: '#fff',
            borderRadius: '17px',
            color: 'teal',
            cursor: 'pointer',
          }}
          display="flex"
          justifyContent={'space-between'}
        >
          {currentState}

          {isOpen ? (
            <Image
              style={{ marginLeft: '10px' }}
              src={'/icons/DownGreen.svg'}
              width={10}
              height={10}
              alt="Down"
            />
          ) : (
            <Image
              style={{ marginLeft: '10px' }}
              src={'/images/hiring/icon-park_down.svg'}
              width={17}
              height={17}
              alt="Down"
            />
          )}
        </Box>
        {isOpen && (
          <Box
            sx={{
              zIndex: 1,
              border: 'solid 1px #ccc',
              position: 'absolute',
              width: '100%',
              background: '#fff',
              marginTop: '5px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {options.map(({ label, disabled }, index) => {
              return (
                <Typography
                  onClick={() => {
                    if (disabled) return;
                    else {
                      setCurrentState(label);
                      setIsOpen(false);
                    }
                  }}
                  className={[
                    currentState === label && 'selected-dropdown',
                    'custom-dropdown-item',
                    disabled && 'disabled-dropdown',
                  ].join(' ')}
                  p={'5px 10px'}
                  sx={{
                    borderBottom: 'solid 1px #ccc',
                    background: currentState === label && '#E6F5F4',
                  }}
                  key={index}
                >
                  {label}
                </Typography>
              );
            })}
          </Box>
        )}
      </Box>
    </td>
  );
};

export default AppCustomDropdown;
