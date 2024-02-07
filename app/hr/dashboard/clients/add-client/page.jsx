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
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountriesList();
      const formattedCountries = data
        .map((country) => ({
          title: country?.name?.common,
          flag: country?.flags?.svg,
        }))
        .sort((countryA, countryB) =>
          countryA.title < countryB.title ? -1 : 1
        );
      setCountries(formattedCountries);
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
  const [currentStep, setCurrentStep] = useState(1);
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
