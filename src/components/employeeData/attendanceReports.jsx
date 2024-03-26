import React, { useState } from 'react';
import { Box, Modal, Tab, Tabs } from '@mui/material';

import { timeSheetTableColumn } from '@/src/constants/data/tables/timeSheet';
import AttendanceViewModal from '@/app/employee/dashboard/attendance/time-sheet/AttendanceViewModal';
import { employeeProfileData } from '@/src/constants/employeeProfile';
import AppTable from '../appTableNew/AppTable';
import { a11yProps } from '@/src/utils/tabs';
import { useQuery } from '@tanstack/react-query';
import {
  HR_GET_EMP_ATTENDENCE,
  HR_GET_EMP_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { convertDateFormat, getAttendenceShortHand } from '@/src/utils/helpers';

const AttendanceReport = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({});
  const [currentTab, setCurrentTab] = useState({
    label: 'Time',
    val: 0,
  });
  const tabs = [
    {
      prop: a11yProps(0),
      label: 'Client A',
    },
    {
      prop: a11yProps(1),
      label: 'Client B',
    },
    {
      prop: a11yProps(1),
      label: 'Client C',
    },
  ];

  const handleAttendanceModal = (props) => {
    const { item, row } = props;
    console.log({ item, row });
    setModalData({ item, ...row });
    setOpen(true);
  };
  const handleChangeTab = (event, newValue) => {
    setCurrentTab({
      label: tabs[newValue].label,
      val: newValue,
    });
  };
  const empProfile = useQuery({
    staleTime: 10000,
    queryKey: ['employee-profile'],
    queryFn: async () => {
      // dispatch(getAttendanceRequest());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  });
  const getTimeSheet = (timeSheetData) => {
    const newData = Object.entries(timeSheetData).map((recItem) => {
      // console.log({ recItem });
      return {
        ...recItem[1],
        date: recItem[0],
        day: dayjs(convertDateFormat(recItem[0])).format('dddd'),
        status: Object.entries(recItem[1]?.status)
          .map((st) => {
            if (!st[1]) return;
            else return getAttendenceShortHand(st[0]);
          })
          .filter((el) => el !== undefined),
        action: ['View'],
        attendenceShortHand: true,
        actionStatus: true,
      };
    });
    return newData;
  };
  const { data, isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['hr-employee-attendence'],
    queryFn: async () => {
      return api
        .getData(`${HR_GET_EMP_ATTENDENCE}?e_email=${empProfile.data?.email}`)
        .then(({ data }) => {
          const tempData = [];
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const newEle = Object.entries(element);
            console.log({ element, newEle: newEle[0][1] });
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
          return tempData || [];
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  });
  return (
    <>
      {isLoading ? (
        <Box>{employeeProfileData?.loading}</Box>
      ) : (
        <>
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <Tabs
              value={currentTab.val}
              onChange={(ev, newVal) => {
                handleChangeTab(ev, newVal);
              }}
              aria-label="basic tabs example"
              variant="scrollable"
              sx={{
                marginBottom: '20px',
              }}
            >
              {data?.map((item, tabIndex) => {
                console.log({ item });
                return (
                  <Tab
                    key={tabIndex}
                    label={`${item.client}`}
                    // {...prop}
                    disableRipple={true}
                  />
                );
              })}
            </Tabs>
            {data?.map((item, index) => {
              if (index === currentTab.val)
                return (
                  <AppTable
                    key={index}
                    column={timeSheetTableColumn}
                    data={item?.emp_data?.time_sheet}
                    handleClickActionView={handleAttendanceModal}
                  />
                );
            })}
          </Box>
        </>
      )}
      {data?.length && (
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
            modalData={modalData}
            empData={data[currentTab.val]?.emp_data?.employee_details}
            handleClose={handleClose}
          />
        </Modal>
      )}
    </>
  );
};

export default AttendanceReport;
