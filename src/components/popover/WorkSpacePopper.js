'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Button, Fade, MenuItem, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { addCurrentWorkSpace } from '@/src/redux/slices/employeeSlices/empHomeSlice';
import { useRouter } from 'next/navigation';
import { ellipsisWithTooltip } from '@/src/utils/tooltipEllipsis';
const WorkSpacePopper = ({
  button,
  workspace,
  setWorkspace,
  setProfileMenu,
  setNotification,
  sx,
}) => {
  const { workspaces } = useSelector((state) => state?.emp?.home?.homeData);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const dispatch = useDispatch();
  const router = useRouter();
  const workspacePopupRef = React.useRef(null);

  const handleClick = (event) => {
    setWorkspace(event?.currentTarget);
    setProfileMenu(null);
    setNotification(null);
  };

  const open = Boolean(workspace);
  const id = open ? 'simple-popper' : undefined;

  const handleClickOutside = (event) => {
    if (
      workspacePopupRef?.current &&
      !workspacePopupRef?.current?.contains(event.target)
    ) {
      setWorkspace(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', () => setWorkspace(null));
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', () => setWorkspace(null));
    };
  }, [open]);

  const handleClose = () => {
    setWorkspace(null);
  };
  const handleWorkSpace = (val) => {
    dispatch(addCurrentWorkSpace(val));
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <Button
        disableRipple
        aria-describedby={id}
        onClick={handleClick}
        onMouseEnter={handleClick}
        sx={{
          width: '100%',
          height: '100%',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          ...(sx && sx),
        }}
      >
        {button}
      </Button>
      <Popper
        id={id}
        open={open}
        ref={workspacePopupRef}
        onMouseLeave={handleClose}
        anchorEl={workspace}
        placement={'right-start'}
        sx={{
          position: 'relative',
          zIndex: 406,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} in={open} timeout={450}>
            <Box
              sx={{
                borderRadius: '5px',
                border: '1px solid #068987',
                background: '#fff',
                boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
                display: 'flex',
                width: '220px',
                minHeight: 'auto',
                maxHeight: '200px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'auto',
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'gray',
                  borderRadius: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                },
                scrollbarWidth: 'none',
                scrollbarColor: 'gray',
                '&::-webkit-scrollbar': {
                  display: workspaces?.length > 1 ? 'none' : 'scroll',
                  width: '5px',
                },
                position: 'fixed',
                marginLeft: { xs: 'auto', lg: 0.8 },
                right: { xs: '30px', lg: 'auto' },
                marginRight: { xs: -4, lg: 0 },
                marginTop: { xs: 8, lg: 1 },
              }}
            >
              {workspaces?.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => handleWorkSpace(item)}
                  sx={{
                    width: '100%',
                    py: 1.1,
                    p: 1.5,
                    backgroundColor:
                      currentWorkSpace?.email === item.email
                        ? '#CDECF3'
                        : 'transparent',
                    borderBottom: '1px solid #E4E4E4',

                    '&: hover': {
                      backgroundColor: '#CDECF3',
                      border: '1px solid #068987',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      gap: 1.1,
                      justifyContent: 'center',
                    }}
                  >
                    {item?.icon && (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Image
                          width={20}
                          height={20}
                          src={item?.icon}
                          alt="icon"
                        />
                      </Box>
                    )}
                    <Tooltip
                      title={
                        ellipsisWithTooltip(item?.company_name, 24)
                          ? item?.company_name
                          : ''
                      }
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: 'center',
                          color: '#595959',
                          '&: hover': {
                            color: '#068987',
                          },
                        }}
                      >
                        {`${item?.company_name?.slice(0, 24)}${ellipsisWithTooltip(item?.company_name, 24) ? '...' : ''}`}
                      </Typography>
                    </Tooltip>
                  </Box>
                </MenuItem>
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default WorkSpacePopper;
