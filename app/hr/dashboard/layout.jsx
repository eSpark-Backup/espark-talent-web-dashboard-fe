// 'use client';
// import { Box } from '@mui/material';
// import { useCallback, useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { styled } from '@mui/material/styles';

// import { SideNav } from '@/src/components/sidebar/SideNavLayout';
// import { TopNav } from '@/src/components/sidebar/TopNavLayout';
// import { SIDE_NAV_WIDTH } from '@/src/constants/sidebar';

// const LayoutRoot = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flex: '1 1 auto',
//   maxWidth: '100%',
//   [theme.breakpoints.up('lg')]: {
//     paddingLeft: SIDE_NAV_WIDTH,
//   },
// }));

// const LayoutContainer = styled('div')({
//   display: 'flex',
//   flex: '1 1 auto',
//   flexDirection: 'column',
//   width: '100%',
// });

// const Layout = ({ children }) => {
//   const pathname = usePathname();
//   const [openNav, setOpenNav] = useState(true);
//   const [child, setChild] = useState(false);

//   const handlePathnameChange = useCallback(() => {
//     if (openNav) {
//       setOpenNav(false);
//     }
//   }, [openNav]);

//   useEffect(() => {
//     handlePathnameChange();
//   }, [pathname]);

//   useEffect(() => {
//     setChild(!child);
//   }, []);

//   return (
//     <>
//       <TopNav onNavOpen={() => setOpenNav(true)} />
//       <SideNav onClose={() => setOpenNav(false)} open={openNav} />
//       <LayoutRoot>
//         <LayoutContainer>
//           <Box
//             sx={{
//               px: {
//                 xs: '15px',
//                 sm: '20px',
//                 md: '20px',
//                 lg: '30px',
//               },
//               pt: { xs: '80px', sm: '90px', md: '90px', lg: '30px' },
//               pb: { xs: '20px', sm: '20px', md: '20px', lg: '30px' },
//             }}
//           >
//             {child && children}
//           </Box>
//         </LayoutContainer>
//       </LayoutRoot>
//     </>
//   );
// };

// export default Layout;
'use client';
import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';

import { SideNav } from '@/src/components/sidebar/SideNavLayout';
import { TopNav } from '@/src/components/sidebar/TopNavLayout';
import { SIDE_NAV_WIDTH } from '@/src/constants/sidebar';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(true);
  const [child, setChild] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);

  useEffect(() => {
    setChild(!child);
  }, []);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          {/* <Box
            sx={{
              px: {
                xs: '15px',
                sm: '20px',
                md: '20px',
                lg: '30px',
              },
              pt: { xs: '80px', sm: '90px', md: '90px', lg: '30px' },
              pb: { xs: '20px', sm: '20px', md: '20px', lg: '30px' },
            }}
          >
            {child && children}
          </Box> */}
          <Box
            sx={{
              '@media (max-width: 400px)': {
                px: '20px',
              },
              px: {
                xs: '30px',
                sm: '30px',
                md: '50px',
                lg: '40px',
                xl: '80px',
              },
              pt: {
                xs: '100px',
                sm: '100px',
                md: '100px',
                lg: '40px',
                xl: '63px',
              },
              pb: {
                xs: '40px',
                sm: '40px',
                md: '40px',
                lg: '40px',
                xl: '63px',
              },
            }}
          >
            {child && children}
          </Box>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default Layout;
