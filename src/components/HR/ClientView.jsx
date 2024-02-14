'use client';
import { allEmployees } from '@/src/constants/AllEmployee';
import { Grid, Menu, MenuItem, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { REMOVE_MODAL } from '@/src/constants/contractSigned';

const ClientView = ({ status, id, name, designation = '', search }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleOpenRemove = (event) => {
    setIsOpen(true);
    event.stopPropagation();
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const theme = useTheme();

  if ((id !== '' || name !== '' || designation !== '') && search) {
    const filter = allEmployees.filter((item) => {
      const idCondition = id.length === 0 || item.id === Number(id);
      const nameCondition = name.length === 0 || item.name === name;
      const designationCondition =
        designation.length === 0 || item.role === designation;
      return idCondition && nameCondition && designationCondition;
    });

    if (filter.length > 0) {
      return (
        <Grid
          container
          spacing={3}
          sx={{
            marginTop: '20px',
            [theme.breakpoints.up('md')]: {
              paddingLeft: '20px',
            },
          }}
        >
          {filter
            .filter((eachItem) => {
              if (status === 'All') {
                return true;
              } else if (status === 'Active') {
                return eachItem.status === 'Active';
              } else {
                return eachItem.status === 'Inactive';
              }
            })
            .map((eachItem, index) => (
              <Grid item xs={12} md={4} lg={3} key={index}>
                {eachItem ? (
                  <Box
                    sx={{
                      width: '100%',
                      minHeight: '200px',
                      backgroundColor: '#F6F6F6',
                      borderRadius: '5px',
                      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                      padding: '20px 15px 10px 15px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        router.push('/hr/dashboard/clients/add-client')
                      }
                    >
                      <Box
                        sx={{
                          width: '20%',
                          display: 'flex',
                          columnGap: '5px',
                          height: '20px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor:
                              eachItem.status === 'Active' ? '#068987' : '#F00',
                          }}
                        ></Box>
                        <Typography
                          sx={{
                            color:
                              eachItem.status === 'Active' ? '#068987' : '#F00',
                          }}
                        >
                          {eachItem.status}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: '60%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          rowGap: '5px',
                        }}
                      >
                        <Image
                          src={'/icons/Employee.svg'}
                          alt="Employee"
                          width={100}
                          height={30}
                        />
                        <Typography
                          sx={{
                            color: '#171717',
                            fontSize: '16px',
                            fontWeight: '400',
                            textAlign: 'center',
                          }}
                        >
                          {eachItem.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#595959',
                            fontSize: '16px',
                            textAlign: 'center',
                          }}
                        >
                          {eachItem.role}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '10%' }}>
                        <Image
                          width={24}
                          height={24}
                          src={`/icons/ellipse.svg`}
                          alt="Option"
                          style={{ cursor: 'pointer' }}
                          onClick={handleClick}
                        />
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          sx={{ marginTop: '20px' }}
                        >
                          <MenuItem onClick={handleOpenRemove}>Remove</MenuItem>
                          <MenuItem onClick={handleClose}>Active</MenuItem>
                          <MenuItem onClick={handleClose}>Inactive</MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      marginTop: '20px',
                      [theme.breakpoints.up('md')]: {
                        paddingLeft: '20px',
                      },
                    }}
                  >
                    No User Found
                  </Typography>
                )}
              </Grid>
            ))}
        </Grid>
      );
    } else if (
      (id !== '' || name !== '' || designation !== '') &&
      filter.length === 0
    ) {
      return (
        <Typography
          sx={{
            marginTop: '20px',
            [theme.breakpoints.up('md')]: {
              paddingLeft: '60px',
            },
          }}
        >
          No User Found
        </Typography>
      );
    }
  }
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  width: '100%',
                  minHeight: '200px',
                  backgroundColor: '#F6F6F6',
                  borderRadius: '5px',
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                  padding: '20px 15px 10px 15px',
                  cursor: 'pointer',
                  '@media (min-width: 900px) and (max-width: 1480px)': {
                    minHeight: '250px',
                    width: 'calc(25%-33px)',
                  },
                }}
                onClick={() =>
                  router.push('/hr/dashboard/clients/client-profile')
                }
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box
                    sx={{
                      // width: '65px',
                      display: 'flex',
                      columnGap: '5px',
                      height: '20px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // background: 'skyblue',
                    }}
                  >
                    <Box
                      sx={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor:
                          eachItem.status === 'Active' ? '#068987' : '#F00',
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        color:
                          eachItem.status === 'Active' ? '#068987' : '#F00',
                        fontSize: '12px',
                      }}
                    >
                      {eachItem.status}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      // width: '60%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      // background: 'gray',
                      // rowGap: '5px',
                      '@media (min-width: 1200px) and (max-width: 1450px)': {
                        marginTop: '25px',
                        mr: '35px',
                      },
                      '@media (min-width: 900px) and (max-width: 980px)': {
                        marginTop: '25px',
                        mr: '35px',
                      },
                    }}
                  >
                    <Image
                      src={'/icons/Employee.svg'}
                      width={100}
                      height={30}
                    />
                    <Typography
                      sx={{
                        color: '#171717',
                        fontSize: '16px',
                        fontWeight: '400',
                        textAlign: 'center',
                      }}
                    >
                      {eachItem.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: '16px',
                        textAlign: 'center',
                      }}
                    >
                      {eachItem.role}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      // display: 'flex',
                      width: '30px',
                      // marginLeft: '20px',
                    }}
                  >
                    {/* <Box
                      component="img"
                      src="/icons/ellipse.svg"
                      sx={{
                        width: '20px',
                        height: '20px',
                        maxWidth: '100% ',
                        // '@media (min-width: 900px) and (max-width: 1370px)': {
                        //   width: '40px',
                        // },
                      }}
                      onClick={handleClick}
                    /> */}
                    <Image
                      width={20}
                      height={20}
                      src={`/icons/ellipse.svg`}
                      style={{ cursor: 'pointer', maxWidth: '100%' }}
                      onClick={handleClick}
                    />
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      sx={{ marginTop: '20px' }}
                    >
                      <MenuItem onClick={handleOpenRemove}>Remove</MenuItem>
                      <MenuItem
                        onClick={() =>
                          router.push('/hr/dashboard/clients/add-client')
                        }
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          router.push('/hr/dashboard/clients/add-client')
                        }
                      >
                        Inactive
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
      <AppConfirmationMadal
        title={REMOVE_MODAL?.remove}
        bodyText={REMOVE_MODAL?.warning}
        cancelButtonText={REMOVE_MODAL?.cancel}
        confirmButtonText={REMOVE_MODAL?.remove}
        isOpen={isOpen}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default ClientView;
