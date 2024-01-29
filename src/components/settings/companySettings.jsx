import React from 'react';

import { companyformElement } from '@/src/constants/data/forms/company-info';
import { Box } from '@mui/system';
import { companyInfoSchema } from '../form/schemas/companyInfo';
import Step from '../form/step/Step';

const CompanySettings = () => {
  return (
    <Box>
      <Step form={companyformElement} schema={companyInfoSchema} editProfile />
    </Box>
  );
};
export default CompanySettings;
