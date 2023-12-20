import React from 'react';
import PropTypes from 'prop-types';
import { toCamelCase } from '@/src/utils/stringModification';
import { Typography } from '@mui/material';

const AppTable = ({ column, data }) => {
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
                  return <td key={colIndex}>{row[toCamelCase(col)]}</td>;
                })}
              </tr>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td className="app-table-row" colSpan={column?.length}>
              <Typography variant='caption' sx={{width:'100%'}}>No Records Founds</Typography>
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

export default AppTable;
