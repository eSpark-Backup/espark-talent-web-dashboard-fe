import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import AppTable from '../appTable/AppTable';
import {
  modulepermissionColumn,
  modulepermissionData,
} from '@/src/constants/data/tables/modulePermission';
import RoleModal from './addRoleModal';
import { ROLES, SETTING } from '@/src/constants/SettingHr';
import { toCamelCase } from '@/src/utils/stringModification';

const Role = () => {
  const [modalStep1FormTableState, setModalStep1FormTableState] = useState([]);
  const [rolesData, setRolesData] = useState('');

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
  console.log(handleOpen);
  const handleClose = () => {
    setOpen(!true);
  };

  const handleRoleChange = (key, val) => {
    setRolesData({ ...rolesData, [key]: val });
  };
  useEffect(() => {
    console.log('roles', rolesData);
  }, [rolesData]);

  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row' }}
        spacing={2.5}
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
          <Typography
            sx={{
              textAlign: 'center',
              color: '#595959',
              fontWeight: '500',
              padding: '7px',
            }}
          >
            {SETTING?.roles}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#F6F6F6 #D9D9D9',
              scrollbarGutter: 'both',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-button:start, &::-webkit-scrollbar-button:end, &::-moz-scrollbar-button:decrement, &::-moz-scrollbar-button:increment, &::-webkit-scrollbar-button:decrement, &::-webkit-scrollbar-button:increment':
                {
                  width: '0px',
                },
              paddingBottom: '20px',
            }}
          >
            {ROLES.map((button, index) => (
              <Button
                key={index}
                sx={{
                  borderRadius: '5px',
                  color: '#595959',
                  background: ' #FFF',
                  width: '95%',
                  padding: '8px',
                  '&:hover': {
                    border: ' 1px solid #029894',
                    color: 'teal',
                    background: ' #FFF',
                  },
                }}
                onClick={() => {
                  handleRoleChange(button?.key, button?.label);
                }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
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
            mt={'3px'}
          >
            <Button
              type="submit"
              sx={{ minWidth: '120px', fontSize: '16px' }}
              variant="contained"
            >
              {SETTING?.save}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Role;
