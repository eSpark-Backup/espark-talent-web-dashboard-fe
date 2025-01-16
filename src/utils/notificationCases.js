export const notificationCases = (cases, notification) => {
  switch (cases) {
    case 'super_admin':
      return handleAdminNotifications(notification, 'hr');
    case 'client':
      return handleClientNotifications(notification, cases);
    case 'employee':
      return handleEmployeeNotifications(notification, cases);
  }
};

// HR NOTIF
const handleAdminNotifications = (notification, userType) => {
  const commonUrl = `${userType}/dashboard`;
  const paramText = notification?.type?.toLowerCase()?.replace(/ /g, '_');
  const clientId = notification?.client_record_id;

  const routes = {
    'Hiring Request': `clients/${clientId}`,
    'Interview Schedule': `clients/${clientId}`,
    Onboarding: `clients/${clientId}`,
    'Employee Invoice': `clients/${clientId}`,
    'Other Payments': `clients/${clientId}`,
  };

  const route = routes[notification?.type];

  if (route) {
    const needsParams = [
      'Hiring Request',
      'Interview Schedule',
      'Onboarding',
      'Employee Invoice',
      'Other Payments',
    ].includes(notification?.type);

    const url = constructUrl(
      `/${commonUrl}`,
      route,
      needsParams
        ? notification.type === 'Other Payments'
          ? 'other_invoices'
          : notification.type === 'Employee Invoice'
            ? 'employee_invoices'
            : paramText
        : null
    );

    if (!checkIfPathnameIsSame(url)) {
      window.location.href = url;
    }
  }
};

// CLIENT NOTIFICAION
const handleClientNotifications = (notification, userType) => {
  const commonUrl = `${userType}/dashboard`;
  const paramText = notification?.type?.toLowerCase()?.replace(/ /g, '_');

  const routes = {
    'Hiring Request': 'hire-onboard/hiring-progress',
    'Interview Schedule': 'hire-onboard/hiring-progress',
    Onboarding: 'hire-onboard/hiring-progress',
    'Punch Request': 'team/time-off',
    'Leave Request': 'team/time-off',
    'Team Member': 'team/team-members',
    Invoice: 'payments/invoice-payments',
    Policy: 'adminstration/policies',
    'Company Contracts': 'adminstration/contracts-signed',
  };

  const route = routes[notification?.type];

  if (route) {
    const needsParams = [
      'Hiring Request',
      'Interview Schedule',
      'Onboarding',
      'Punch Request',
      'Leave Request',
    ].includes(notification?.type);

    const url = constructUrl(
      `/${commonUrl}`,
      route,
      needsParams ? paramText : null
    );

    if (!checkIfPathnameIsSame(url)) {
      window.location.href = url;
    }
  }
};

// EMPLOYEE NOTIFICAION
const handleEmployeeNotifications = (notification, userType) => {
  const commonUrl = `${userType}/dashboard`;

  const routes = {
    'Leave Request': 'request/leave',
    'Wfh Request': 'request/work-from-home',
    'Punch Request': 'request/punch-requests',
    Benefit: '/benefits',
    Letter: '/letters',
    Policy: 'administration/policies',
    'Company Contracts': 'administration/contracts-signed',
  };

  const route = routes[notification?.type];

  if (route) {
    const url = constructUrl(`/${commonUrl}`, route);
    if (!checkIfPathnameIsSame(url)) {
      window.location.href = url;
    }
  }
};

const constructUrl = (base, route, param) => {
  let url = `${base}/${route}`;

  if (param) {
    url += `?param=${param}`;
  }

  return url;
};

const checkIfPathnameIsSame = (url, search) => {
  const pathname = window.location.pathname;
  const params = window.location.search;

  if (search) {
    return pathname === url && params === search;
  } else {
    return pathname === url;
  }
};
