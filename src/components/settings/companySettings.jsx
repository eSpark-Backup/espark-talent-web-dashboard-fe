import React, { useEffect, useState } from 'react';

import { companyformElement } from '@/src/constants/data/forms/company-info';
import { Box } from '@mui/system';
import { companyInfoSchema } from '../form/schemas/companyInfo';
import Step from '../form/step/Step';

const CompanySettings = () => {
  const [formData, setFormData] = useState({});
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  return (
    <Box>
      <Step
        form={companyformElement}
        schema={companyInfoSchema}
        editProfile
        mt="229px"
        pmd="49px 10px"
        handleData={handleData}
      />
    </Box>
  );
};
export default CompanySettings;
