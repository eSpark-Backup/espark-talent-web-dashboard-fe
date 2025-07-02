'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import Input from '@/src/components/dashboard/input';
import TeamMemberCard from '@/src/components/teamMember/teamCard';
import { fetchCandidatesRequest } from '@/src/redux/slices/clientSlices/candidates';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/components/Toast/Toast';
import { CLIENT_CANDIADATES } from '@/src/services/apiService/apiEndPoints';

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [openPdf, setOpenPdf] = useState(null);

  const {
    data: members = [],
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
        // If no candidate data, return empty array
        return data.length > 0 ? data : [];
      } catch (err) {
        Toast('error', err?.message || 'Failed to get data');
        return [];
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

  // Filtered members based on search
  const filteredMembers = (members || []).filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

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

      {members.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No candidate assigned
        </Typography>
      ) : filteredMembers.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No results found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <TeamMemberCard
                member={member}
                onView={handleViewPdf}
                showStatus={false}
              />
            </Grid>
          ))}
        </Grid>
      )}

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
