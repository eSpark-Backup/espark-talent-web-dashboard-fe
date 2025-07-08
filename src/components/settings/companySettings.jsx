import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';

import { companyformElement } from '@/src/constants/data/forms/company-info';
import { companyInfoSchema } from '../../schemas/companyInfo';
import Step from '../form/step/Step';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { HR_COMPANY_SETTINGS } from '@/src/services/apiService/apiEndPoints';
import { getCompSettingsData } from '@/src/redux/slices/hrSlices/settingsSlice';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';
import { getHomeData } from '@/src/redux/slices/hrSlices/homeSlice';

const CompanySettings = () => {
  const { companySettings } = useSelector((state) => state?.hr?.settings);
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['get-company-settings'],
    queryFn: async () => {
      return api
        .getData(`${HR_COMPANY_SETTINGS}`)
        .then(({ data }) => {
          dispatch(getCompSettingsData(data || {}));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const defaultValues = { ...companySettings };
  const getFinalData = (values) => {
    if (typeof values?.image === 'object') {
      return {
        ...values,
      };
    } else {
      const finalData = { ...values };
      delete finalData?.image;
      return finalData;
    }
  };

  const handleToast = () => {
    Toast('success', 'Setting updated succesfully');
  };

  const extractErrorText = (html) => {
    const match = html?.match(/<strong>Error:<\/strong>\s*(.*)/);
    return match ? match[1] : 'No error text found';
  };

  const handleErrorToast = (err) => {
    Toast('error', extractErrorText(err) || 'Failed to delete data');
  };

  const { homeData } = useSelector((state) => state?.hr?.home);
  const handleSave = () => {
    api
      .getData(`${HR_COMPANY_SETTINGS}`)

      .then(({ data }) => {
        const updatedHomeData = {
          ...homeData,
          company_image: data.image,
        };
        dispatch(getHomeData(updatedHomeData || {}));
        dispatch(getCompSettingsData(data || {}));
      })
      .catch((err) => {
        Toast('error', err.message || 'Failed to save settings');
        console.error(err);
      });
  };

  return (
    <Box>
      {isLoading ? (
        <Skeleton
          animation="wave"
          width={'100%'}
          height={40}
          sx={{ background: '#F6F6F6' }}
        />
      ) : (
        <>
          <Step
            form={companyformElement}
            schema={companyInfoSchema}
            editProfile
            pmd="49px 10px"
            isLastStep
            defaultValues={defaultValues}
            getFinalData={getFinalData}
            method="updateData"
            endpoint={HR_COMPANY_SETTINGS}
            toast={handleToast}
            onSave={handleSave}
            fontSize={'8px'}
            miniFontSize={'7px'}
            errorToast={handleErrorToast}
          />
        </>
      )}
    </Box>
  );
};

export default CompanySettings;
