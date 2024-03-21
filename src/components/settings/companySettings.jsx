import React from 'react';

import { companyformElement } from '@/src/constants/data/forms/company-info';
import { Box } from '@mui/system';
import { companyInfoSchema } from '../form/schemas/companyInfo';
import Step from '../form/step/Step';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { HR_COMPANY_SETTINGS } from '@/src/services/apiService/apiEndPoints';
import { getCompSettingsData } from '@/src/redux/slices/hrSlices/settingsSlice';
import { api } from '@/src/services/apiService';

const CompanySettings = () => {
  const { companySettings } = useSelector((state) => state?.hr?.settings);
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 10000,
    queryKey: ['get-company-settings'],
    queryFn: async () => {
      return api
        .getData(`${HR_COMPANY_SETTINGS}`)
        .then(({ data }) => {
          dispatch(getCompSettingsData(data || {}));
          return data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  });
  const defaultValues = { ...companySettings };
  const getFinalData = (values) => {
    return {
      ...values,
    };
  };
  return (
    <Box>
      {isLoading ? (
        'Loading ...'
      ) : (
        <Step
          form={companyformElement}
          schema={companyInfoSchema}
          editProfile
          mt="229px"
          pmd="49px 10px"
          isLastStep
          defaultValues={defaultValues}
          getFinalData={getFinalData}
          method="updateData"
          endpoint={HR_COMPANY_SETTINGS}
        />
      )}
    </Box>
  );
};
export default CompanySettings;
