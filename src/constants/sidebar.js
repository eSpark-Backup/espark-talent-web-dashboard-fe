export const SIDE_NAV_WIDTH = 280;
export const NOTIFICATION_TITLE = 'Notifications';

export const Client_Routes = [
  {
    icon: '/images/sidebar-icons/dashboard.svg',
    text: 'Dashboard',
    link: '/client/dashboard',
    sublinks: null,
  },
  {
    icon: '/images/sidebar-icons/hire.svg',
    text: 'Hire & Onboard',
    link: '#',
    sublinks: [
      {
        text: 'Hiring Progress',
        link: '/client/dashboard/hire-onboard/hiring-progress',
      },
      {
        text: 'Start Hiring',
        link: '/client/dashboard/hire-onboard/start-hiring',
      },
    ],
  },
  {
    icon: '/images/sidebar-icons/team.svg',
    text: 'Team',
    link: '#',
    sublinks: [
      { text: 'Team members', link: '/client/dashboard/team/team-members' },
      // {
      //   text: 'Team Management',
      //   link: '/dashboard/client/team/team-management',
      // },
      { text: 'Time off', link: '/client/dashboard/team/time-off' },
      { text: 'Time tracking', link: '/client/dashboard/team/time-tracking' },
    ],
  },
  {
    icon: '/images/sidebar-icons/resources.svg',
    text: 'Resources',
    link: '/client/dashboard/resources',
    sublinks: null,
  },
  {
    icon: '/images/sidebar-icons/payments.svg',
    text: 'Payments',
    link: '#',
    sublinks: [
      {
        text: 'Invoice payments',
        link: '/client/dashboard/payments/invoice-payments',
      },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Administration',
    link: '#',
    sublinks: [
      { text: 'Policies', link: '/client/dashboard/adminstration/policies' },
      {
        text: 'Contracts Signed',
        link: '/client/dashboard/adminstration/contracts-signed',
      },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Organization',
    link: '#',
    sublinks: [
      { text: 'Settings', link: '/client/dashboard/organization/settings' },
      { text: 'Reports', link: '/client/dashboard/organization/reports' },
    ],
  },
];

export const profileMenuData = [
  { icon: '/images/sidebar-icons/notification.svg', text: 'Notification' },
  { icon: '/images/sidebar-icons/signout.svg', text: 'Sign out' },
];
