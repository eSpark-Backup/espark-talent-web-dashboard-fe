import React, { useEffect, useState } from 'react';
import { Box, Modal, Tab, Tabs, Typography } from '@mui/material';

import AppTable from '../appTableNew/AppTable';
import { a11yProps } from '@/src/utils/tabs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  HR_GET_EMP_ATTENDENCE,
  HR_GET_EMP_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { convertDateFormat, getAttendenceShortHand } from '@/src/utils/helpers';
import { Toast } from '../Toast/Toast';
import AttendanceViewModal from '@/app/hr/dashboard/employees/[id]/AttendanceViewModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceRequestSuccess } from '@/src/redux/slices/hrSlices/employeeSlice';
import { attendanceReportTableColumn } from '@/src/constants/data/tables/attendanceReport';
import { calculateExpectedTime } from '@/src/utils/calculateExpectedTime';

const AttendanceReport = ({ employeeData }) => {
  const dispatch = useDispatch();
  const { attendance } = useSelector((state) => state?.hr?.employees);
  const params = useParams();
  const clientQuery = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});
  const [currentTab, setCurrentTab] = useState({
    label: '',
    val: 0,
  });

  const tabs = attendance?.map((item, index) => ({
    label: `${item?.client}`,
    prop: a11yProps(index),
  }));

  const handleAttendanceModal = (props) => {
    const { item, row } = props || {};
    const formattedRow = {
      ...row,
      date: dayjs(row?.date)?.format('DD-MM-YYYY'),
    };
    setModalData({ item, ...formattedRow });
    setOpen(true);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab({
      label: tabs[newValue]?.label,
      val: newValue,
    });
  };

  const empProfile = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-profile', params?.id],
    queryFn: async () => {
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params?.id}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const getTimeSheet = (timeSheetData) => {
    const newData = Object?.entries(timeSheetData)?.map((recItem) => {
      return {
        ...recItem[1],
        date: recItem[0],
        day: dayjs(convertDateFormat(recItem[0]))?.format('dddd'),
        status: Object.entries(recItem[1]?.status)
          ?.map((st) => {
            if (!st[1]) return;
            else return getAttendenceShortHand(st[0]);
          })
          ?.filter((el) => el !== undefined),
        action: ['View'],
        attendenceShortHand: true,
        actionStatus: true,
      };
    });
    return newData;
  };

  const { data, isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    queryKey: ['hr-employee-attendence', empProfile?.data?.email],
    queryFn: async () => {
      return api
        .getData(`${HR_GET_EMP_ATTENDENCE}?e_email=${empProfile.data?.email}`)
        .then(({ data }) => {
          const tempData = [];
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const newEle = Object.entries(element);
            tempData.push({
              client: newEle[0][0],
              emp_data: {
                time_sheet: getTimeSheet(newEle[0][1]?.time_sheet?.record),
                employee_details: {
                  ...newEle[0][1]?.employee_details,
                  expect_check_in: newEle[0][1]?.time_sheet?.expect_check_in,
                  expect_check_out: newEle[0][1]?.time_sheet?.expect_check_out,
                },
              },
            });
          }
          dispatch(getAttendanceRequestSuccess(tempData));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });

  useEffect(() => {
    if (attendance?.length > 0) {
      setCurrentTab({
        label: attendance[0]?.client || '',
        val: 0,
      });
    }
  }, [attendance]);

  useEffect(() => {
    if (empProfile.data?.email) {
      clientQuery.invalidateQueries([
        'hr-employee-attendence',
        empProfile?.data?.email,
      ]);
    }
  }, [empProfile?.data?.email, clientQuery]);

  return (
    <>
      <>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            mt: !data?.length ? '40px' : null,
          }}
        >
          {data?.length ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 'solid 1px #ccc',
                mb: '40px',
              }}
            >
              <Tabs
                value={currentTab?.val}
                onChange={(ev, newVal) => {
                  handleChangeTab(ev, newVal);
                }}
                aria-label="basic tabs example"
                variant="scrollable"
                sx={{
                  mt: '8px',
                }}
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
              >
                {data?.map((item, tabIndex) => {
                  return (
                    <Tab
                      key={tabIndex}
                      label={`${item?.client}`}
                      disableRipple={true}
                      sx={{
                        textTransform: 'none',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                  );
                })}
              </Tabs>
            </Box>
          ) : null}
          {attendance?.length ? (
            attendance?.map((item, index) => {
              if (index === currentTab.val) {
                const formattedTimeSheet = item?.emp_data?.time_sheet?.map(
                  (row) => ({
                    ...row,
                    expected_hours: calculateExpectedTime(
                      item?.emp_data,
                      currentTab
                    ),
                    date: dayjs(row?.date, 'DD-MM-YYYY')?.format(
                      'D MMMM, YYYY'
                    ),
                    check_in: row?.check_in
                      ? dayjs(row?.check_in, 'HH:mm')?.isValid()
                        ? dayjs(row?.check_in, 'HH:mm')?.format('hh:mm A')
                        : '-'
                      : '-',
                    check_out: row?.check_out
                      ? dayjs(row?.check_out, 'HH:mm')?.isValid()
                        ? dayjs(row?.check_out, 'HH:mm')?.format('hh:mm A')
                        : '-'
                      : '-',
                  })
                );

                return (
                  <AppTable
                    key={index}
                    minWidth={'1200px'}
                    column={attendanceReportTableColumn}
                    data={formattedTimeSheet}
                    handleClickActionView={handleAttendanceModal}
                    isLoading={isLoading}
                  />
                );
              }
              return null;
            })
          ) : (
            <Typography sx={{ my: '45px', textAlign: 'center' }} variant="h3">
              No attendance record found!
            </Typography>
          )}
        </Box>
      </>
      {data?.length ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-aos="fade-down"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AttendanceViewModal
            modalData={modalData || {}}
            empData={
              {
                ...data[currentTab.val]?.emp_data?.employee_details,
                role: employeeData?.role,
              } || {}
            }
            handleClose={handleClose}
            image={employeeData?.image_path}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default AttendanceReport;
