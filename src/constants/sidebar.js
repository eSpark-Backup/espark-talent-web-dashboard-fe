export const IconsAndLinks = [
  {
    icon: '/images/sidebar-icons/dashboard.svg',
    text: 'Dashboard',
    link: '/dashboard',
    sublinks: null,
  },
  {
    icon: '/images/sidebar-icons/hire.svg',
    text: 'Hire & Onboard',
    link: '#',
    sublinks: [
      {
        text: 'Hiring Progress',
        link: '/dashboard/client/hire-onboard/hiring-progress',
      },
      {
        text: 'Start Hiring',
        link: '/dashboard/client/hire-onboard/start-hiring',
      },
    ],
  },
  {
    icon: '/images/sidebar-icons/team.svg',
    text: 'Team',
    link: '#',
    sublinks: [
      { text: 'Team members', link: '/dashboard/client/team/team-members' },
      {
        text: 'Team Management',
        link: '/dashboard/client/team/team-management',
      },
      { text: 'Time off', link: '/dashboard/client/team/time-off' },
      { text: 'Time tracking', link: '/dashboard/client/team/time-tracking' },
    ],
  },
  {
    icon: '/images/sidebar-icons/resources.svg',
    text: 'Resources',
    link: '/dashboard/client/resources',
    sublinks: null,
  },
  {
    icon: '/images/sidebar-icons/payments.svg',
    text: 'Payments',
    link: '#',
    sublinks: [
      {
        text: 'Invoice payments',
        link: '/dashboard/client/payments/invoice-payments',
      },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Administration',
    link: '#',
    sublinks: [
      { text: 'Policies', link: '/dashboard/client/adminstration/policies' },
      {
        text: 'Contracts Signed',
        link: '/dashboard/client/adminstration/contracts-signed',
      },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Organization',
    link: '#',
    sublinks: [
      { text: 'Settings', link: '/dashboard/client/organization/settings' },
      { text: 'Reports', link: '/dashboard/client/organization/reports' },
    ],
  },
];

export const profileMenuData = [
  { icon: '/images/sidebar-icons/notification.svg', text: 'Notification' },
  { icon: '/images/sidebar-icons/signout.svg', text: 'Sign out' },
];
