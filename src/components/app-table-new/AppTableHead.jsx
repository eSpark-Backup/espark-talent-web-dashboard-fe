import { Box } from '@mui/material';

const TableHead = ({ column, commonRowStyle }) => {
  return (
    <thead>
      <tr className="app-table-row" style={{ ...commonRowStyle }}>
        {column?.map((col, colIndex) => (
          <th
            key={colIndex}
            style={{
              fontSize: '14px',
              flex: col?.flex ? col?.flex : 1,
              display: col?.isIconTitle ? 'flex' : 'block',
              justifyContent: col?.isIconTitle ? 'center' : 'initial',
              textAlign: col?.isIconTitle
                ? 'center'
                : col?.textAlign || 'center',
            }}
          >
            {col?.isIconTitle ? (
              <Box component="img" src={col.src} alt="Profile Pic" />
            ) : (
              (col?.title || col)?.replace(/_/g, ' ')
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
