'use client';
import React from "react";
import { Box, Grid } from "@mui/material";

import AttendanceSummary from "@/src/components/AtttendanceSummary/AttendanceSummary";
import DashboardHeading from "@/src/components/dashboard/dashboardHeading";
import HrAccess from "@/src/components/dashboard/hrAccess";
import { DASHBOARD_DATA } from "@/public/images/dashboard/constants/Dashboard";

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading dashboardDescription={DASHBOARD_DATA?.dashboard} />
          </Box>
        </Grid>
        <Grid item xs={12}>
         <HrAccess/>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;