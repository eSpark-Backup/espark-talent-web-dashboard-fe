'use client';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';

import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { TERMINATE_MODAL } from '@/src/constants/contractSigned';
import EmployeeCard from './EmployeeCard';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { updateClientEmpStatus } from '@/src/redux/slices/hrSlices/clientSlice';
import { Toast } from '../Toast/Toast';
import { useDispatch } from 'react-redux';

const EmployeeStatus = ({ empData }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [empId, setEmpId] = useState(null);
  const [empStatus, setEmpStatus] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleOpenRemove = (event, id) => {
    setEmpId(id);
    setEmpStatus('terminate');
    setIsOpen(true);
    event.stopPropagation();
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const updateClientEmpMutation = useMutation({
    mutationFn: async (id, status) => {
      return api.updateJSONData(`${HR_CLIENT_EMPLOYEES}?id=${id}`, {
        status,
      });
    },
    onSuccess: () => {
      Toast('success', 'Employee terminated successfully');
      dispatch(
        updateClientEmpStatus({
          id: empId,
          status: empStatus,
        })
      );
      setEmpId(null);
      setEmpStatus(null);
    },
  });
  const handleConfirm = () => {
    updateClientEmpMutation.mutate(empId, empStatus);
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
        {empData.length
          ? empData.map((eachItem, index) => (
              <EmployeeCard
                key={index}
                eachItem={eachItem}
                handleClick={handleClick}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                handleOpenRemove={handleOpenRemove}
              />
            ))
          : 'No Record Found'}
      </Grid>
      <AppConfirmationMadal
        title={TERMINATE_MODAL?.terminate}
        bodyText={TERMINATE_MODAL?.warning}
        cancelButtonText={TERMINATE_MODAL?.cancel}
        confirmButtonText={TERMINATE_MODAL?.terminate}
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default EmployeeStatus;
