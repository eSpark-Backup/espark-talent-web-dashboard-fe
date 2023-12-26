'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Input from '@/src/components/dashboard/input';
import AppTable from '@/src/components/dashboard/appTable';
import { employeeTableDataHiringRequest } from '@/src/constants/data/employee';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { a11yProps, changeTab } from '@/src/utils/tabs';
import { empTabs } from '@/src/constants/data/empTabs';
import {
  teamManagementColumn,
  teamManagementData,
} from '@/src/constants/data/teamManagement';
import TopNavNavbar from '@/src/components/global/topNavbar';
import Image from 'next/image';

const TeamManagement = () => {
  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState('Hiring Request');
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [empData, setEmpData] = React.useState(employeeTableDataHiringRequest);
  const [isOpenViewDetails, setIsOpenViewDetails] = React.useState(false);

  const fetchDataFake = async () => {
    return true;
  };

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleChange = (event, newValue) => {
    changeTab({
      isSingular: true,
      tabs: empTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      setData: setEmpData,
    });
  };

  React.useEffect(() => {
    const data = empTabs[value].data;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '', setEmpData);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value]);

  const handleViewDetails = () => {
    setIsOpenViewDetails((ps) => !ps);
  };
  const handleClickRenderMessageButton = () => {
    setIsOpenViewDetails(true);
  };

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            marginBottom={4}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant="h3">Team management</Typography>
              <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '0em',
                    textAlign: 'left',
                  }}
                  variant="caption"
                >
                  Visualise team details & manage members
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {[{ label: 'Active teams', prop: a11yProps(0) }]?.map(
                  ({ label, prop }, i) => (
                    <Tab key={i} label={`${label}`} {...prop} />
                  )
                )}
              </Tabs>
            </Box>
            <Box my={4}>
              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
              />
            </Box>
            {empTabs?.map((_, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                {isLoading ? (
                  <Box>Loading...</Box>
                ) : (
                  <AppTable
                    currentTab={currentTab}
                    column={teamManagementColumn}
                    testData={empData}
                    data={teamManagementData}
                    handleClick={handleViewDetails}
                  />
                )}
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
      {isOpenViewDetails && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10001,
          }}
        >
          <TopNavNavbar />
          <Box sx={{ margin: '50px' }}>
            <Box
              mb={'30px'}
              onClick={handleViewDetails}
              sx={{
                textDecoration: 'underline',
              }}
              display="flex"
              alignItems={'center'}
            >
              <Image
                src={'/icons/Back.svg'}
                width={10}
                height={10}
                alt="Back"
              />
              <Typography
                ml={'15px'}
                fontSize="14px"
                textAlign={'center'}
                variant="caption"
              >
                Back to team management.
              </Typography>
            </Box>
            <Typography mb={'30px'} textAlign={'center'} variant="h3">
              Team Arman Khan
            </Typography>
            <Typography mb={'30px'} textAlign={'center'} variant="caption">
              All team members are assigned to Arman Khan
            </Typography>
            <AppTable
              currentTab={currentTab}
              column={teamManagementColumn}
              // data={teamManagementData}
              handleClick={handleViewDetails}
              renderMessage="You haven't added any members yet"
              renderMessageButton="Add members"
              handleClickRenderMessageButton={handleClickRenderMessageButton}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default TeamManagement;
