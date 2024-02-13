'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { clientEditForm } from '@/src/constants/data/forms/edit-client-info';
import { editClientSchema } from '@/src/components/form/schemas/editClient';

const AddEmployee = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({});
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
        />
      </Box>
    </Box>
  );
};

export default AddEmployee;
