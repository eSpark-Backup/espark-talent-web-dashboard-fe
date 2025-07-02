'use client';
import React, { useEffect, useState } from 'react';
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
import {
  employeeContractDetails,
  employeeProfileDetails,
  fallbackMember,
} from '@/src/constants/teamMember';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_TEAM_MEMBER } from '@/src/services/apiService/apiEndPoints';
import {
  fetchTeamMemberByIdRequest,
  fetchTeamMemberByIdSuccess,
  fetchTeamMemberByIdFailed,
} from '@/src/redux/slices/clientSlices/teamMembersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';
import dayjs from 'dayjs';

export default function TeamMemberHeader({ params }) {
  const dispatch = useDispatch();
  const { id } = params;
  const [tab, setTab] = useState(0);
  const member = useSelector((state) => state?.teamMemberSlice?.selectedMember);

  const fetchTeamMember = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['team-member', id],
    queryFn: async () => {
      dispatch(fetchTeamMemberByIdRequest());
      try {
        const response = await api.getData(`${CLIENT_TEAM_MEMBER}${id}`);
        const data = response.data;

        const formattedMember = {
          ...data,
          joining_date: dayjs(data?.joining_date).format('DD-MMMM-YYYY'),
          status: 'onBoard',
        };

        dispatch(fetchTeamMemberByIdSuccess(formattedMember));
        return formattedMember;
      } catch (err) {
        dispatch(fetchTeamMemberByIdFailed());
        Toast('error', err.message || 'Failed to get data');
        return null;
      }
    },
  });

  useEffect(() => {
    if (fetchTeamMember.isSuccess && !member) {
      dispatch(fetchTeamMemberByIdSuccess(fallbackMember));
    }
  }, [fetchTeamMember.isSuccess, member]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton>
          <Link href={'/client/dashboard/team/team-members'}>
            <ArrowBackIcon />
          </Link>
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
              src={member?.profileImage || fallbackMember.profileImage}
              alt={member?.employee_name || fallbackMember.employee_name}
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontSize: '30px' }}>
                {member?.employee_name || fallbackMember.employee_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '14px' }}
              >
                {member?.country || fallbackMember.country}
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
            <Link href="/client/dashboard/hire-onboard/start-hiring" passHref>
              <Button variant="contained" sx={{ bgcolor: 'teal' }}>
                New hire
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 3 }}>
          <Tab label="Personal Details" />
          <Tab label="Contract Details" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ mt: 3 }}>
        {tab === 0 && (
          <EmployeeProfileForm
            fields={employeeProfileDetails}
            values={member}
            fallbackValues={fallbackMember}
          />
        )}
        {tab === 1 && (
          <EmployeeProfileForm
            fields={employeeContractDetails}
            value={member}
            fallbackValues={fallbackMember}
          />
        )}
      </Box>
    </>
  );
}
