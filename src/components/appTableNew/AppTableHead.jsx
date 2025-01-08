import { Box } from '@mui/material';
import React from 'react';

const TableHead = ({ column, commonRowStyle }) => {
  return (
    <thead>
      <tr className="app-table-row" style={{ ...commonRowStyle }}>
        {column?.map((col, colIndex) => (
          <React.Fragment key={colIndex}>
            {col?.isIconTitle ? (
              <th
                key={colIndex}
                style={{
                  fontSize: '14px',
                  flex: col?.flex ? col?.flex : 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box component="img" src={col?.src} alt="Profile Pic" />
              </th>
            ) : (
              <th
                key={colIndex}
                style={{
                  fontSize: '14px',
                  flex: col?.flex ? col?.flex : 1,
                  textAlign: col?.textAlign || 'center',
                }}
              >
                {(col?.title || col)?.replace(/_/g, ' ')}
              </th>
            )}
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
