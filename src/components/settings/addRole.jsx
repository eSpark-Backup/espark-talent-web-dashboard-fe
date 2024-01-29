import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import AppTable from '../appTable/AppTable';
import {
  modulepermissionColumn,
  modulepermissionData,
} from '@/src/constants/data/tables/modulePermission';

const Role = () => {
  return (
    <>
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid
                  item
                  xs={12}
                  md={3}
          sx={{
            borderRadius: '5px',
            background: '#F6F6F6',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
              display: "flex",
            flexDirection:"column"
          }}
        >
         
            <Button>Add Role</Button>
            <Button>HR</Button>
            <Button>Admin</Button>
            <Button>Finance</Button>
              </Grid>
              <Grid  item
                  xs={12}
                  md={9} >
        <AppTable column={modulepermissionColumn} data={modulepermissionData} />
              </Grid>
      </Grid>
    </>
  );
};

export default Role;
