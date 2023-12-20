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
      { text: 'Hiring Progress', link: '/dashboard/hiring-progress' },
      { text: 'Start Hiring', link: '/dashboard/start-hiring' },
    ],
  },
  {
    icon: '/images/sidebar-icons/team.svg',
    text: 'Team',
    link: '#',
    sublinks: [
      { text: 'Team members', link: '/dashboard/team-members' },
      { text: 'Team Management', link: '/dashboard/team-management' },
      { text: 'Time off', link: '/dashboard/time-off' },
      { text: 'Time tracking', link: '/dashboard/time-tracking' },
    ],
  },
  {
    icon: '/images/sidebar-icons/resources.svg',
    text: 'Resources',
    link: '/dashboard/resources',
    sublinks: null,
  },
  {
    icon: '/images/sidebar-icons/payments.svg',
    text: 'Payments',
    link: '#',
    sublinks: [
      { text: 'Invoice payments', link: '/dashboard/invoice-payments' },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Administration',
    link: '#',
    sublinks: [
      { text: 'Policies', link: '/dashboard/policies' },
      { text: 'Contracts Signed', link: '/dashboard/contracts-signed' },
    ],
  },
  {
    icon: '/images/sidebar-icons/administration.svg',
    text: 'Organization',
    link: '#',
    sublinks: [
      { text: 'Settings', link: '/dashboard/settings' },
      { text: 'Reports', link: '/dashboard/reports' },
    ],
  },
];
