'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { clientEditForm } from '@/src/constants/data/forms/edit-client-info';
import { editClientSchema } from '@/src/components/form/schemas/editClient';
import { useSelector } from 'react-redux';
import { api } from '@/src/services/apiService';
import { HR_GET_CLIENT_PROFILE } from '@/src/services/apiService/apiEndPoints';

const EditClient = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({});
  const { currentClient } = useSelector((state) => state?.hr?.clients);
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
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  const getCountry = (country) => {
    return (
      countries.find(({ title }) => title === country) || {
        flag: 'https://flagcdn.com/pk.svg',
        title: 'Pakistan',
      }
    );
  };
  const defaultValues = {
    ...currentClient,
    // country: addEmployeeForm?.country || {
    //   flag: 'https://flagcdn.com/pk.svg',
    //   title: 'Pakistan',
    // },
    country: getCountry(currentClient?.country),
  };
  const getFinalData = (values) => {
    const final = {
      ...values,
      country: values.country?.title,
    };
    console.log({ values, final });
    return final;
  };
  const mutationFunction = (values) => {
    return api.updateData(HR_GET_CLIENT_PROFILE, values);
  };
  return (
    <Box>
      <Breadcrumb root="clients" title="Clients /" currentPage="Edit client" />
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
          Edit client profile
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: '550px',
          border: 'solid 1px #ccc',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Step
          form={clientEditForm}
          schema={editClientSchema}
          pmd="50px 95px"
          editProfile
          countries={countries}
          handleData={handleData}
          defaultValues={defaultValues}
          isLastStep={true}
          getFinalData={getFinalData}
          mutationFunction={mutationFunction}
          method="updateData"
          endpoint={`${HR_GET_CLIENT_PROFILE}?id=${currentClient.id}`}
        />
      </Box>
    </Box>
  );
};

export default EditClient;
