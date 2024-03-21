import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import AppTable from '../appTable/AppTable';
import {
  modulepermissionColumn,
  modulepermissionData,
} from '@/src/constants/data/tables/modulePermission';
import RoleModal from './addRoleModal';
import {
  // ROLES,
  SETTING,
} from '@/src/constants/SettingHr';
import { toCamelCase } from '@/src/utils/stringModification';
import { useSelector } from 'react-redux';

const Role = () => {
  const { accounts } = useSelector((state) => state?.hr?.settings);
  const [modalStep1FormTableState, setModalStep1FormTableState] = useState([]);
  const [rolesData, setRolesData] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissionData, setPermissionData] = useState([]);
  const [selectedRolePermissionIndex, setSelectedRolePermissionIndex] =
    useState({});

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
    // Updated
    console.log({ employeeId, column });
    const newTempForm = [...permissionData[selectedRolePermissionIndex].state];
    console.log({ newTempForm });
    // const newEmployeeIndex = newTempForm.findIndex(
    //   (el) => el.id === employeeId
    // );
  };
  const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(!true);
  };

  const handleRoleChange = (id, val) => {
    setRolesData({ ...rolesData, [id]: val });
    setSelectedRole((prevSelectedRole) =>
      prevSelectedRole === id ? null : id
    );
    const selectedRoleIndex = permissionData.findIndex((el) => el.id === id);
    setSelectedRolePermissionIndex(selectedRoleIndex);
  };
  useEffect(() => {
    console.log({
      rolesData,
      selectedRole,
      selectedRolePermissionIndex,
      permissionData,
    });
  }, [rolesData]);

  useEffect(() => {
    const tempData = accounts.length
      ? accounts.map((item) => ({
          id: item.id,
          title: item.account_name,
          state: [...modulepermissionData],
        }))
      : [];
    setPermissionData(tempData);
  }, [accounts]);

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
          <Box className="scrollbar-container" paddingBottom="20px">
            {accounts.map((button, index) => (
              <Button
                key={index}
                sx={{
                  borderRadius: '5px',
                  color: selectedRole === button.id ? 'teal' : '#595959',
                  background: selectedRole === button.id ? '#FFF' : '#fff',
                  width: '95%',
                  padding: '8px',
                  border:
                    selectedRole === button.id
                      ? '1px solid #029894'
                      : '1px solid #fff',
                  '&:hover': {
                    border: ' 1px solid #029894',
                    color: 'teal',
                    background: ' #FFF',
                  },
                }}
                onClick={() => {
                  handleRoleChange(button?.id, button?.account_name);
                }}
              >
                {button.account_name}
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
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <AppTable
              column={modulepermissionColumn}
              data={permissionData[selectedRolePermissionIndex].state}
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
              sx={{
                minWidth: '120px',
                fontSize: '16px',
                backgroundColor: '#029894',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#029894',
                  color: '#fff',
                },
              }}
              onClick={() => console.log({ modalStep1FormTableState })}
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
