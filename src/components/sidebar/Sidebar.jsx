'use client';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import SidebarAccordion from './SidebarAccordion';
import {
  Client_Routes,
  Employee_Routes,
  Hr_Routes,
  WORK_SPACE_ICON,
  WORK_SPACE_TITLE,
} from '@/src/constants/sidebar';
import SidebarLogo from './sidebarLogo';
import SidebarActiveUser from './SidebarActiveUser';
import ProfilePopper from '../popover/ProfilePopper';
import { usePathname, useRouter } from 'next/navigation';
import WorkSpacePopper from '../popover/WorkSpacePopper';
import SidebarWorkSpace from './SidebarWorkSpace';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_HOME } from '@/src/services/apiService/apiEndPoints';
import {
  getHomeData,
  getHomeDataRequest,
} from '@/src/redux/slices/hrSlices/homeSlice';
import { Toast } from '../Toast/Toast';
import Cookies from 'js-cookie';

const Sidebar = ({ userName }) => {
  const theme = useTheme();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const employee = pathName.includes('/employee/dashboard');
  const { role } = useSelector((state) => state?.auth?.userData);
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [workspace, setWorkspace] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const router = useRouter();

  const { employee_perms, client_perms, invoices_perms, policies_perms, guides_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};

  const employeePerms = {
    employee_perms,
    client_perms,
    invoices_perms,
    policies_perms,
    guides_perms,
  };

  const { error } = useQuery({
    queryKey: ['hrHomeData'],
    queryFn: async () => {
      dispatch(getHomeDataRequest());
      const response = await api.getData(HR_HOME);
      dispatch(getHomeData(response?.data));
      const {
        employee_perms,
        invoices_perms,
        leaves_perms,
        client_perms,
        policies_perms,
        guides_perms,
      } = response?.data || {};
      Cookies?.set(
        'permissions',
        JSON?.stringify({
          employee_perms,
          invoices_perms,
          leaves_perms,
          client_perms,
          policies_perms,
          guides_perms,
        })
      );
      return response?.data;
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to fetch data');
      console.error({ error });
    },
  });

  const filteredRoutes = (routes) => {
    return routes?.filter((route) => {
      if (
        route?.text === 'Employees' &&
        !employeePerms?.employee_perms?.[0]?.read
      ) {
        if (pathName?.includes(route?.link)) {
          router?.push('/hr/dashboard');
        }
        return false;
      }

      const clientPerms = employeePerms?.client_perms?.[0];
      if (route.text === 'Clients' && !clientPerms?.read) {
        if (pathName?.includes(route?.link)) {
          router?.push('/hr/dashboard');
        }
        return false;
      }

      const invoicePerms = employeePerms.invoices_perms?.[0];
      if (route.text === 'Invoices' && !invoicePerms?.read) {
        if (pathName?.includes(route?.link)) {
          router?.push('/hr/dashboard');
        }
        return false;
      }

      const policyPerms = employeePerms.policies_perms?.[0];
      if (route.text === 'Policies' && !policyPerms?.read) {
        if (pathName?.includes(route?.link)) {
          router?.push('/hr/dashboard');
        }
        return false;
      }

      const guidePerms = employeePerms.guides_perms?.[0];
      if (route.text === 'Guide' && !guidePerms?.read) {
        if (pathName?.includes(route?.link)) {
          router?.push('/hr/dashboard');
        }
        return false;
      }
      return true;
    });
  };

  const renderLinks = () => {
    const client = pathName.includes('/client/dashboard');
    const employee = pathName.includes('/employee/dashboard');
    const hr = pathName.includes('/hr/dashboard');
    if (client) {
      return Client_Routes;
    } else if (employee) {
      return Employee_Routes;
    } else if (hr) {
      if (role === 'super_admin') {
        return Hr_Routes;
      } else {
        const withoutSettings = Hr_Routes?.filter(
          ({ text }) => text !== 'Settings'
        );
        return filteredRoutes(withoutSettings);
      }
    } else {
      null;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '280px',
          display: 'flex',
          height: `calc(100% - ${isSmallScreen ? '15px' : employee ? '0px' : '0px'})`,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            width: '100%',
          }}
        >
          {isSmallScreen ? (
            <>
              <SidebarActiveUser userName={userName} />
            </>
          ) : (
            <>
              <ProfilePopper
                profileMenu={profileMenu}
                setProfileMenu={setProfileMenu}
                notification={notification}
                setNotification={setNotification}
                setWorkspace={setWorkspace}
                button={<SidebarActiveUser userName={userName} />}
              />
            </>
          )}
        </Box>

        {employee && (
          <Box
            sx={{
              borderBottom: '1px solid #E7E7E7',
              position: 'relative',
              width: '100%',
            }}
          >
            <>
              <WorkSpacePopper
                workspace={workspace}
                setWorkspace={setWorkspace}
                setProfileMenu={setProfileMenu}
                setNotification={setNotification}
                button={
                  <SidebarWorkSpace
                    title={WORK_SPACE_TITLE}
                    image={WORK_SPACE_ICON}
                  />
                }
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  '@media (min-width: 0px) and (max-width: 1199px)': {
                    display: 'none',
                  },
                }}
              />
            </>
          </Box>
        )}
        <Box
          className="scrollbar-container"
          sx={{
            py: 3,
            overflowY: 'hidden',
            height: {
              xs: 'calc(100% - 180px)',
              lg: role !== 'client' ? '100%' : 'calc(100% - 180px)',
            },
          }}
        >
          <Box
            id={'accrodion'}
            component={'div'}
            className="scrollbar-container"
            sx={{
              px: '12px',
              top: 0,
              overflowY: 'auto',
              py: 0.5,
            }}
          >
            <SidebarAccordion sidebarLinks={renderLinks()} />
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            backgroundColor: '#068987',
          }}
        >
          <SidebarLogo />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
