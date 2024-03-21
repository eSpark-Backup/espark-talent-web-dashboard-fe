'use client';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-employee';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { addEmployeeFormData } from '@/src/redux/slices/hrSlices/employeeSlice';
import { HR_ADD_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const { addEmployeeForm } = useSelector((state) => state.hr?.employees);
  const handleGoNext = () => {
    if (currentStep === formSteps.length) return;
    setCurrentStep((ps) => ps + 1);
  };
  const handleGoPrev = () => {
    if (currentStep === 1) return;
    setCurrentStep((ps) => ps - 1);
  };
  const defaultValues = {
    ...addEmployeeForm,
    annual_leaves: addEmployeeForm?.annual_leaves || 0,
    unpaid_leaves: addEmployeeForm?.unpaid_leaves || 0,
    paid_leaves: addEmployeeForm?.paid_leaves || 0,
    hajj_leaves: addEmployeeForm?.hajj_leaves || 0,
    sick_leaves: addEmployeeForm?.sick_leaves || 0,
    casual_leaves: addEmployeeForm?.casual_leaves || 0,
    country: addEmployeeForm?.country || {
      flag: 'https://flagcdn.com/pk.svg',
      title: 'Pakistan',
    },
  };
  const getFinalData = (values) => ({
    first_name: values.first_name,
    last_name: values.last_name,
    gender: values.gender,
    dob: dayjs(values.dob).format('YYYY-MM-DD'),
    phone_number: values.phone_number,
    email: values.email,
    marital_status: values.marital_status,
    image: values.image,
    emergency_no: values.emergency_no,
    resume: values.resume,
    emergency_contact: JSON.stringify({
      primary: {
        name: values.name1,
        relation: values.relation1,
        phone_number: values.phoneNumber1,
      },
      secondary: {
        name: values.name2,
        relation: values.relation2,
        phone_number: values.phoneNumber2,
      },
    }),
    joining_date: dayjs(values.joining_date).format('YYYY-MM-DD'),
    role: values.role,
    job_title: values.job_title,
    company: values.company,
    employee_id: values.employee_id,
    password: values.password,
    confirm_password: values.confirm_password,
    punch_timings: JSON.stringify({
      check_in: values.check_in,
      check_out: values.check_out,
    }),
    casual_leaves: values.casual_leaves,
    sick_leaves: values.sick_leaves,
    annual_leaves: values.annual_leaves,
    hajj_leaves: values.hajj_leaves,
    paid_leaves: values.paid_leaves,
    unpaid_leaves: values.unpaid_leaves,
  });
  const dispatchFunction = (values) => {
    dispatch(addEmployeeFormData(values));
  };
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
                  defaultValues={defaultValues}
                  getFinalData={getFinalData}
                  dispatchFunction={dispatchFunction}
                  method="postData"
                  endpoint={HR_ADD_EMPLOYEES}
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
