import React, { useEffect, useState } from 'react';
import { Box, Modal, Tab, Tabs, Tooltip } from '@mui/material';
import AppTable from '../appTableNew/AppTable';
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
import { useDispatch } from 'react-redux';
import { getAttendanceRequestSuccess } from '@/src/redux/slices/hrSlices/employeeSlice';
import { attendanceReportTableColumn } from '@/src/constants/data/tables/attendanceReport';
import { calculateExpectedTime } from '@/src/utils/calculateExpectedTime';
import { ellipsisWithTooltip } from '@/src/utils/tooltipEllipsis';

const AttendanceReport = ({ employeeData, filterFormValues }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const clientQuery = useQueryClient();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentTab, setCurrentTab] = useState(0);

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
    setCurrentTab(newValue);
  };

  const empProfile = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-profile', params?.id],
    queryFn: async () => {
      try {
        const { data } = await api.getData(
          `${HR_GET_EMP_PROFILE}?id=${params?.id}`
        );
        return data || {};
      } catch (err) {
        Toast('error', err.message || 'Failed to get data');
      }
    },
  });

  const { data: attendanceData, isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    queryKey: ['hr-employee-attendence', empProfile?.data?.email],
    queryFn: async () => {
      try {
        const { data } = await api.getData(
          `${HR_GET_EMP_ATTENDENCE}?e_email=${empProfile?.data?.email}`
        );
        const tempData =
          data &&
          data?.map((item) => {
            const [client, details] = Object.entries(item)[0];
            return {
              client,
              emp_data: {
                time_sheet: getTimeSheet(details?.time_sheet?.record),
                employee_details: {
                  ...details?.employee_details,
                  expect_check_in: details?.time_sheet?.expect_check_in,
                  expect_check_out: details?.time_sheet?.expect_check_out,
                },
              },
            };
          });
        dispatch(getAttendanceRequestSuccess(tempData));
        return tempData || [];
      } catch (err) {
        Toast('error', err.message || 'Failed to get data');
      }
    },
    enabled: !!empProfile?.data?.email,
  });

  useEffect(() => {
    if (empProfile?.data?.email) {
      clientQuery.invalidateQueries([
        'hr-employee-attendence',
        empProfile?.data?.email,
      ]);
    }
  }, [empProfile?.data?.email, clientQuery]);

  const getTimeSheet = (timeSheetData) => {
    return Object?.entries(timeSheetData)?.map(([date, details]) => ({
      ...details,
      date,
      day: dayjs(convertDateFormat(date))?.format('dddd'),
      status: Object?.entries(details?.status)
        ?.map(([key, value]) =>
          value ? getAttendenceShortHand(key) : undefined
        )
        ?.filter(Boolean),
      action: ['View'],
      attendenceShortHand: true,
      actionStatus: true,
    }));
  };

  const formattedTimeSheet =
    attendanceData?.[currentTab]?.emp_data?.time_sheet?.map((row) => ({
      ...row,
      expected_hours: calculateExpectedTime(
        attendanceData?.[currentTab]?.emp_data,
        currentTab
      ),
      date: dayjs(row?.date, 'DD-MM-YYYY')?.format('D MMMM, YYYY'),
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
    })) || [];

  const formatWithSeconds = (timeStr) => {
    if (!timeStr) return null;
    const formats = ['hh:mm:ss A', 'HH:mm:ss', 'hh:mm A', 'HH:mm'];
    return dayjs(timeStr, formats, true);
  };

  const filteredTimeSheet =
    formattedTimeSheet?.filter((row) => {
      const {
        from,
        to,
        attendanceStatus,
        checkIn = {},
        checkOut = {},
      } = filterFormValues || {};

      const rowDate = dayjs(row?.date, 'D MMMM, YYYY');
      const fromDate = from ? dayjs(from, 'YYYY-MM-DD') : null;
      const toDate = to ? dayjs(to, 'YYYY-MM-DD') : null;

      const checkInFrom = formatWithSeconds(checkIn?.from); // ex: 02:29:00 PM
      const checkInTo = formatWithSeconds(checkIn?.to); // ex: 04:15:00 PM

      const checkOutFrom = formatWithSeconds(checkOut?.from); // ex: 03:13:00 PM
      const checkOutTo = formatWithSeconds(checkOut?.to); // ex: 04:12:07 PM

      const actualCheckIn =
        row?.check_in !== '-'
          ? dayjs(row.check_in, ['hh:mm:ss A', 'hh:mm A', 'HH:mm:ss'], true)
          : null;
      const actualCheckOut =
        row?.check_out !== '-'
          ? dayjs(row.check_out, ['hh:mm:ss A', 'hh:mm A', 'HH:mm:ss'], true)
          : null;

      const isDateInRange =
        (!fromDate || rowDate.isSame(fromDate) || rowDate.isAfter(fromDate)) &&
        (!toDate || rowDate.isSame(toDate) || rowDate.isBefore(toDate));

      const isStatusMatch = attendanceStatus
        ? row?.status?.includes(attendanceStatus)
        : true;

      const isCheckInMatch =
        checkInFrom && checkInTo && actualCheckIn
          ? actualCheckIn.isSameOrAfter(checkInFrom) &&
            actualCheckIn.isSameOrBefore(checkInTo)
          : true;

      const isCheckOutMatch =
        checkOutFrom && checkOutTo && actualCheckOut
          ? actualCheckOut.isSameOrAfter(checkOutFrom) &&
            actualCheckOut.isSameOrBefore(checkOutTo)
          : true;

      return (
        isDateInRange && isStatusMatch && isCheckInMatch && isCheckOutMatch
      );
    }) || [];

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          mt: !attendanceData?.length ? '40px' : '8px',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: attendanceData?.length ? 'flex' : 'none',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {attendanceData?.length ? (
            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
              variant="scrollable"
              TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
            >
              {attendanceData?.map((item, index) => (
                <Tab
                  disableRipple
                  key={index}
                  label={
                    <Tooltip
                      title={
                        ellipsisWithTooltip(item?.client, 17)
                          ? `${item?.client}`
                          : ''
                      }
                    >
                      {`${item?.client?.slice(0, 17)}${
                        ellipsisWithTooltip(item?.client, 17) ? '...' : ''
                      }`}
                    </Tooltip>
                  }
                  sx={{
                    textTransform: 'none',
                    color: '#595959',
                    '&.Mui-selected': {
                      color: '#068987',
                    },
                  }}
                />
              ))}
            </Tabs>
          ) : null}
        </Box>
        <Box sx={{ width: '100%', mt: '40px', overflowX: 'auto' }}>
          <AppTable
            minWidth={'1200px'}
            column={attendanceReportTableColumn}
            data={
              filteredTimeSheet.length
                ? filteredTimeSheet
                : ['No attendance record found!']
            }
            handleClickActionView={handleAttendanceModal}
            isLoading={isLoading}
          />
        </Box>
      </Box>
      <Modal
        open={open}
        disableScrollLock
        disableEnforceFocus
        disableRestoreFocus
        onClose={() => setOpen(false)}
      >
        <AttendanceViewModal
          modalData={modalData}
          empData={{
            ...attendanceData?.[currentTab]?.emp_data?.employee_details,
            role: employeeData?.role,
          }}
          handleClose={() => setOpen(false)}
          image={employeeData?.image_path}
        />
      </Modal>
    </>
  );
};

export default AttendanceReport;
