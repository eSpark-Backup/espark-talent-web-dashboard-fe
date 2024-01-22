import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import TableHiddenBody from './appTableHiddenBody';
import { renderCellContent } from './AppTableCell';

const AppTableBody = ({
  data,
  column,
  renderMessage,
  handleClickActionView,
  handleClickRenderMessageButton,
  renderMessageButton,
  handleClick,
  handleClickActionDelete,
  options,
}) => {
  const commonCellStyle = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
  };

  return (
    <tbody>
      {renderMessage ? (
        <TableHiddenBody
          renderMessage={renderMessage}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
        />
      ) : data?.length ? (
        data.map((row, rowIndex) => (
          <tr className="app-table-row" key={rowIndex}>
            {column?.map((col, colIndex) => (
              <Fragment key={colIndex}>
                {renderCellContent(
                  row,
                  col,
                  handleClickActionView,
                  commonCellStyle,
                  handleClick,
                  handleClickRenderMessageButton,
                  colIndex,
                  rowIndex,
                  handleClickActionDelete,
                  options
                )}
              </Fragment>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td className="app-table-row" colSpan={column?.length}>
            <Typography variant="caption" sx={{ width: '100%' }}>
              No Records Found
            </Typography>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default AppTableBody;
