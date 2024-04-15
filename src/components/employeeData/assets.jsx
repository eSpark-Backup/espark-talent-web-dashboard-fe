import React, { useState } from 'react';
import { Box } from '@mui/material';

import { ASSET_TABLECOLUMN } from '@/src/constants/employeeProfile';
import AppTable from '../appTableNew/AppTable';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { useQuery } from '@tanstack/react-query';
import { HR_GET_EMP_PROFILE } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpAssetRequestFailed,
  getEmpAssetRequest,
  getEmpAssetRequestSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '../Toast/Toast';

const Assets = () => {
  const params = useParams();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { assets } = useSelector((state) => state?.hr?.employees);
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['hr-employee-get-asset'],
    queryFn: async () => {
      dispatch(getEmpAssetRequest());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params.id}&tab=assets`)
        .then(({ data }) => {
          const tempAssets = data?.length
            ? data?.map((item) => ({
                ...item,
                assignee: [
                  '/icons/AssigneeAvatar.svg',
                  item?.assignee_name,
                  item?.assignee_email,
                ],
                action: ['Delete'],
              }))
            : [];
          dispatch(getEmpAssetRequestSuccess(tempAssets));
          return tempAssets || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getEmpAssetRequestFailed());
          console.log({ err });
          console.log({ isLoading });
        });
    },
  });
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);
  const handleClickDelete = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          <AppTable
            column={ASSET_TABLECOLUMN}
            data={assets}
            handleClickActionDelete={handleClickDelete}
          />
        </Box>
      </>
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default Assets;
