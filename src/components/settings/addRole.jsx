import React, { useEffect, useState } from 'react';

import { Box, Button, Grid } from '@mui/material';
import AppTable from '../appTable/AppTable';
import {
  modulepermissionColumn,
  modulepermissionData,
} from '@/src/constants/data/tables/modulePermission';
import RoleModal from './addRoleModal';
import { SETTING } from '@/src/constants/SettingHr';
import { toCamelCase } from '@/src/utils/stringModification';

const Role = () => {
  const [modalStep1FormTableState, setModalStep1FormTableState] = useState([]);
  useEffect(() => {
    setModalStep1FormTableState([...modulepermissionData]);
  }, [modulepermissionData]);
  const handleSelectRow = (employeeId, column) => {
    const tempForm = [...modulepermissionData];
    const employeeIndex = tempForm.findIndex((el) => el.id === employeeId);
    const targetObject = {
      ...tempForm[employeeIndex],
    };
    targetObject[[toCamelCase(column)]][2] =
      !targetObject[[toCamelCase(column)]][2];
    tempForm[employeeIndex] = targetObject;
    setModalStep1FormTableState(tempForm);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(!true);
  };
  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row' }}
        spacing={2}
        marginTop={'30px'}
      >
        <Grid
          item
          xs={12}
          md={2.5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            background: '#F6F6F6',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
            height: ' 520px',
            gap: '15px',
            marginTop: '17px',
          }}
        >
          <Button
            sx={{
              borderRadius: '5px',
              border: ' 1px solid #029894',
              background: ' #FFF',
              width: '95%',
              padding: '8px',
            }}
          >
            {SETTING?.hr}
          </Button>
          <Button
            sx={{
              borderRadius: '5px',
              border: ' 1px solid #029894',
              background: ' #FFF',
              width: '95%',
              padding: '8px',
            }}
          >
            {SETTING?.admin}
          </Button>
          <Button
            sx={{
              borderRadius: '5px',
              border: ' 1px solid #029894',
              background: ' #FFF',
              width: '95%',
              padding: '8px',
            }}
          >
            {SETTING?.finance}
          </Button>
          <Button
            sx={{
              marginTop: '250px',
              background: '#029894',
              color: '#fff',
              width: '95%',
              '&:hover': {
                background: '#029894',
                color: '#fff',
              },
            }}
            onClick={handleOpen}
          >
            {SETTING?.addRole}
          </Button>
          <RoleModal open={open} handleClose={handleClose} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: 'transparent transparent',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <AppTable
              column={modulepermissionColumn}
              data={modalStep1FormTableState}
              minWidth="100%"
              handleClickActionView={handleSelectRow}
              noPagination
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={'0 10px'}
            mt={'20px'}
          >
            <Button
              type="submit"
              sx={{ minWidth: '120px', marginTop: '100px' }}
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Role;
