'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-employee';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';

const AddEmployee = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(4);

  const handleGoNext = () => {
    if (currentStep === formSteps.length) return;
    setCurrentStep((ps) => ps + 1);
  };
  const handleGoPrev = () => {
    if (currentStep === 1) return;
    setCurrentStep((ps) => ps - 1);
  };
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  return (
    <Box>
      <Breadcrumb title="Employees /" currentPage="Add employee" />
      <Box mb={'40px'}>
        <Typography
          sx={{
            color: '#171717',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
          }}
        >
          Add employee
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: '550px',
          border: 'solid 1px #ccc',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Navigator
          formSteps={formSteps}
          currentStep={currentStep}
          navigationLabelWidth="75px"
        />
        {formSteps.map(
          ({ schema, form, countNo, isMultiColumn }, stepIndex) => {
            if (countNo === currentStep) {
              return (
                <Step
                  key={stepIndex}
                  isLastStep={currentStep === formSteps.length}
                  currentStep={currentStep}
                  form={form}
                  schema={schema}
                  isMultiColumn={isMultiColumn}
                  handleGoNext={handleGoNext}
                  handleGoPrev={handleGoPrev}
                  handleData={handleData}
                />
              );
            }
          }
        )}
      </Box>
    </Box>
  );
};

export default AddEmployee;
