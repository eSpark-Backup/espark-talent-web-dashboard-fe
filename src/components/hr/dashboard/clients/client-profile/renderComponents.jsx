import AllEmployee from '@/src/components/hr/AllEmployee';
import AppTable from '@/src/components/app-table/AppTable';
import { Box } from '@mui/material';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';

export const renderTable = ({
  currentTab,
  data,
  column,
  openModal,
  isOpen,
  handleClose,
  handleOpen,
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
          data={data}
          column={column}
          handleClickActionDelete={handleOpen}
        />
        <AppConfirmationMadal
          title={'Delete'}
          bodyText="Are you sure you want to delete this request"
          cancelButtonText={'Cancel'}
          confirmButtonText={'Delete'}
          handleClose={handleClose}
          isOpen={isOpen}
        />
      </Box>
    );
  } else return <AllEmployee openModal={openModal} fromClient />;
};
