import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toCamelCase } from '@/src/utils/stringModification';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import AppCustomDropdown from './appCustomDropdown';
import { trackingStatusTypes } from '@/src/constants/data/tables/timeTracking';
import TableHead from './appTableHead';
import TableHiddenBody from './appTableHiddenBody';

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
  console.log({data})
  return (
    <>
      <table
        className={['table', !minWidth && 'table-min-width'].join(' ')}
        style={{ minWidth: minWidth && minWidth }}
      >
        <TableHead column={column} />
        <tbody>
          {renderMessage ? (
            <TableHiddenBody
              renderMessage={renderMessage}
              handleClickRenderMessageButton={handleClickRenderMessageButton}
              renderMessageButton={renderMessageButton}
            />
          ) : data?.length ? (
            data.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <tr className="app-table-row">
                  {column?.map((col, colIndex) => {
                    if (row?.pic && (col === 'Pic' || col.title === 'Pic')) {
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '12px',
                            flex: col?.flex || 1,
                          }}
                        >
                          <Box component="img" src={row?.pic} />
                        </td>
                      );
                    }
                    if(row?.formActionStatus && (col === 'Action' || col.title === 'Action')) {
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '12px',
                            flex: col?.flex || 1,
                          }}
                        >
                          <Image
                            onClick={() => {
                              handleClickActionView(row?.id);
                            }}
                            style={{
                              margin: rowIndex === 1 && '0 5px',
                              cursor: 'pointer',
                            }}
                            width={25}
                            height={25}
                            alt="Icon"
                            src={`/icons/${row?.isSelected ? row?.action[1] : row?.action[0] }.svg`}
                          />
                        </td>
                      )
                    }
                    if (
                      row?.actionStatus &&
                      !row?.attendenceShortHand &&
                      (col === 'Status' || col?.title === 'Status')
                    ) {
                      if (row?.status === 'Pending')
                        return (
                          <td
                            key={colIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              fontSize: '12px',
                              flex: col?.flex || 1,
                            }}
                          >
                            <span
                              style={{
                                borderRadius: '30px',
                                padding: '4px 0',
                                display: 'block',
                                width: '110px',
                                background: '#F6E9D0',
                                border: 'solid 1px #CB8822',
                                color: '#CB8822',
                              }}
                            >
                              {row[toCamelCase(col || col?.title)]}
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
                              fontSize: '12px',
                              flex: col?.flex || 1,
                            }}
                          >
                            <span
                              style={{
                                borderRadius: '30px',
                                padding: '4px 0',
                                display: 'block',
                                width: '110px',
                                background: '#E6F5F4',
                                border: 'solid 1px #068987',
                                color: '#068987',
                              }}
                            >
                              {row[toCamelCase(col || col?.title)]}
                            </span>
                          </td>
                        );
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '12px',
                            flex: col?.flex || 1,
                          }}
                        >
                          <span
                            style={{
                              borderRadius: '30px',
                              padding: '4px 0',
                              display: 'block',
                              width: '110px',
                              background: '#FFD6D6',
                              border: 'solid 1px #A72A45',
                              color: '#A72A45',
                            }}
                          >
                            {row[toCamelCase(col || col?.title)]}
                          </span>
                        </td>
                      );
                    } else if (
                      row?.actionStatus &&
                      (col === 'Action' ||
                        col?.title === 'Action' ||
                        col === 'Actions' ||
                        col?.title === 'Actions') &&
                      row[toCamelCase(col || col?.title)]?.[0] === 'Delete'
                    ) {
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: col?.flex || 1,
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
                      if (
                        col === 'Payment status' ||
                        col?.title === 'Payment status'
                      ) {
                        return (
                          <td
                            key={colIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              flex: col?.flex || 1,
                            }}
                          >
                            <AppCustomDropdown
                              col={col || col?.title}
                              colIndex={colIndex}
                              row={row}
                              options={[
                                { label: 'Pending' },
                                { label: 'Processing' },
                                { label: 'Paid' },
                              ]}
                            />
                          </td>
                        );
                      } else if (col === 'Status' || col?.title === 'Status')
                        return (
                          <td
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              flex: col?.flex || 1,
                            }}
                            key={colIndex}
                          >
                            <AppCustomDropdown
                              col={col || col?.title}
                              colIndex={colIndex}
                              row={row}
                            />
                          </td>
                        );
                    } else if (
                      row?.optionsDropdown &&
                      (col === 'Team members' || col?.title === 'Team members')
                    ) {
                      return (
                        <td
                          key={colIndex}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            flex: col?.flex || 1,
                          }}
                        >
                          <InfoOption
                            row={row}
                            col={col || col?.title}
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
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: col?.flex || 1,
                          }}
                        >
                          {col === 'Action' ||
                          col?.title === 'Action' ||
                          col === 'Actions' ||
                          col?.title === 'Actions' ? (
                            <>
                              {row[toCamelCase(col || col?.title)]?.map(
                                (item, rowIndex) => (
                                  <Image
                                    onClick={() => {
                                      if (item === 'View') {
                                        handleClickActionView({ row, item });
                                      }
                                      return;
                                    }}
                                    key={rowIndex}
                                    style={{
                                      margin: rowIndex === 1 && '0 5px',
                                      cursor: 'pointer',
                                    }}
                                    width={25}
                                    height={25}
                                    alt="Icon"
                                    src={`/icons/${item}.svg`}
                                  />
                                )
                              )}
                            </>
                          ) : (row?.attendenceShortHand &&
                              col === 'Attendence Status') ||
                            col?.title === 'Attendence Status' ||
                            (row?.attendenceShortHand &&
                              (col === 'Status' || col?.title === 'Status')) ? (
                            <>
                              {row[toCamelCase(col || col?.title)]?.map(
                                (item, index) =>
                                  renderAttendenceStatus(item, index)
                              )}
                            </>
                          ) : col === 'Download' ||
                            col?.title === 'Download' ? (
                            <span
                              style={{
                                borderRadius: '30px',
                                padding: '5px 0',
                                display: 'block',
                                width: '120px',
                                background: '#E6F5F4',
                                border: 'solid 1px #068987',
                                color: '#068987',
                              }}
                            >
                              {row[toCamelCase(col || col?.title)]}
                            </span>
                          ) : (
                            <>
                              {row[toCamelCase(col || col?.title)] === null
                                ? '-'
                                : row[toCamelCase(col || col?.title)]}
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
