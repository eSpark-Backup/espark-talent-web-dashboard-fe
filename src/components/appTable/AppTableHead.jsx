import { Box } from '@mui/material';
import React from 'react';

const TableHead = ({ column }) => {
  return (
    <thead>
      <tr className="app-table-row">
        {column?.map((col, colIndex) =>
          col?.isIconTitle ? (
            <th
              key={`icon-${colIndex}`}
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
              key={`text-${colIndex}`}
              style={{
                fontSize: '14px',
                flex: col?.flex ? col?.flex : 1,
                textAlign: col?.textAlign || 'center',
              }}
            >
              {(col?.title || col)?.replace(/_/g, ' ')}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
