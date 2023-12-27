import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toCamelCase } from '@/src/utils/stringModification';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import AppCustomDropdown from './appCustomDropdown';
import { trackingStatusTypes } from '@/src/constants/data/timeTracking';

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
        <Box>{row[toCamelCase(col)]}</Box>
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
  handleOpen
}) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr className="app-table-row">
            {column?.map((col, colIndex) => (
              <th key={colIndex}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderMessage ? (
            [...Array(5)].map((_, index) => (
              <tr
                key={index}
                style={{
                  background: index === 2 && '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                className="app-table-row"
              >
                {index === 2 ? (
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Typography
                      sx={{
                        fontSize: '24px',
                        fontWeight: 400,
                        lineHeight: '29px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                      }}
                      variant="body1"
                      textAlign={'center'}
                    >
                      {renderMessage}
                    </Typography>
                    <Button
                      onClick={handleClickRenderMessageButton}
                      sx={{ marginTop: '20px' }}
                      variant="contained"
                    >
                      {renderMessageButton}
                    </Button>
                  </Box>
                ) : (
                  <td />
                )}
              </tr>
            ))
          ) : data?.length ? (
            data.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <tr className="app-table-row">
                  {column?.map((col, colIndex) => {
                    if (row?.actionStatus && col === 'Status') {
                      if (row?.status === 'Pending')
                        return (
                          <td
                            key={colIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <span
                              style={{
                                borderRadius: '30px',
                                padding: '10px 0',
                                display: 'block',
                                width: '110px',
                                background: '#F6E9D0',
                                border: 'solid 1px #CB8822',
                                color: '#CB8822',
                              }}
                            >
                              {row[toCamelCase(col)]}
                            </span>
                          </td>
                        );
                      else if (row?.status === 'Completed')
                        return (
                          <td
                            key={colIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <span
                              style={{
                                borderRadius: '30px',
                                padding: '10px 0',
                                display: 'block',
                                width: '110px',
                                background: '#E6F5F4',
                                border: 'solid 1px #068987',
                                color: '#068987',
                              }}
                            >
                              {row[toCamelCase(col)]}
                            </span>
                          </td>
                        );
                      return (
                        <td
                          key={colIndex}
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <span
                            style={{
                              borderRadius: '30px',
                              padding: '10px 0',
                              display: 'block',
                              width: '110px',
                              background: '#FFD6D6',
                              border: 'solid 1px #A72A45',
                              color: '#A72A45',
                            }}
                          >
                            {row[toCamelCase(col)]}
                          </span>
                        </td>
                      );
                    } else if (row?.actionStatus && col === 'Action') {
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Image
                            src={'/icons/Delete.svg'}
                            width={30}
                            height={30}
                            alt="Delete"
                          />
                        </td>
                      );
                    } else if (row?.dropdownStatus) {
                      if (col === 'Payment status') {
                        return (
                          <Fragment key={colIndex}>
                            <AppCustomDropdown
                              col={col}
                              colIndex={colIndex}
                              row={row}
                              options={[
                                { label: 'Pending' },
                                { label: 'Processing' },
                                { label: 'Paid', disabled: true },
                              ]}
                            />
                          </Fragment>
                        );
                      } else if (col === 'Status')
                        return (
                          <Fragment key={colIndex}>
                            <AppCustomDropdown
                              col={col}
                              colIndex={colIndex}
                              row={row}
                            />
                          </Fragment>
                        );
                    } else if (row?.optionsDropdown && col === 'Team members') {
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <InfoOption
                            row={row}
                            col={col}
                            handleClick={handleClick}
                            handleClickRenderMessageButton={
                              handleClickRenderMessageButton
                            }
                          />
                        </td>
                      );
                    }
                    return (
                      <Fragment key={colIndex}>
                        <td
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          {col === 'Action' ? (
                            <>
                              {row[toCamelCase(col)]?.map((item, rowIndex) => (
                                <Image
                                  onClick={() => handleOpen(item)}
                                  key={rowIndex}
                                  style={{ margin: rowIndex === 1 && '0 5px' }}
                                  width={25}
                                  height={25}
                                  alt="Icon"
                                  src={`/icons/${item}.svg`}
                                />
                              ))}
                            </>
                          ) : col === 'Attendence Status' ? (
                            <>
                              {row[toCamelCase(col)]?.map((item, index) =>
                                renderAttendenceStatus(item, index)
                              )}
                            </>
                          ) : col === 'Download' ? (
                            <span
                              style={{
                                borderRadius: '30px',
                                padding: '10px 0',
                                display: 'block',
                                width: '110px',
                                background: '#E6F5F4',
                                border: 'solid 1px #068987',
                                color: '#068987',
                              }}
                            >
                              {row[toCamelCase(col)]}
                            </span>
                          ) : (
                            <>
                              {row[toCamelCase(col)] === null
                                ? '-'
                                : row[toCamelCase(col)]}
                            </>
                          )}
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              </Fragment>
            ))
          ) : (
            <tr>
              <td className="app-table-row" colSpan={column?.length}>
                <Typography variant="caption" sx={{ width: '100%' }}>
                  No Records Founds
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Box my={'20px'} display="flex" justifyContent={'center'}>
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Box>
    </>
  );
};

AppTable.propTypes = {
  prefixIcon: PropTypes.array,
  suffixIcon: PropTypes.array,
};

export default memo(AppTable);
