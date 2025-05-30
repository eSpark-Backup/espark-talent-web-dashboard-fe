import React from 'react';
import {
  Avatar,
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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const candidates = Array(5).fill({
  name: 'Areeba Shakeel',
  designation: 'UI/UX Designer',
  image: 'https://i.pravatar.cc/40?img=3',
  resume: 'Areeba_CV',
});

export default function CandidateProfile() {
  return (
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
          {candidates.map((candidate, index) => (
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
                  <IconButton sx={{ color: '#4c4c4c' }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#00a2a2' }}>
                    <FileDownloadIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#00a2a2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: '#ff1e1e',
                      '&:hover': { backgroundColor: '#e60000' },
                    }}
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
  );
}
