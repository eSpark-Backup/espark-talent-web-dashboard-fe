import AppTable from '@/src/components/dashboard/appTable';
import AllEmployee from '@/src/components/HR/AllEmployee';
import { Box } from '@mui/material';

export const renderTable = ({ currentTab, data, column, openModal }) => {
  if (currentTab !== 'Employees') {
    return (
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable data={data} column={column} />
      </Box>
    );
  } else return <AllEmployee openModal={openModal} fromClient />;
};
