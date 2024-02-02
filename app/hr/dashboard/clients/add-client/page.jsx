'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-client';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';

const AddEmployee = () => {
  const [countries, setCountries] = useState([]);
  const fetchCountriesList = async () => {
    return await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags'
    ).then((res) => res.json().then((data) => data));
  };

  useEffect(() => {
    const data = fetchCountriesList();
    data.then((list) => {
      console.log({ list });
      const tempList = [...list]
        ?.map((item) => ({
          title: item?.name?.common,
          flag: item?.flags?.svg,
        }))
        ?.sort((a, b) => (a?.title < b.title ? -1 : 1));
      setCountries(tempList);
    });
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
          Add client
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
