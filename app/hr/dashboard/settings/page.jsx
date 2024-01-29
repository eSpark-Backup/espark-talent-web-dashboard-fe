'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { settingTabs } from '@/src/constants/data/tabs/settingTabs';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import AppTable from '@/src/components/appTable/AppTable';
import { contractSignedColumn } from '@/src/constants/data/tables/contractSigned';
import { employeeTableHiringRequestColumn } from '@/src/constants/data/tables/employee';
import { renderTable } from '../clients/client-profile/renderComponents';
import CompanySettings from '@/src/components/settings/companySettings';
import ChangePassword from '@/src/components/settings/changePassword';
import { Notifications, formElement } from '@/src/constants/data/tables/notifications';
import { modulepermissionColumn, modulepermissionData } from '@/src/constants/data/tables/modulePermission';
import Role from '@/src/components/settings/addRole';

const page = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState({
    label: 'Company settings',
    val: 0,
  });

//   const tableData = formElement.map((notification, index) => ({
//   title: ,
// }));
  const fetchDataFake = async () => {
    return true;
  };

  useEffect(() => {
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
                  {label === 'Company settings' && (
                    <CompanySettings />
                  )}
                  {label === 'Roles & permissions' && (
                   <Role/>
                  )}
                  {label === 'Change password' && (
                   <ChangePassword/>
                  )}
                   {label === 'Notifications' && (
                //  <AppTable
                //       column={Notifications}
                //       data={Notifications}
                    //         />
                    <Typography>kk</Typography>
                     
                  )}
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default page;
