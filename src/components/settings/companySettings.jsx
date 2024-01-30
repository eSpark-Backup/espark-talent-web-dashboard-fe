import React from 'react';

import { companyformElement } from '@/src/constants/data/forms/company-info';
import { Box } from '@mui/system';
import { companyInfoSchema } from '../form/schemas/companyInfo';
import Step from '../form/step/Step';

const CompanySettings = () => {
  return (
    <Box sx={{}}>
      <Step
        form={companyformElement}
        schema={companyInfoSchema}
        editProfile
        mt="229px"
        pmd="70px 10px"
      />
    </Box>
  );
};
export default CompanySettings;
