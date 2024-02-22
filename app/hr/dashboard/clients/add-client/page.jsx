'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-client';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { EMPLOYEE_DATA } from '@/src/constants/AllEmployee';
import { fetchCountriesList } from '@/src/utils/countryList';

const AddEmployee = () => {
  const [countries, setCountries] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedCountries = await fetchCountriesList();
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchData();
  }, []);
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
      <Breadcrumb root="clients" title="Clients /" currentPage="Add client" />
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
          {EMPLOYEE_DATA?.addClient}
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: '550px',
          border: 'solid 1px #ccc',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Navigator formSteps={formSteps} currentStep={currentStep} />
        {formSteps.map(
          ({ schema, form, countNo, isMultiColumn }, stepIndex) => {
            if (countNo === currentStep) {
              return (
                <Step
                  key={stepIndex}
                  currentStep={currentStep}
                  form={form}
                  schema={schema}
                  isMultiColumn={isMultiColumn}
                  handleGoNext={handleGoNext}
                  handleGoPrev={handleGoPrev}
                  isLastStep={currentStep === formSteps?.length}
                  handleData={handleData}
                  countries={countries}
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
