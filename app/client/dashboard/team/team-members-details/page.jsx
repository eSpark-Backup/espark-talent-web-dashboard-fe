'use client';
import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmployeeProfileForm from '@/src/components/teamMember/personalDetails';
import { employeeContractDetails, employeeProfileDetails } from '@/src/constants/teamMember';

export default function TeamMemberHeader() {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          Team members
        </Typography>
      </Box>

      {/* Profile Section */}
      <Box sx={{ borderBottom: '1px solid #E4E4E4' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/icons/Ellipse 14.svg"
              alt="John Doe"
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontSize: '30px' }}>
                John Doe
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '14px' }}
              >
                Pakistan
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: { xs: 2, md: 0 },
            }}
          >
            <TextField
              size="small"
              placeholder="Search here..."
              variant="outlined"
            />
            <Button variant="contained" sx={{ bgcolor: 'teal' }}>
              New hire
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 3 }}>
          <Tab label="Personal Details" />
          <Tab label="Contract Details" />
        </Tabs>
      </Box>

      {/* === Tab Panels === */}
      <Box sx={{ mt: 3 }}>
        {tab === 0 && <EmployeeProfileForm fields={employeeProfileDetails} />}

        {tab === 1 && <EmployeeProfileForm fields={employeeContractDetails} />}
      </Box>
    </>
  );
}
