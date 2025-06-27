import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const EmployeeCard = ({
  eachItem,
  breakPoint,
  handleClick,
  anchorEl,
  open,
  handleClose,
  handleOpenRemove,
  handleOpenActive,
  status,
  handleToggleEmployeevisibility,
}) => {
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const router = useRouter();
  const isActive =
    eachItem?.status?.toLowerCase() === 'active' || eachItem?.active;
  const isTerminated = eachItem?.status?.toLowerCase() === 'terminated';
  let statusColor;
  let statusText;
  if (isActive) {
    statusColor = '#068987';
    statusText = 'Active';
  } else if (isTerminated) {
    statusColor = '#FF0000';
    statusText = 'Terminated';
  } else {
    statusColor = '#F00';
    statusText = 'Inactive';
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={breakPoint ? 4 : 3}>
      <Box
        sx={{
          p: 2,
          minWidth: '245px',
          maxWidth: { xs: '100%', md: '320px' },
          minHeight: '200px',
          position: 'relative',
          backgroundColor: '#F6F6F6',
          borderRadius: '5px',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.30)',
          cursor: 'pointer',
        }}
        onClick={() =>
          router.push(`/hr/dashboard/employees/${eachItem?.emp_pk}`)
        }
      >
        <Box sx={{ width: '100%', position: 'absolute' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                component={'span'}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: statusColor,
                }}
              ></Typography>
              <Typography
                sx={{
                  color: statusColor,
                  fontSize: { xs: '10px', xl: '12px' },
                }}
              >
                {statusText}
              </Typography>
            </Box>
            <Box>
              <>
                {(role === 'super_admin' ||
                  (role !== 'super_admin' && client_perms?.[0]?.write)) && (
                  <Box sx={{ width: '30px', position: 'absolute', right: 16 }}>
                    {status === 'Inactive' ||
                    eachItem.status.toLowerCase() === 'terminated' ? (
                      // View/Hide icon for terminated tab
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
                        onClick={(e) =>
                          handleToggleEmployeevisibility(
                            e,
                            eachItem?.id,
                            eachItem?.isVisible
                          )
                        }
                      >
                        <img
                          src={
                            eachItem?.isVisible
                              ? '/images/eye-open.png'
                              : '/images/eye-close.png'
                          }
                          style={{
                            cursor: 'pointer',
                            width: '22px',
                          }}
                          alt="view-hide"
                        />
                      </Button>
                    ) : (
                      <>
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
                            style={{
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                            }}
                            alt="ellipse"
                          />
                        </Button>
                        <Menu
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
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
                          {eachItem.status === 'active' ? (
                            <MenuItem
                              onClick={(e) => handleOpenRemove(e, eachItem.id)}
                            >
                              Terminate
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={(e) => handleOpenActive(e, eachItem.id)}
                            >
                              Active
                            </MenuItem>
                          )}
                        </Menu>
                      </>
                    )}
                  </Box>
                )}
              </>
            </Box>
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
              src={eachItem?.image}
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
              textWrap: 'nowrap',
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
            {eachItem?.job_title}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default EmployeeCard;
