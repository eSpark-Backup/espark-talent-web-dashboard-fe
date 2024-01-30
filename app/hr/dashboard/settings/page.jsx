'use client';
import React, { useState } from 'react';
import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { settingTabs } from '@/src/constants/data/tabs/settingTabs';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import CompanySettings from '@/src/components/settings/companySettings';
import ChangePassword from '@/src/components/settings/changePassword';
import Role from '@/src/components/settings/addRole';
import Notification from '@/src/components/settings/notification';

const Page = () => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState({
    label: 'Company settings',
    val: 0,
  });
  console.log(currentTab);
  const handleChange = (event, newValue) => {
    let tab = event?.target?.innerText.split(' ');
    if (tab.length > 1) {
      tab = tab.slice(0, -1).join(' ');
    } else {
      tab = tab.join(' ');
    }
    setCurrentTab(tab);

    setValue(newValue);
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
          <Typography variant="h3">Settings</Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {settingTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    {...prop}
                    disableRipple={true}
                    sx={{
                      textTransform: 'math-auto',
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box>
              {settingTabs?.map(({ label, prop }, i) => (
                <CustomTabPanel value={value} key={i} index={i} {...prop}>
                  {label === 'Company settings' && <CompanySettings />}
                  {label === 'Roles & permissions' && <Role />}
                  {label === 'Change password' && <ChangePassword />}
                  {label === 'Notifications' && <Notification />}
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
          <Grid item xs={12}>
            {value === 3 && (
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={'0 10px'}
                mt={'20px'}
              >
                <Button
                  type="submit"
                  sx={{ minWidth: '120px', marginTop: '100px' }}
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
