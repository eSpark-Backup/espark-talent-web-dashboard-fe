import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TableHead from './AppTableHead';
import AppTableBody from './AppTableBody';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AppTable = ({
  column,
  data = [],
  renderMessage,
  handleClick,
  renderMessageButton,
  handleClickRenderMessageButton,
  handleClickActionView,
  handleClickActionDelete,
  noPagination,
  minWidth,
  options,
  tableRowClass,
  hanldeInvLinkClick,
  updateStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Calculate the index range for the current page
  const startIndex = !noPagination && (currentPage - 1) * itemsPerPage;
  const endIndex = !noPagination && startIndex + itemsPerPage;

  // Slice the data array to get the items for the current page
  const currentPageData = !noPagination && data.slice(startIndex, endIndex);

  return (
    <>
      <table
        className={['table', !minWidth && 'table-min-width'].join(' ')}
        style={{ minWidth: minWidth && minWidth }}
      >
        <TableHead column={column} />
        <AppTableBody
          column={column}
          // data={data}
          data={!noPagination ? currentPageData : data}
          renderMessage={renderMessage}
          handleClickActionView={handleClickActionView}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
          handleClick={handleClick}
          handleClickActionDelete={handleClickActionDelete}
          options={options}
          tableRowClass={tableRowClass}
          hanldeInvLinkClick={hanldeInvLinkClick}
          updateStatus={updateStatus}
        />
      </table>
      {!noPagination && (
        <Box my={'20px'} display="flex" justifyContent={'center'}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(data?.length / itemsPerPage) || 1}
              // count={10}
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
            />
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
