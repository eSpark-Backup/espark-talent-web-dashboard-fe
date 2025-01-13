'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Avatar,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useRouter } from 'next/navigation';

import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { REMOVE_MODAL } from '@/src/constants/contractSigned';
import { CLIENT_VIEW } from '@/src/constants/ClientProfile';
import { api } from '@/src/services/apiService';
import {
  HR_GET_CLIENTS,
  HR_GET_CLIENT_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import {
  deleteClient,
  getCurrentClientData,
  getCurrentClientDataSuccess,
  updateClientStatus,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { useMutation } from '@tanstack/react-query';
import { fetchClientHomeDataRequestFailed } from '@/src/redux/slices/clientSlices/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCardSkeleton from './EmployeeCardSkeleton';
import { Toast } from '../Toast/Toast';

const ClientView = ({ status, data, isLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDeletingClient, setCurrentDeletingClient] = useState(null);
  const [currentEmpIdStatus, setCurrentEmpIdStatus] = useState(null);
  const [isOpenChangeStatusModal, setIsOpenChangeStatusModal] = useState(false);
  const clientInfoMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(getCurrentClientData());
      return api.getData(`${HR_GET_CLIENT_PROFILE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      dispatch(getCurrentClientDataSuccess(data));
      router.push(`/hr/dashboard/clients/${selectedClient}`);
      return data;
    },
    onError: (err) => {
      dispatch(fetchClientHomeDataRequestFailed());
      Toast('error', err.message || 'Failed to update data');
    },
  });

  const clientUpdateStatusMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(`${HR_GET_CLIENTS}?id=${data?.id}`, data?.data);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Status updated successfully');
      dispatch(updateClientStatus(currentEmpIdStatus.id));
      handleCloseChangeStatusModal();
      setCurrentEmpIdStatus(null);
      setOpen(null);
      return data;
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to update status');
    },
  });
  const clientDeleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_GET_CLIENTS}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Client deleted successfully');
      dispatch(deleteClient(currentDeletingClient));
      setOpen(null);
      setCurrentDeletingClient(null);
      handleCloseModal();
      return data;
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to update status');
    },
  });
  const handleConfirmDelete = () => {
    clientDeleteMutation.mutate(currentDeletingClient);
  };
  const isBetween1400And1200 = useMediaQuery(
    '(min-width: 1200px) and (max-width: 1400px)'
  );
  const { role } = useSelector((state) => state?.auth?.userData);
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);

  const handleClick = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen(id);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(null);
  };
  const handleOpenRemove = (event, id) => {
    setIsOpen(true);
    setCurrentDeletingClient(id);
    event.stopPropagation();
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleCloseChangeStatusModal = () => {
    setIsOpenChangeStatusModal(false);
    setAnchorEl(null);
  };
  const handleOpenChangeStatusModal = (event, id, currentStatus) => {
    event.stopPropagation();
    setCurrentEmpIdStatus({ id, active: currentStatus });
    setIsOpenChangeStatusModal(true);
  };
  const handleConfirmUpdateStatus = () => {
    clientUpdateStatusMutation.mutate({
      id: currentEmpIdStatus.id,
      data: { is_active: !currentEmpIdStatus.active },
    });
  };
  const theme = useTheme();
  const handleClientClick = (id) => {
    setSelectedClient(id);
    clientInfoMutation.mutate(id);
  };

  const handleReturnOptions = (eachItem) => {
    if (
      role !== 'super_admin' &&
      !client_perms?.[0]?.delete &&
      !client_perms?.[0]?.write
    ) {
      return null;
    } else
      return (
        <Box
          sx={{
            width: '30px',
            position: 'absolute',
            right: 16,
          }}
        >
          <Box>
            <Image
              width={20}
              height={20}
              src={`/icons/ellipse.svg`}
              style={{ cursor: 'pointer', maxWidth: '100%' }}
              onClick={(e) => handleClick(e, eachItem.id)}
              alt="ellipse"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={eachItem.id === open}
              onClose={handleClose}
              sx={{ mt: 1 }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {(role === 'super_admin' ||
                (role !== 'super_admin' && client_perms?.[0]?.delete)) && (
                <MenuItem
                  onClick={(e) => handleOpenRemove(e, eachItem.id)}
                  sx={{ backgroundColor: '#fff !important' }}
                >
                  Remove
                </MenuItem>
              )}
              {(role === 'super_admin' ||
                (role !== 'super_admin' && client_perms?.[0]?.write)) && (
                <MenuItem
                  onClick={(e) => {
                    handleOpenChangeStatusModal(
                      e,
                      eachItem?.id,
                      eachItem?.active
                    );
                  }}
                >
                  {eachItem?.active
                    ? CLIENT_VIEW?.inActive
                    : CLIENT_VIEW?.active}
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      );
  };

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: '20px',
          [theme.breakpoints.up('md')]: {
            paddingLeft: '60px',
          },
        }}
        rowGap={3}
        spacing={5}
      >
        {data?.length
          ? data
              ?.filter((eachItem) => {
                if (status === 'All') {
                  return true;
                } else if (status === 'Active') {
                  return eachItem.status === 'Active';
                } else {
                  return eachItem.status === 'Inactive';
                }
              })
              ?.map((eachItem, index) =>
                isLoading ? (
                  <EmployeeCardSkeleton
                    key={index}
                    breakPoint={isBetween1400And1200}
                  />
                ) : (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={isBetween1400And1200 ? 4 : 3}
                    key={index}
                  >
                    <Box
                      sx={{
                        p: 2,
                        minWidth: '240px',
                        maxWidth: { xs: '100%', md: '320px' },
                        minHeight: '200px',
                        position: 'relative',
                        backgroundColor: '#F6F6F6',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.30)',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleClientClick(eachItem.id)}
                    >
                      <Box sx={{ width: '100%', position: 'absolute' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              component={'span'}
                              style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: eachItem.active
                                  ? '#068987'
                                  : '#F00',
                              }}
                            ></Typography>
                            <Typography
                              sx={{
                                color: eachItem?.active ? '#068987' : '#F00',
                                fontSize: '12px',
                              }}
                            >
                              {eachItem?.active ? 'Active' : 'Inactive'}
                            </Typography>
                          </Box>
                          <Box>{handleReturnOptions(eachItem)}</Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <Avatar
                          sx={{
                            height: '100px',
                            width: '100px',
                            borderRadius: '50%',
                            padding: '5px',
                          }}
                          src={eachItem?.image_path}
                        />
                        <Typography
                          sx={{
                            color: '#171717',
                            fontSize: '16px',
                            fontWeight: '400',
                            textAlign: 'center',
                            textWrap: 'nowrap',
                          }}
                        >
                          {eachItem?.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#595959',
                            fontSize: '16px',
                            textAlign: 'center',
                            textWrap: 'nowrap',
                          }}
                        >
                          {eachItem?.company_name}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )
              )
          : 'No Data Available'}
      </Grid>
      <AppConfirmationMadal
        title={REMOVE_MODAL?.remove}
        bodyText={REMOVE_MODAL?.warning}
        cancelButtonText={REMOVE_MODAL?.cancel}
        confirmButtonText={REMOVE_MODAL?.remove}
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
        isLoading={clientDeleteMutation.isPending}
      />
      <AppConfirmationMadal
        title={`Update client active status`}
        bodyText={`Are you sure you want to update status?`}
        cancelButtonText={REMOVE_MODAL?.cancel}
        confirmButtonText={`Update`}
        isOpen={isOpenChangeStatusModal}
        handleClose={handleCloseChangeStatusModal}
        handleConfirm={handleConfirmUpdateStatus}
        isLoading={clientUpdateStatusMutation.isPending}
      />
    </>
  );
};

export default ClientView;
