'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import { renderTrackingStatus } from './renderComponents';
import {
  sheetStatusTypes,
  timeSheetTableColumn,
} from '@/src/constants/data/tables/timeSheet';
import Image from 'next/image';
import { EMPLOYEE_TIMESHEET } from '@/src/constants/timeSheet';
import AttendanceViewModal from './AttendanceViewModal';
import AppTable from '@/src/components/appTableNew/AppTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { EMP_TIME_SHEET } from '@/src/services/apiService/apiEndPoints';
import {
  getTimeSheetData,
  getTimeSheetDataFailed,
  getTimeSheetDataSuccess,
} from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterAttendanceForm } from '@/src/constants/data/forms/filter-form';
import dayjs from 'dayjs';
import { getAttendenceShortHand } from '@/src/utils/helpers';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Toast } from '@/src/components/Toast/Toast';

const Dashboard = () => {
  const { workSpace } = useSelector((state) => state?.auth?.userData);
  const { data } = useSelector((state) => state?.emp?.timeSheet);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  function convertDateFormat(dateStr) {
    // Split the date string into day, month, and year
    var parts = dateStr.split('-');
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    // Reorder the components to the new format
    var newDateStr = month + '-' + day + '-' + year;

    return newDateStr;
  }
  const { isLoading } = useQuery({
    // staleTime: 10000,
    queryFn: () => {
      dispatch(getTimeSheetData());
      return api
        .getData(`${EMP_TIME_SHEET}?workspace=${workSpace?.email || ''}`)
        .then(({ data }) => {
          const newData = Object.entries(data?.time_sheet?.record).map(
            (item) => ({
              ...item[1],
              day: dayjs(convertDateFormat(item[0])).format('dddd'),
              status: Object.entries(item[1]?.status)
                .map((st) => {
                  if (!st[1]) return;
                  else return getAttendenceShortHand(st[0]);
                })
                .filter((el) => el !== undefined),
              date: convertDateFormat(item[0]),
              action: ['View'],
              attendenceShortHand: true,
              actionStatus: true,
            })
          );
          dispatch(
            getTimeSheetDataSuccess({
              ...data,
              time_sheet: {
                ...data.time_sheet,
                record: newData,
              },
            })
          );
          return data;
        })
        .catch((error) => {
          Toast('error', error.message || 'Failed to get data');
          dispatch(getTimeSheetDataFailed());
          console.log({ error });
        });
    },
  });
  const { mutate } = useMutation({
    mutationFn: async () => {
      dispatch(getTimeSheetData());
      return api.getData(
        `${EMP_TIME_SHEET}?workspace=${workSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      const newData = Object.entries(data?.time_sheet?.record).map((item) => ({
        ...item[1],
        day: dayjs(item[0]).format('dddd'),
        status: Object.entries(item[1]?.status)
          .map((st) => {
            if (!st[1]) return;
            else return getAttendenceShortHand(st[0]);
          })
          .filter((el) => el !== undefined),
        date: item[0],
        action: ['View'],
        attendenceShortHand: true,
        actionStatus: true,
      }));
      dispatch(
        getTimeSheetDataSuccess({
          ...data,
          time_sheet: {
            ...data.time_sheet,
            record: newData,
          },
        })
      );
    },
    onError: (err) => {
      dispatch(getTimeSheetDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const handleClose = () => {
    setShowFilterModal(false);
    setOpen(false);
  };
  const handleAttendanceModal = (props) => {
    console.log({ props });
    const { item, row } = props;
    setModalData({ item, ...row });
    setOpen(true);
  };

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
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading
              title={'Time sheet'}
              dashboardDescription={'Manage timesheet from one place.'}
            />
          </Box>

          <Box
            sx={{
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
              width: '100%',
              mt: '40px',
              background: '#FAFAFA',
              padding: '20px',
              rowGap: '8px',
              columnGap: '17px',
              flexDirection: 'column',
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
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

                <Typography
                  sx={{
                    marginRight: '12px',
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  {/* {Object.values(item)[1]} */}
                  {data?.time_sheet_summary?.[item?.name]}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box marginTop={'35px'}>
              <Typography
                sx={{
                  fontSize: { xs: '24px', sm: '28px', md: '30px' },
                  fontWeight: 400,
                  lineHeight: '36px',
                  letterSpacing: '0em',
                  color: '#595959',
                }}
                textAlign={'center'}
              >
                Bilal Khan -{' '}
                <Box
                  component={'br'}
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                />{' '}
                (eS-00020)
              </Typography>
            </Box>

            {showFilterModal && (
              <FilterFormModal
                open={handleOpenFilterModal}
                onClose={handleClose}
                attendanceStatus
                filterForm={filterAttendanceForm}
              />
            )}
            <Box
              sx={{
                maxWidth: '1480px',
                overflowX: 'auto',
                display: 'flex',
                alignItems: 'center',
                py: '20px',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  mr: 4,
                }}
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
              <Box sx={{ mt: '5px' }} display={'flex'} alignItems={'center'}>
                <Button
                  disableRipple
                  sx={{
                    marginX: '10px',
                    minWidth: '120px',
                    display: { xs: 'flex', md: 'flex' },
                    border: '1px solid #138A72',
                    color: '#138A72',
                    '&:hover:': {
                      background: '#fff',
                    },
                  }}
                  onClick={() => mutate()}
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
                  disableRipple
                  sx={{
                    minWidth: '120px',
                    background: '#138A72',
                    display: { xs: 'flex', md: 'flex' },
                    color: '#fff',
                    '&:hover': {
                      background: '#138A72',
                    },
                  }}
                  onClick={handleOpenFilterModal}
                  startIcon={
                    <Image
                      width={18}
                      height={15}
                      alt="Refresh"
                      src={`/icons/Filter.svg`}
                      onClick={handleOpenFilterModal}
                    />
                  }
                >
                  Filter
                </Button>
              </Box>
            </Box>
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <>
                <Box
                  sx={{
                    maxWidth: '1480px',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={timeSheetTableColumn}
                    data={data?.time_sheet?.record}
                    handleClickActionView={handleAttendanceModal}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Modal
        data-aos="fade-down"
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
