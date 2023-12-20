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
        link: '/dashboard/client/client/hiring-progress',
      },
      { text: 'Start Hiring', link: '/dashboard/client/start-hiring' },
    ],
  },
  {
    icon: '/images/sidebar-icons/team.svg',
    text: 'Team',
    link: '#',
    sublinks: [
      { text: 'Team members', link: '/dashboard/client/team-members' },
      { text: 'Team Management', link: '/dashboard/client/team-management' },
      { text: 'Time off', link: '/dashboard/client/time-off' },
      { text: 'Time tracking', link: '/dashboard/client/time-tracking' },
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
      { text: 'Invoice payments', link: '/dashboard/client/invoice-payments' },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Administration',
    link: '#',
    sublinks: [
      { text: 'Policies', link: '/dashboard/client/policies' },
      { text: 'Contracts Signed', link: '/dashboard/client/contracts-signed' },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Organization',
    link: '#',
    sublinks: [
      { text: 'Settings', link: '/dashboard/client/settings' },
      { text: 'Reports', link: '/dashboard/client/reports' },
    ],
  },
];

export const profileMenuData = [
  { icon: '/images/sidebar-icons/notification.svg', text: 'Notification' },
  { icon: '/images/sidebar-icons/signout.svg', text: 'Sign out' },
];
