import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import Step from '../form/step/Step';
import { passwordChangeSchema } from '../form/schemas/password';
import { passwordformElement } from '@/src/constants/data/forms/password-change-form';

const ChangePassword = () => {
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
        form={passwordformElement}
        schema={passwordChangeSchema}
        editProfile
        mt="229px"
        pmd="49px 10px"
        handleData={handleData}
      />
    </Box>
  );
};
export default ChangePassword;
