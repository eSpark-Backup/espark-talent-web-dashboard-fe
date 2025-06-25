'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import Input from '@/src/components/dashboard/input';
import TeamMemberCard from '@/src/components/teamMember/teamCard';
import { fetchCandidatesRequest } from '@/src/redux/slices/clientSlices/candidates';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/components/Toast/Toast';
import { CLIENT_CANDIADATES } from '@/src/services/apiService/apiEndPoints';

const staticMembers = [
  {
    name: 'John Doe',
    role: 'Web Designer',
    profileImage: '/icons/Johndoe.png',
    pdfUrl: '/dummy.pdf',
  },
  {
    name: 'John Doe',
    role: 'Web Designer',
    profileImage: '/icons/Johndoe.png',
    pdfUrl: '/dummy.pdf',
  },
];

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [openPdf, setOpenPdf] = useState(null);

  const {
    data: members = staticMembers,
    //  isLoading
  } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['candidate-list'],
    queryFn: async () => {
      try {
        dispatch(fetchCandidatesRequest());
        const response = await api.getData(`${CLIENT_CANDIADATES}`);
        const data = response?.data || [];

        return data.length > 0 ? data : staticMembers;
      } catch (err) {
        Toast('error', err?.message || 'Failed to get data');
        return staticMembers;
      }
    },
  });

  const handleViewPdf = (member) => {
    if (member?.pdfUrl) {
      setOpenPdf(member.pdfUrl);
    } else {
      alert('No PDF available for this member');
    }
  };

  const handleClose = () => {
    setOpenPdf(null);
  };

  return (
    <>
      <DashboardHeading title={`Candidate Profile`} />
      <Box my={4}>
        <Input
          handleChange={setSearch}
          value={search}
          prefixIcon="SearchIcon.svg"
          suffixIcon="QuestionMarkIcon.svg"
          tooltip="Enter the relevant field type and easily filter the relevant data to search"
        />
      </Box>

      <Grid container spacing={2}>
        {(members || []).map((member, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <TeamMemberCard
              member={member}
              onView={handleViewPdf}
              showStatus={false}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={Boolean(openPdf)}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ height: '80vh', padding: 0 }}>
          {openPdf && (
            <iframe
              src={openPdf}
              title="Member PDF"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidateProfile;
