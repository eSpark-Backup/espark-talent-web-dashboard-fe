'use client';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';

import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { TERMINATE_MODAL } from '@/src/constants/contractSigned';
import EmployeeCard from './EmployeeCard';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { updateClientEmpStatus } from '@/src/redux/slices/hrSlices/clientSlice';
import { Toast } from '../Toast/Toast';
import { useDispatch } from 'react-redux';
import EmployeeCardSkeleton from './EmployeeCardSkeleton';

const EmployeeStatus = ({ empData, isFetching, email }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [empId, setEmpId] = useState(null);
  const [empStatus, setEmpStatus] = useState(null);
  const [empVisbility, setEmpVisbility] = useState(null);
  const [open, setOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const isBetween1400And1200 = useMediaQuery(
    '(min-width: 1200px) and (max-width: 1400px)'
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpen(id);
    event.stopPropagation();
  };
  const handleOpenRemove = (event, id) => {
    setEmpId(id);
    setEmpStatus('terminated');
    setIsOpen(true);
    event.stopPropagation();
  };
  const handleOpenActive = (event, id) => {
    setEmpId(id);
    setEmpStatus('active');
    setIsOpen(true);
    event.stopPropagation();
  };
  const handleToggleEmployeevisibility = (event, id, isVisible) => {
    event.stopPropagation();
    const newVisibility = !isVisible;

    updateClientEmpMutation.mutate({
      id,
      isVisible: newVisibility,
    });

    // Store local state in case needed for redux update
    setEmpId(id);
    setEmpVisbility(newVisibility);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(null);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const updateClientEmpMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(
        `${HR_CLIENT_EMPLOYEES}?c_email=${email}&&id=${data?.id}`,
        {
          status: data?.status,
          isVisible: data?.isVisible, // added for visibility toggle
        }
      );
    },
    onSuccess: () => {
      dispatch(
        updateClientEmpStatus({
          id: empId,
          status: empStatus,
          isVisible: empVisbility,
        })
      );
      setEmpId(null);
      setEmpVisbility(null);
      setEmpStatus(null);
      setOpen(null);
      setIsOpen(false);
      handleCloseModal();
      Toast('success', 'Employee status updated successfully');
      setOpen(null);
    },
  });
  const handleConfirm = () => {
    updateClientEmpMutation.mutate({ id: empId, status: empStatus });
  };
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        sx={{
          marginTop: '20px',
          [theme.breakpoints.up('md')]: {
            paddingLeft: '20px',
          },
        }}
        rowGap={3}
        spacing={3}
      >
        {isFetching ? (
          <EmployeeCardSkeleton breakPoint={isBetween1400And1200} />
        ) : !isFetching && empData.length ? (
          empData?.map((eachItem, index) => (
            <EmployeeCard
              key={index}
              eachItem={eachItem}
              breakPoint={isBetween1400And1200}
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              handleOpenRemove={handleOpenRemove}
              handleOpenActive={handleOpenActive}
              isLoading={updateClientEmpMutation.isPending}
              handleToggleEmployeevisibility={handleToggleEmployeevisibility}
            />
          ))
        ) : (
          <Typography sx={{ display: 'flex', mx: 'auto' }}>
            No Record Found
          </Typography>
        )}
      </Grid>
      <AppConfirmationMadal
        title={empStatus === 'active' ? 'Activate' : TERMINATE_MODAL?.terminate}
        bodyText={
          empStatus === 'active'
            ? TERMINATE_MODAL?.reactive
            : TERMINATE_MODAL?.warning
        }
        cancelButtonText={TERMINATE_MODAL?.cancel}
        confirmButtonText={
          empStatus === 'active' ? 'Activate' : TERMINATE_MODAL?.terminate
        }
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
        isLoading={updateClientEmpMutation.isPending}
      />
    </>
  );
};

export default EmployeeStatus;
