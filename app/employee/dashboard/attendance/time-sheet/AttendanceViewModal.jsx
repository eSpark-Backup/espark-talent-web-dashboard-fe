import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import EmployeeDetailRow from './EmployeeDetailRow';
import EmployeeRequestDetailRow from './EmployeeRequestDetailRow';

const AttendanceViewModal = ({ modalData, handleClose }) => {
  const fontSize = {
    '@media (min-width: 280px) and (max-width: 400px)': {
      fontSize: '12px',
    },
  };
  const employeeData = [
    [
      ['Employee ID:', 'es-00020'],
      ['Company:', 'eSpark talent'],
      ['Branch:', 'Jauhar, Block 1'],
      ['Job title:', 'Web developer'],
    ],
    [
      ['Name:', 'Bilal Khan'],
      ['Location:', 'Karachi, Pakistan'],
      ['Department:', 'Software'],
      ['Joining date:', 'Oct26,2021'],
    ],
  ];
  const attendanceData = [
    ['Date:', 'November 1, 2023'],
    ['Expected check in:', '10:00 AM'],
    ['Check in time:', modalData?.checkIn],
    ['Expected check out:', '07:00 PM'],
    ['Check out time:', modalData?.checkOut],
  ];
  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        width: { xs: '90%', sm: '90%', md: '77.084%' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '80%',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          Attendance view
        </Typography>
      </Box>
      <Box p={'40px'}>
        <Grid
          container
          display={'flex'}
          flexDirection={'row'}
          sx={{
            '@media (min-width: 900px) and (max-width: 1370px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Grid item xs={12} md={2.25}>
            <Box
              sx={{
                width: '176px',
                height: '176px',
                borderRadius: '50%',
                background: '#f6f6f6',
                marginBottom: { xs: '15px', md: '0px' },
                '@media (min-width: 900px) and (max-width: 1370px)': {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={9.75}>
            <Grid container columnSpacing={'40px'}>
              {employeeData.map((item, empIndex) => {
                return (
                  <Grid item xs={12} md={6} key={empIndex}>
                    {item?.map((row, rowIndex) => (
                      <EmployeeDetailRow
                        darkBack={!(rowIndex % 2)}
                        key={rowIndex}
                        label={row[0]}
                        value={row[1]}
                        fontSize={fontSize}
                      />
                    ))}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: '20px',
        }}
      >
        {attendanceData?.map((data, dataIndex) => (
          <EmployeeRequestDetailRow
            darkBack={!(dataIndex % 2)}
            key={dataIndex}
            label={data[0]}
            value={data[1]}
          />
        ))}
      </Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        sx={{ padding: '20px' }}
      >
        <Button
          onClick={handleClose}
          sx={{
            ml: '20px',
            width: '120px',
            background: '#029894',
            color: '#fff',
            ':&hover:': {
              background: '#029894',
            },
          }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceViewModal;
