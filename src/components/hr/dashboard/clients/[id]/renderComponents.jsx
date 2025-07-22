import AppTable from '@/src/components/app-table-new/AppTable';
import { Box } from '@mui/material';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import ClientEmployees from '@/src/components/hr/ClientEmployees';

export const renderTable = ({
  currentTab,
  data,
  column,
  openModal,
  isOpen,
  handleClose,
  handleOpen,
  handleConfirmDelete,
  handleClickDownload,
  updateStatus,
  isPending,
  isLoading,
  minWidth,
  handleClickActionView,
  handleClickActionDelete,
  handleClickActionEdit,
  rejectReq,
  approveReq,
  viewClicked,
}) => {
  if (currentTab !== 'Employees') {
    return (
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable
          updateStatus={updateStatus}
          minWidth={minWidth}
          currentTab={currentTab}
          column={column}
          data={data}
          handleOpen={handleOpen}
          handleClickDownload={handleClickDownload}
          handleClickActionDelete={handleClickActionDelete}
          handleClickActionEdit={handleClickActionEdit}
          handleClickActionView={handleClickActionView}
          rejectReq={rejectReq}
          approveReq={approveReq}
          isLoading={isLoading}
          viewClicked={viewClicked}
        />
        <AppConfirmationMadal
          title={'Delete'}
          bodyText="Are you sure you want to delete this request"
          cancelButtonText={'Cancel'}
          confirmButtonText={'Delete'}
          handleClose={handleClose}
          handleConfirm={handleConfirmDelete}
          isOpen={isOpen}
          isLoading={isPending}
        />
      </Box>
    );
  } else
    return <ClientEmployees empData={data} openModal={openModal} fromClient />;
};
