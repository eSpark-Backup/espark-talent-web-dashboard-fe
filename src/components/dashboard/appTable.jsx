import React from 'react';
import PropTypes from 'prop-types';
import { toCamelCase } from '@/src/utils/stringModification';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { trackingStatusTypes } from '@/src/constants/data/timeTracking';

const renderAttendenceStatus = (statusType) => {
  const status = trackingStatusTypes?.find(
    ({ shortForm }) => shortForm === statusType
  );
  return (
    <Box
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

const AppTable = ({ column, data }) => {
  console.log({ data });
  return (
    <table className="table">
      <thead>
        <tr className="app-table-row">
          {column?.map((col, colIndex) => (
            <th key={colIndex}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length ? (
          data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr className="app-table-row">
                {column?.map((col, colIndex) => {
                  if (row?.actionStatus && col === 'Status') {
                    if (row?.status === 'Pending')
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
                          style={{ display: 'flex', justifyContent: 'center' }}
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
                  }
                  return (
                    <td
                      key={colIndex}
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      {col === 'Action' ? (
                        <>
                          {row[toCamelCase(col)]?.map((item, rowIndex) => (
                            <Image
                              key={rowIndex}
                              style={{ margin: rowIndex === 1 && '0 5px' }}
                              width={25}
                              height={25}
                              alt="Icon"
                              src={`/icons/${item}.svg`}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {col === 'Attendence Status' ? (
                            <>
                              {row[toCamelCase(col)]?.map((item) =>
                                renderAttendenceStatus(item)
                              )}
                            </>
                          ) : (
                            <>
                              {row[toCamelCase(col)] === null
                                ? '-'
                                : row[toCamelCase(col)]}
                            </>
                          )}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            </React.Fragment>
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
  );
};

AppTable.propTypes = {
  prefixIcon: PropTypes.array,
  suffixIcon: PropTypes.array,
};

export default React.memo(AppTable);
