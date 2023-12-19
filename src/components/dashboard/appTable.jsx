import React from 'react';
import PropTypes from 'prop-types';
import { toCamelCase } from '@/src/utils';

const AppTable = ({ column, data }) => {
  return (
    <table className="table">
      <thead>
        <tr className="app-table-row">
          {column?.map((col, colIndex) => (
            <th key={colIndex}>{col}</th>
          ))}
        </tr>
        <tr className="empty-row" />
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
              {rowIndex < data?.length - 1 && <tr className="empty-row" />}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={column?.length}>No Records Found</td>
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
