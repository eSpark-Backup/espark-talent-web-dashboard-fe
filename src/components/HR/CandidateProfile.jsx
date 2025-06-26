import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
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

export default function CandidateProfile({
  candidatesList,
  handleDownloadResume,
  handleOpenEditCandidatesModal,
  handleOpenDeleteCandidatesModal,
  handleViewResume,
  openPdf,
  handleClosePDF,
}) {
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
            {candidatesList?.map((candidate, index) => (
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
                      onClick={() => handleOpenEditCandidatesModal(candidate)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: '#ff1e1e',
                        '&:hover': { backgroundColor: '#e60000' },
                      }}
                      onClick={() => handleOpenDeleteCandidatesModal(candidate)}
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
        onClose={handleClosePDF}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
          <IconButton onClick={handleClosePDF} aria-label="close">
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
