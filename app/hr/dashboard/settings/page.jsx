'use client';
import { useEffect, useState } from 'react';

import { Button, Grid, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';

import { settingTabs } from '@/src/data/tabs/setting-tabs';
import CompanySettings from '@/src/components/settings/CompanySettings';
import ChangePassword from '@/src/components/settings/ChangePassword';
import Role from '@/src/components/settings/AddRole';
import AddAccountModal from '@/src/components/modals/AddAccountModal';
import { SETTING } from '@/src/constants/setting-hr';
import { employeeProfileData } from '@/src/constants/employee-profile';
import Accounts from '@/src/components/settings/Accounts';
import { accountData } from '@/src/data/tables/hr/account';
import DashboardHeading from '@/src/components/dashboard/DashboardHeading';

const Page = () => {
  const [value, setValue] = useState('one');
  const [accountDataState, setAccountDataState] = useState([]);
  const [isOpen, setIsOpen] = useState();
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const tempData = accountData?.map((data, index) => ({
      ...data,
      id: index + 1,
    }));
    setAccountDataState(tempData);
  }, []);
  const handleAddAccount = (data) => {
    const tempData = [...accountDataState];
    tempData.push(data);
    setAccountDataState(tempData);
    handleClose();
  };
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
        >
          <DashboardHeading title={`${SETTING?.settings}`} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.8,
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',

                display: 'flex',
                justifyContent: { xs: 'center', md: 'space-between' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                  variant="scrollable"
                  TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
                >
                  <Tab
                    value={employeeProfileData?.valueOne}
                    label={settingTabs?.companySettings}
                    wrapped
                    disableRipple={true}
                    sx={{
                      fontSize: '14px',
                      textTransform: 'math-auto',
                      mr: { xs: '5px', md: '20px', lg: '30px' },
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                  />
                  <Tab
                    value={employeeProfileData?.valueTwo}
                    label={settingTabs?.accounts}
                    wrapped
                    disableRipple={true}
                    sx={{
                      fontSize: '14px',
                      mr: { xs: '5px', md: '20px', lg: '30px' },
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                  />
                  <Tab
                    value={employeeProfileData?.valuethree}
                    label={settingTabs?.rolesAndPermission}
                    wrapped
                    disableRipple={true}
                    sx={{
                      fontSize: '14px',
                      mr: { xs: '5px', md: '30px' },
                      textTransform: 'math-auto',
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                  />
                  <Tab
                    value={employeeProfileData?.valueFour}
                    label={settingTabs?.changePassword}
                    wrapped
                    disableRipple={true}
                    sx={{
                      fontSize: '14px',
                      mr: { xs: '5px', md: '20px', lg: '30px' },
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                  />
                </Tabs>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  borderTop: {
                    xs:
                      value === employeeProfileData?.valueTwo
                        ? '1px solid #e5e7eb'
                        : 0,
                    md: 0,
                  },
                }}
              >
                {value === employeeProfileData?.valueTwo && (
                  <Box
                    sx={{
                      display: 'flex',
                      mt: { xs: '7px', md: 0 },
                      mb: { xs: '7px' },
                    }}
                  >
                    <Button
                      sx={{
                        minWidth: '120px',
                        fontSize: '16px',
                        textTransform: 'math-auto',
                        color: '#fff',
                        textWrap: 'nowrap',
                        background: '#029894',
                        '&:hover': {
                          color: '#fff',
                          background: '#029894',
                        },
                      }}
                      variant="contained"
                      onClick={handleOpen}
                    >
                      {SETTING?.addAccount}
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            {value === employeeProfileData?.valueOne ? (
              <CompanySettings />
            ) : value === employeeProfileData?.valueTwo ? (
              <Accounts
                accountDataState={accountDataState}
                handleAdd={handleAddAccount}
              />
            ) : value === employeeProfileData?.valuethree ? (
              <Role />
            ) : value === employeeProfileData?.valueFour ? (
              <ChangePassword />
            ) : null}
          </Box>
          {isOpen && (
            <AddAccountModal
              open={isOpen}
              handleOpen={handleOpen}
              onClose={handleClose}
              handleAdd={handleAddAccount}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
