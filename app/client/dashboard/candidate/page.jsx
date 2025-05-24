'use client';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import Input from '@/src/components/dashboard/input';
import TeamMemberCard from '@/src/components/teamMember/teamCard';
import { Box, Grid, Dialog, DialogContent, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const members = [
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
  const [search, setSearch] = useState('');
  const [openPdf, setOpenPdf] = useState(null); 

  const handleViewPdf = (member) => {
    if (member.pdfUrl) {
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
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <TeamMemberCard
              member={member}
              onView={handleViewPdf}
              showStatus={false}
            />
          </Grid>
        ))}
      </Grid>

      {/* PDF Modal */}
      <Dialog
        open={Boolean(openPdf)}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 1,
          }}
        >
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            height: '80vh',
            padding: 0,
          }}
        >
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
