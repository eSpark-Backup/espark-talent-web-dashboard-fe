'use client';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';

import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { allEmployees } from '@/src/constants/AllEmployee';
import { TERMINATE_MODAL } from '@/src/constants/contractSigned';
import EmployeeCard from './EmployeeCard';

const EmployeeStatus = ({ status }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleOpenRemove = (event) => {
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
        {allEmployees
          ?.filter((eachItem) => {
            if (status === 'All') {
              return true;
            } else if (status === 'Active') {
              return eachItem.status === 'Active';
            } else {
              return eachItem.status === 'Inactive';
            }
          })
          .map((eachItem, index) => (
            <EmployeeCard
              key={index}
              eachItem={eachItem}
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              handleOpenRemove={handleOpenRemove}
            />
          ))}
      </Grid>
      <AppConfirmationMadal
        title={TERMINATE_MODAL?.terminate}
        bodyText={TERMINATE_MODAL?.warning}
        cancelButtonText={TERMINATE_MODAL?.cancel}
        confirmButtonText={TERMINATE_MODAL?.terminate}
        isOpen={isOpen}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default EmployeeStatus;
