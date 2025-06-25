import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogContent,
  Avatar,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

// Import your Redux actions and API methods here
import {
  clearCandidateError,
  clearCandidateList,
  deleteCandidatesFailure,
  deleteCandidatesRequest,
  deleteCandidatesSuccess,
  getCandidatesFailure,
  getCandidatesRequest,
  getCandidatesSuccess,
  postCandidatesFailure,
  postCandidatesRequest,
  postCandidatesSuccess,
  putCandidatesFailure,
  putCandidatesRequest,
  putCandidatesSuccess,
} from '@/src/redux/slices/hrSlices/candidatesSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';

const HR_CANDIDATES = '/hr/candidates'; // replace with your actual endpoint

const defaultCandidates = Array(5).fill({
  name: 'Areeba Shakeel',
  designation: 'UI/UX Designer',
  image: 'https://i.pravatar.cc/40?img=3',
  resume: 'Areeba_CV',
  resumeUrl: '/dummy.pdf',
});

// ✅ Custom Hook for mutations
function useCandidateMutations(client) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteCandidatesRequest());
      return await api.deleteData(`${HR_CANDIDATES}/${id}`);
    },
    onSuccess: () => {
      dispatch(deleteCandidatesSuccess());
      Toast('success', 'Candidate deleted successfully');
      queryClient.invalidateQueries(['candidate-list', client]);
    },
    onError: (error) => {
      dispatch(deleteCandidatesFailure(error?.message));
      Toast('error', error?.message || 'Mutation failed');
    },
  });

  const editMutation = useMutation({
    mutationFn: async (candidate) => {
      dispatch(putCandidatesRequest());
      return await api.putData(`${HR_CANDIDATES}/${candidate.id}`, candidate);
    },
    onSuccess: () => {
      dispatch(putCandidatesSuccess());
      Toast('success', 'Candidate updated successfully');
      queryClient.invalidateQueries(['candidate-list', client]);
    },
    onError: (error) => {
      dispatch(putCandidatesFailure(error?.message));
      Toast('error', error?.message || 'Mutation failed');
    },
  });

  return {
    deleteCandidate: deleteMutation.mutate,
    editCandidate: editMutation.mutate,
  };
}

// ✅ Main Component
export default function CandidateProfile({ client }) {
  const dispatch = useDispatch();
  const [openPdf, setOpenPdf] = useState(null);

  const { deleteCandidate, editCandidate } = useCandidateMutations(client);

  const { data: candidatesList = defaultCandidates } = useQuery({
    queryKey: ['candidate-list', client],
    staleTime: 10000,
    refetchOnWindowFocus: false,
    placeholderData: defaultCandidates,
    queryFn: async () => {
      try {
        dispatch(getCandidatesRequest());
        const response = await api.getData(`${HR_CANDIDATES}?client=${client}`);
        const data = response?.data || [];
        dispatch(getCandidatesSuccess(data));
        return data.length > 0 ? data : defaultCandidates;
      } catch (err) {
        dispatch(getCandidatesFailure(err?.message));
        Toast('error', err?.message || 'Failed to get data');
        return defaultCandidates;
      }
    },
  });

  const handleEditCandidate = (candidate) => {
    const newName = prompt('Enter new candidate name:', candidate.name);
    if (newName && newName !== candidate.name) {
      editCandidate({ ...candidate, name: newName });
    }
  };

  const handleDeleteCandidate = (candidate) => {
    if (confirm(`Are you sure you want to delete ${candidate.name}?`)) {
      deleteCandidate(candidate.id);
    }
  };

  const handleDownloadResume = (candidate) => {
    if (candidate?.resumeUrl) {
      const link = document.createElement('a');
      link.href = candidate.resumeUrl;
      link.download = candidate.resume || 'resume.pdf';
      link.click();
    } else {
      Toast('error', 'Resume not available');
    }
  };

  const handleViewResume = (candidate) => {
    if (candidate?.resumeUrl) {
      setOpenPdf(candidate.resumeUrl);
    } else {
      Toast('error', 'No PDF available for this candidate');
    }
  };

  const handleClose = () => setOpenPdf(null);

  return (
    <>
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#f8f8f8',
              }}
            >
              <TableCell sx={{ padding: '0', borderBottom: '15px solid #fff' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#595959',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Candidate name
                </p>
              </TableCell>
              <TableCell sx={{ padding: '0', borderBottom: '15px solid #fff' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#595959',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Designation
                </p>
              </TableCell>
              <TableCell sx={{ padding: '0', borderBottom: '15px solid #fff' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#595959',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Image
                </p>
              </TableCell>
              <TableCell sx={{ padding: '0', borderBottom: '15px solid #fff' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#595959',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Resume/CV
                </p>
              </TableCell>
              <TableCell sx={{ padding: '0', borderBottom: '15px solid #fff' }}>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#595959',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Action
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidatesList.map((candidate, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: '#f9f9f9',
                  height: '70px',
                }}
              >
                <TableCell
                  sx={{ borderBottom: '15px solid #fff', textAlign: 'center' }}
                >
                  <Typography>{candidate.name}</Typography>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '15px solid #fff', textAlign: 'center' }}
                >
                  <Typography>{candidate.designation}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: '15px solid #fff' }}>
                  <Avatar
                    src={candidate.image}
                    alt={candidate.name}
                    sx={{ margin: '0 auto' }}
                  />
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '15px solid #fff', textAlign: 'center' }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      color: '#00a2a2',
                      borderColor: '#00a2a2',
                      borderRadius: '20px',
                      fontWeight: 500,
                      fontSize: '14px',
                      px: 2,
                      '&:hover': {
                        borderColor: '#00a2a2',
                      },
                    }}
                  >
                    {candidate.resume}
                  </Button>
                </TableCell>
                <TableCell sx={{ borderBottom: '15px solid #fff' }}>
                  <Box sx={{ justifyContent: 'center' }} display="flex" gap={1}>
                    <IconButton
                      sx={{ color: '#4c4c4c' }}
                      onClick={() => handleViewResume(candidate)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: '#00a2a2' }}
                      onClick={() => handleDownloadResume(candidate)}
                    >
                      <FileDownloadIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: '#00a2a2' }}
                      onClick={() => handleEditCandidate(candidate)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: '#ff1e1e',
                        '&:hover': { backgroundColor: '#e60000' },
                      }}
                      onClick={() => handleDeleteCandidate(candidate)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
}
