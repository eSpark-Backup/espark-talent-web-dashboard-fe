import React from 'react';

import { Box } from '@mui/system';
import Step from '../form/step/Step';
import { passwordChangeSchema } from '../form/schemas/password';
import { passwordformElement } from '@/src/constants/data/forms/password-change-form';

const ChangePassword = () => {
  return (
    <Box>
      <Step
        form={passwordformElement}
        schema={passwordChangeSchema}
        editProfile
        mt="229px"
        pmd="49px 10px"
      />
    </Box>
  );
};
export default ChangePassword;
