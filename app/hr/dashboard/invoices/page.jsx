'use client';
import { Button, Grid } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useState } from 'react';
import Image from 'next/image';

import AppTable from '@/src/components/appTable/AppTable';
import {
  invoicePageColumn,
  invoicePageData,
} from '@/src/constants/data/tables/hr/invoicesPageData';
import Input from '@/src/components/dashboard/input';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import AppDropdown from '@/src/components/dashboard/appDropdown';

const Page = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('Active');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          sx={{
            marginTop: '20px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '20px',
            },
          }}
          spacing={3}
        >
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Client name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ width: '100%', borderColor: 'gray' }}>
              <FormInput
                value={name}
                setFieldValue={setName}
                placeholder={'Date'}
                name={'name'}
                sm={12}
                md={12}
                lg={12}
                type="date"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppDropdown
              selectedItem={designation}
              setSelectedItem={setDesignation}
              lg={12}
              type="select"
              data={[
                {
                  label: 'Active',
                },
                {
                  label: 'Inactive',
                },
              ]}
              isLoadingList={isLoading}
              setIsLoadingList={setIsLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
              style={{
                backgroundColor: '#029894',
                color: '#FFF',
                height: '40px',
                width: '100%',
              }}
            >
              <Image
                width={24}
                height={24}
                alt="Refresh"
                src={`/icons/searchIconWhite.svg`}
              />
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            my: '20px',
          }}
        >
          <AppTable column={invoicePageColumn} data={invoicePageData} />
        </Box>
      </Box>
    </>
  );
};

export default Page;
