'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';

import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { useRouter } from 'next/navigation';
import { REMOVE_MODAL } from '@/src/constants/contractSigned';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { HR_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import {
  deleteCurrentEmpData,
  deleteCurrentEmpDataFailed,
  deleteCurrentEmpDataSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';
import EmployeeCardSkeleton from './EmployeeCardSkeleton';

const EmployeeView = ({ status, data, isLoading }) => {
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentEmpId, setCurrentEmpId] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-current-employee'],
    mutationFn: async (id) => {
      dispatch(deleteCurrentEmpData());
      return api.daleteData(`${HR_EMPLOYEES}?id=${id}`);
    },
    onSuccess: () => {
      dispatch(deleteCurrentEmpDataSuccess(currentEmpId));
      handleCloseModal();
      setCurrentEmpId(null);
      setAnchorEl(null);
      Toast('success', 'Data deleted successfully');
      setOpen(null);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deleteCurrentEmpDataFailed());
    },
  });

  const isBetween1400And1200 = useMediaQuery(
    '(min-width: 1200px) and (max-width: 1400px)'
  );
  const router = useRouter();
  const handleClick = (event, id) => {
    setOpen(id);
    event?.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleOpenRemove = (event, item) => {
    setCurrentEmpId(item.id);
    event?.stopPropagation();
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(null);
  };
  const handleConfirm = () => {
    mutate(currentEmpId);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const handleReturnOptions = (eachItem) => {
    if (
      role !== 'super_admin' &&
      !employee_perms?.[0]?.delete &&
      !employee_perms?.[0]?.write
    ) {
      return null;
    } else
      return (
        <Box
          sx={{
            width: '20px',
            position: 'relative',
            right: 27,
          }}
        >
          <Box>
            <Button
              disableRipple
              sx={{
                all: 'unset',
                display: 'inline-block',
                padding: 0,
                margin: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'unset',
                  boxShadow: 'none',
                  textDecoration: 'none',
                },
                '&:focus': {
                  outline: 'none',
                },
                width: '24px',
                height: '24px',
              }}
              onClick={(e) => handleClick(e, eachItem?.id)}
            >
              <img
                src={`/icons/ellipse.svg`}
                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                alt="ellipse"
              />
            </Button>
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
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {(role === 'super_admin' ||
                (role !== 'super_admin' && employee_perms?.[0]?.delete)) && (
                <>
                  {status === 'Terminated' ? (
                    <>
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenRemove(e, eachItem); // Delete action
                        }}
                        sx={{
                          textAlign: 'center',
                          fontWeight: 500,
                          backgroundColor: '#fff !important',
                        }}
                      >
                        Re-join
                      </MenuItem>

                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Your Rejoin logic here
                          Toast(
                            'success',
                            `${eachItem?.name} marked as rejoined`
                          );
                          setAnchorEl(null);
                          setOpen(null);
                        }}
                        sx={{
                          textAlign: 'center',
                          fontWeight: 500,
                          backgroundColor: '#fff !important',
                          color: '#F00',
                        }}
                      >
                        Delete
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenRemove(e, eachItem); // Terminate action
                      }}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 500,
                        backgroundColor: '#fff !important',
                      }}
                    >
                      Terminate
                    </MenuItem>
                  )}
                </>
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
            paddingLeft: '20px',
          },
        }}
        rowGap={3}
        spacing={isMobile ? 2 : 5}
      >
        {data
          ?.filter((eachItem) => {
            if (status === 'All') {
              return true;
            } else if (status === 'Active') {
              return eachItem.active === true;
            } else {
              return eachItem.active === false;
            }
          })
          ?.map((eachItem, index) => {
            if (isLoading) {
              return (
                <EmployeeCardSkeleton
                  key={index}
                  breakPoint={isBetween1400And1200}
                />
              );
            }
            return (
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
                  onClick={() =>
                    router?.push(`/hr/dashboard/employees/${eachItem?.id}`)
                  }
                >
                  <Box sx={{ width: '100%', position: 'absolute' }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Typography
                          component={'span'}
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor:
                              eachItem.status === 'Active' || eachItem.active
                                ? '#068987'
                                : '#F00',
                          }}
                        ></Typography>
                        <Typography
                          sx={{
                            color:
                              eachItem.status === 'Active' || eachItem.active
                                ? '#068987'
                                : '#F00',
                            fontSize: { xs: '10px', xl: '12px' },
                          }}
                        >
                          {eachItem.active ? 'Active' : 'Inactive'}
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
                    <Box sx={{ width: '100px', height: '100px' }}>
                      <Avatar
                        src={eachItem?.image_path}
                        sx={{
                          width: { xs: '100px', md: '100px' },
                          height: { xs: '100px', md: '100px' },
                          borderRadius: '50%',
                          objectFit: 'cover',
                          mx: 'auto',
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: '#171717',
                        fontSize: '16px',
                        fontWeight: '400',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '160px',
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
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '160px',
                      }}
                    >
                      {eachItem.job_title || eachItem.designation}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>
      <AppConfirmationMadal
        title={REMOVE_MODAL?.remove}
        bodyText={REMOVE_MODAL?.warning}
        cancelButtonText={REMOVE_MODAL?.cancel}
        confirmButtonText={REMOVE_MODAL?.remove}
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
        width={'25%'}
        isLoading={isPending}
      />
    </>
  );
};

export default EmployeeView;
