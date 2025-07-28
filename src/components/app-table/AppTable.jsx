import { memo } from 'react';

import { Box, Pagination, Stack } from '@mui/material';
import TableHead from '@/src/components/app-table/AppTableHead';
import AppTableBody from '@/src/components/app-table/AppTableBody';

const AppTable = ({
  column,
  data,
  renderMessage,
  handleClick,
  renderMessageButton,
  handleClickRenderMessageButton,
  handleClickActionView,
  handleEditImage,
  handleClickActionDelete,
  noPagination,
  minWidth,
  options,
  tableRowClass,
}) => {
  return (
    <>
      <table
        className={['table', !minWidth && 'table-min-width'].join(' ')}
        style={{ minWidth: minWidth && minWidth }}
      >
        <TableHead column={column} />
        <AppTableBody
          column={column}
          data={data}
          renderMessage={renderMessage}
          handleClickActionView={handleClickActionView}
          handleEditImage={handleEditImage}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
          handleClick={handleClick}
          handleClickActionDelete={handleClickActionDelete}
          options={options}
          tableRowClass={tableRowClass}
        />
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

export default memo(AppTable);
