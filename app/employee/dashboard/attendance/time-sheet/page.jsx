'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import AppTable from '@/src/components/dashboard/appTable';
import { renderTrackingStatus } from './renderComponents';
import {
  sheetStatusTypes,
  timeSheetTableColumn,
  timeSheetTableData,
} from '@/src/constants/data/tables/timeSheet';
import Image from 'next/image';
import { EMPLOYEE_TIMESHEET } from '@/src/constants/timeSheet';
// import AttendanceHeading from '@/src/components/AtttendanceSummary/attendanceHeading';
// import AttendanceView from '@/src/components/AtttendanceSummary/attendanceView';
// import AppDropdown from '@/src/components/dashboard/appDropdown';
import AttendanceViewModal from './AttendanceViewModal';
import FilterModal from '@/src/components/FilterModal/filterModal';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [modalData, setModalData] = useState({});
  const [showFilterModal, setFilterModal] = useState(false);

  // const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  // const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const handleFilterModal = () => {
    setFilterModal(true);
  };
  const handleClose = () => {
    setFilterModal(false);
    setOpen(false);
  };
  const handleAttendanceModal = (props) => {
    const { item, row } = props;
    setModalData({ item, ...row });
    setOpen(true);
  };
  const fetchDataFake = async () => {
    return true;
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchDataFake();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={'50px'}
          >
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant="h3">Time sheet</Typography>
              <Box display={'flex'} flexDirection={'column'} mt={'20px'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#595959',
                  }}
                  variant="caption"
                >
                  Manage timesheet from one place.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
              width: '100%',
              background: '#FAFAFA',
              padding: '20px',
              gap: '15px',
              flexDirection: 'column',
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {EMPLOYEE_TIMESHEET.map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  margin: '5px 0',
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '40px',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '5px',
                      height: '40px',
                      borderRadius: '5px 0px 0px 5px',
                      backgroundColor: `${item.verticalLineColor}`,
                    }}
                  ></div>
                  <Typography>{Object.values(item)[0]}</Typography>
                </Box>

                <Typography sx={{ marginRight: '6PX' }}>
                  {Object.values(item)[1]}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box marginTop={'20px'}>
              <Typography
                sx={{
                  fontSize: '30px',
                  fontWeight: 400,
                  lineHeight: '36px',
                  letterSpacing: '0em',
                  color: '#595959',
                }}
                textAlign={'center'}
              >
                Bilal Khan - (eS-00020)
              </Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'flex-end'}
              flexWrap={'wrap'}
              // my={"30px"}
              sx={{ my: '20px' }}
            >
              <Box
                // sx={{mt:{xs:'30px',md:0}}}
                display={'flex'}
                flexWrap={'wrap'}
                alignItems={'center'}
              >
                {sheetStatusTypes?.map(
                  ({ label, shortForm, background }, statusIndex) =>
                    renderTrackingStatus({
                      label,
                      statusIndex,
                      background,
                      shortForm,
                    })
                )}
              </Box>

              <Box sx={{ mt: '20px' }} display={'flex'} alignItems={'center'}>
                <Box
                  sx={{
                    border: 'solid 1px #029E9C',
                    width: '35px',
                    height: '35px',
                    p: '5px',
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    m: '10px 10px 10px 0',
                  }}
                >
                  <Image
                    width={15}
                    height={15}
                    alt="Refresh"
                    src={`/icons/Refresh.svg`}
                  />
                </Box>
                <Box
                  sx={{
                    background: '#029E9C',
                    display: { xs: 'flex', md: 'none' },
                    width: '35px',
                    height: '35px',
                    p: '5px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                  }}
                >
                  <Image
                    width={15}
                    height={15}
                    alt="Refresh"
                    src={`/icons/Filter.svg`}
                  />
                </Box>
                <Button
                  sx={{
                    marginX: '10px',
                    minWidth: '120px',
                    display: { xs: 'none', md: 'flex' },
                    border: '1px solid #138A72',
                    color: '#138A72',
                    '&:hover:': {
                      background: '#fff',
                    },
                  }}
                  startIcon={
                    <Image
                      width={20}
                      height={22}
                      alt="Refresh"
                      src={`/icons/Refresh.svg`}
                    />
                  }
                >
                  Refresh
                </Button>
                <Button
                  sx={{
                    minWidth: '120px',
                    background: '#138A72',
                    display: { xs: 'none', md: 'flex' },
                    color: '#fff',
                    '&:hover': {
                      background: '#138A72',
                    },
                  }}
                  onClick={handleFilterModal}
                  startIcon={
                    <Image
                      width={18}
                      height={15}
                      alt="Refresh"
                      src={`/icons/Filter.svg`}
                      onClick={handleFilterModal}
                    />
                  }
                >
                  Filter
                </Button>
              </Box>
            </Box>
            {showFilterModal && (
              <FilterModal
                open={handleFilterModal}
                onClose={handleClose}
                attendanceStatus
              />
            )}

            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <>
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={timeSheetTableColumn}
                    data={timeSheetTableData}
                    handleClickActionView={handleAttendanceModal}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AttendanceViewModal modalData={modalData} handleClose={handleClose} />
      </Modal>
    </>
  );
};
export default Dashboard;
