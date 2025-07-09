'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';
import AppTable from '@/src/components/app-table-new/AppTable';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { LETTERS_TABLECOLUMN } from '@/src/constants/employee-profile';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DOWNLOAD_LETTER,
  EMP_LETTERS,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchEmpLetters,
  fetchEmpLettersFailed,
  fetchEmpLettersSuccess,
} from '@/src/redux/slices/employeeSlices/lettersSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '@/src/utils/toast';
import dayjs from 'dayjs';

const Letters = () => {
  const dispatch = useDispatch();

  const { data: lettersData, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['fetch-emp-letters'],
    queryFn: () => {
      dispatch(fetchEmpLetters());
      return api
        .getData(EMP_LETTERS)
        .then(({ data }) => {
          const newData =
            data === '' || !data.length
              ? []
              : data?.map((item) => ({
                  ...item,
                  download: 'Download',
                  issue_date: dayjs(item?.issue_date)?.format('D-MMMM-YYYY'),
                }));
          dispatch(fetchEmpLettersSuccess({ letters: newData }));
          return newData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchEmpLettersFailed());
        });
    },
  });

  const downloadLetterMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_LETTER}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'letter.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
    },
  });

  const downloadLetter = (id) => {
    downloadLetterMutation.mutate(id);
  };

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading
              title={'Letters'}
              dashboardDescription={' Visualise team details & manage members.'}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box my={4}>
              <Box
                sx={{
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <AppTable
                  isLoading={isLoading}
                  column={LETTERS_TABLECOLUMN}
                  data={lettersData}
                  tableRowClass="app-table-row-letter"
                  minWidth={'700px'}
                  handleClickDownload={downloadLetter}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Letters;
