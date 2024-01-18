import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toCamelCase } from '@/src/utils/stringModification';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import AppCustomDropdown from './appCustomDropdown';
import { trackingStatusTypes } from '@/src/constants/data/tables/timeTracking';
import TableHiddenBody from './appTableHiddenBody';
import TableHead from './AppTableHead';
import AppTableBody from './AppTableBody';

const renderAttendenceStatus = (statusType, index) => {
  const status = trackingStatusTypes?.find(
    ({ shortForm }) => shortForm === statusType
  );
  return (
    <Box
      key={index}
      sx={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: status.background,
        color: '#fff',
      }}
      mr={'10px'}
      display={'flex'}
      fontSize={'12px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {statusType}
    </Box>
  );
};
const InfoOption = ({
  row,
  col,
  handleClick,
  handleClickRenderMessageButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <Box
      sx={{
        width: '90px',
        position: 'relative',
      }}
      ref={componentRef}
    >
      <Box
        onClick={() => setIsOpen((ps) => !ps)}
        sx={{
          border: 'solid 1px #ccc',
          borderRadius: '5px',
          backgroundColor: '#fff',
        }}
        justifyContent={'center'}
        p="7px 10px"
        display={'flex'}
        alignItems="center"
      >
        <Box>
          <Image
            src={'/icons/OptionDots.svg'}
            width={20}
            height={20}
            alt="Options"
          />
        </Box>
        <Box>{row[toCamelCase(col || col?.title)]}</Box>
      </Box>
      {isOpen && (
        <Box
          sx={{
            border: 'solid 1px #ccc',
            borderRadius: '5px',
            marginTop: '10px',
            position: 'absolute',
            backgroundColor: '#fff',
            width: '120px',
          }}
        >
          <Box
            onClick={handleClick}
            sx={{
              borderBottom: 'solid 1px #ccc',
              padding: '7px 10px',
              cursor: 'pointer',
            }}
          >
            View details
          </Box>
          <Box
            onClick={handleClickRenderMessageButton}
            sx={{
              padding: '7px 10px',
              cursor: 'pointer',
            }}
          >
            Add member
          </Box>
        </Box>
      )}
    </Box>
  );
};

const AppTable = ({
  column,
  data,
  renderMessage,
  handleClick,
  renderMessageButton,
  handleClickRenderMessageButton,
  handleClickActionView,
  noPagination,
  minWidth,
}) => {
  console.log({ data });
  return (
    <>
      <table
        className={['table', !minWidth && 'table-min-width'].join(' ')}
        style={{ minWidth: minWidth && minWidth }}
      >
        <TableHead column={column} />
        <AppTableBody
          column={column}
          data={data}
          renderMessage={renderMessage}
          handleClickActionView={handleClickActionView}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
        />
      </table>
      {!noPagination && (
        <Box my={'20px'} display="flex" justifyContent={'center'}>
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </Box>
      )}
    </>
  );
};

AppTable.propTypes = {
  prefixIcon: PropTypes.array,
  suffixIcon: PropTypes.array,
};

export default memo(AppTable);
