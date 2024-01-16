import React from 'react';

const TableHead = ({column}) => {
  return (
    <thead>
      <tr className="app-table-row">
        {column?.map((col, colIndex) => (
          <th
            key={colIndex}
            style={{ fontSize: '14px', flex: col?.flex ? col?.flex : 1 }}
          >
            {col?.title || col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
