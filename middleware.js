import { NextResponse } from 'next/server';

export default function middleware(req) {
  const tokenCookie = req.cookies.get('token');
  const userTypeCookie = req.cookies.get('userType');
  const permissionsCookie = req.cookies.get('permissions');

  const loggedin = tokenCookie ? tokenCookie.value : null;
  const userType = userTypeCookie ? userTypeCookie.value : null;
  const permissions = permissionsCookie
    ? JSON.parse(permissionsCookie.value)
    : {};
  console.log(permissions, 'permissions');
  const { pathname } = req.nextUrl;

  const dashboardRoutes = {
    hr: '/hr/dashboard',
    client: '/client/dashboard',
    employee: '/employee/dashboard',
  };

  // // *New Logic: Redirect to hr/dashboard on page reload if logged in*
  // if (
  //   (loggedin && pathname !== '/hr/dashboard') ||
  //   userType !== 'super_admin' ||
  //   userType !== 'employee' ||
  //   userType !== 'client'
  // ) {
  //   return NextResponse.redirect(new URL('/hr/dashboard', req.url));
  // }

  // Redirect if user is not logged in and trying to access a protected route
  if (userType == null && pathname != '/') {
    return NextResponse?.redirect(new URL('/', req?.url)?.toString());
  }

  // Redirect user to their specific dashboard
  if (
    loggedin &&
    userType &&
    dashboardRoutes[userType] &&
    pathname !== dashboardRoutes[userType]
  ) {
    if (!pathname.startsWith(dashboardRoutes[userType])) {
      return NextResponse.redirect(new URL(dashboardRoutes[userType], req.url));
    }
  }

  // Ensure HR users stay within their dashboard scope
  if (userType) {
    if (
      userType !== 'client' &&
      loggedin &&
      userType !== 'employee' &&
      loggedin &&
      !pathname.startsWith(dashboardRoutes.hr)
    ) {
      return NextResponse.redirect(
        new URL(dashboardRoutes?.hr, req.url).toString()
      );
    }
  }

  const hasReadPermission = (key) => permissions[key]?.[0]?.read;

  // Restrict access based on permissions
  if (
    pathname.startsWith('/hr/dashboard/employees') &&
    userType !== 'super_admin' &&
    !hasReadPermission('employee_perms')
  ) {
    return NextResponse.redirect(new URL('/not-authorized', req.url));
  }

  if (
    pathname.startsWith('/hr/dashboard/clients') &&
    userType !== 'super_admin' &&
    !hasReadPermission('client_perms')
  ) {
    return NextResponse.redirect(new URL('/not-authorized', req.url));
  }

  if (
    pathname.startsWith('/hr/dashboard/invoices') &&
    userType !== 'super_admin' &&
    !hasReadPermission('invoices_perms')
  ) {
    return NextResponse.redirect(new URL('/not-authorized', req.url));
  }

  if (
    pathname.startsWith('/hr/dashboard/policies') &&
    userType !== 'super_admin' &&
    !hasReadPermission('policies_perms')
  ) {
    return NextResponse.redirect(new URL('/hr/dashboard', req.url));
  }

  if (
    pathname?.startsWith('/hr/dashboard/settings') &&
    userType !== 'super_admin'
  ) {
    return NextResponse.redirect(new URL('/hr/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|image|images|icons|favicon.ico).*)'],
};
